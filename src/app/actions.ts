'use server';

import { suggestDoctorsBasedOnSymptoms } from '@/ai/flows/suggest-doctors-based-on-symptoms';
import { summarizeDoctorVideo } from '@/ai/flows/summarize-doctor-video';
import { textToSpeech as textToSpeechFlow } from '@/ai/flows/text-to-speech';
import { doctors } from '@/lib/doctors';
import { z } from 'zod';

const symptomSchema = z.string().min(10, "Please describe your symptoms in at least 10 characters.");
const videoSchema = z.string().url("Invalid video URL.");

const symptomRules = [
  {
    specialization: 'Cardiologist',
    keywords: ['chest pain', 'heart', 'palpitation', 'blood pressure', 'bp', 'breathless', 'shortness of breath'],
  },
  {
    specialization: 'Neurologist',
    keywords: ['headache', 'migraine', 'seizure', 'stroke', 'numbness', 'dizziness', 'memory', 'weakness'],
  },
  {
    specialization: 'Orthopedic Surgeon',
    keywords: ['bone', 'joint', 'fracture', 'back pain', 'knee', 'shoulder', 'sprain', 'arthritis'],
  },
  {
    specialization: 'Dermatologist',
    keywords: ['skin', 'rash', 'acne', 'itching', 'hair fall', 'eczema', 'allergy', 'spots'],
  },
  {
    specialization: 'Pediatrician',
    keywords: ['child', 'baby', 'infant', 'kid', 'newborn', 'pediatric', 'vaccination'],
  },
  {
    specialization: 'ENT Specialist',
    keywords: ['ear', 'nose', 'throat', 'sinus', 'tonsil', 'hearing', 'voice'],
  },
  {
    specialization: 'Gynecologist',
    keywords: ['pregnancy', 'period', 'menstrual', 'pcos', 'gynecology', 'vaginal'],
  },
  {
    specialization: 'Dentist',
    keywords: ['tooth', 'teeth', 'gum', 'dental', 'cavity', 'mouth'],
  },
  {
    specialization: 'Ophthalmologist',
    keywords: ['eye', 'vision', 'blurred', 'red eye', 'sight'],
  },
  {
    specialization: 'Pulmonologist',
    keywords: ['cough', 'asthma', 'lung', 'wheezing', 'breathing', 'respiratory'],
  },
  {
    specialization: 'Gastroenterologist',
    keywords: ['stomach', 'abdomen', 'gas', 'acidity', 'vomiting', 'diarrhea', 'constipation', 'liver'],
  },
  {
    specialization: 'Psychiatrist',
    keywords: ['anxiety', 'depression', 'stress', 'sleep', 'panic', 'mood'],
  },
];

function getLocalDoctorSuggestion(symptoms: string) {
  const normalizedSymptoms = symptoms.toLowerCase();
  const matchedRule = symptomRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedSymptoms.includes(keyword))
  );
  const specialization = matchedRule?.specialization ?? 'General Physician';
  const matchedDoctors = doctors
    .filter((doctor) => doctor.specialization === specialization)
    .slice(0, 4);

  const doctorLines = matchedDoctors.length
    ? matchedDoctors.map((doctor) => `- ${doctor.name}, ${doctor.specialization} (${doctor.city})`).join('\n')
    : '- Please consult a General Physician first for an initial diagnosis.';

  return [
    `Recommended specialist: ${specialization}`,
    '',
    'Suggested doctors:',
    doctorLines,
    '',
    'This is a quick recommendation based on your symptoms. If symptoms are severe, sudden, or worsening, seek urgent medical care.',
  ].join('\n');
}

function hasGoogleAiKey() {
  return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
}

export async function getDoctorSuggestion(symptoms: string) {
  const validation = symptomSchema.safeParse(symptoms);
  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  if (!hasGoogleAiKey()) {
    return getLocalDoctorSuggestion(validation.data);
  }

  try {
    const result = await suggestDoctorsBasedOnSymptoms({ symptomsDescription: validation.data });
    return result.suggestedDoctors;
  } catch (error) {
    console.error(error);
    return getLocalDoctorSuggestion(validation.data);
  }
}

export async function getVideoSummary(videoUrl: string) {
    const validation = videoSchema.safeParse(videoUrl);
    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }
  try {
    // NOTE: The underlying AI model may not be able to access all URLs.
    const result = await summarizeDoctorVideo({ videoUrl: validation.data });
    return result.summary;
  } catch (error) {
    console.error(error);
    return "Sorry, we couldn't generate a summary for this video. It might be inaccessible or in an unsupported format.";
  }
}

export async function textToSpeech(text: string) {
    if (!text) {
        throw new Error('Please provide text to convert to speech.');
    }
    try {
        const result = await textToSpeechFlow(text);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Sorry, we couldn't convert the text to speech at the moment. Please try again later.");
    }
}
