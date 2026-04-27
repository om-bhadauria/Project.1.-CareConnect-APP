'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest doctors based on user-described symptoms.
 *
 * - suggestDoctorsBasedOnSymptoms - An async function that takes symptom description as input and returns a list of recommended doctors.
 * - SuggestDoctorsBasedOnSymptomsInput - The input type for the suggestDoctorsBasedOnSymptoms function.
 * - SuggestDoctorsBasedOnSymptomsOutput - The return type for the suggestDoctorsBasedOnSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDoctorsBasedOnSymptomsInputSchema = z.object({
  symptomsDescription: z.string().describe('A description of the user\'s symptoms.'),
});
export type SuggestDoctorsBasedOnSymptomsInput = z.infer<
  typeof SuggestDoctorsBasedOnSymptomsInputSchema
>;

const SuggestDoctorsBasedOnSymptomsOutputSchema = z.object({
  suggestedDoctors: z
    .string()
    .describe('A list of recommended doctors based on the symptoms.'),
});
export type SuggestDoctorsBasedOnSymptomsOutput = z.infer<
  typeof SuggestDoctorsBasedOnSymptomsOutputSchema
>;

export async function suggestDoctorsBasedOnSymptoms(
  input: SuggestDoctorsBasedOnSymptomsInput
): Promise<SuggestDoctorsBasedOnSymptomsOutput> {
  return suggestDoctorsBasedOnSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDoctorsBasedOnSymptomsPrompt',
  input: {schema: SuggestDoctorsBasedOnSymptomsInputSchema},
  output: {schema: SuggestDoctorsBasedOnSymptomsOutputSchema},
  prompt: `You are a medical assistant specializing in doctor recommendations. Based on the user's description of their symptoms, recommend a list of doctors with their specializations.

Symptoms description: {{{symptomsDescription}}}`,
});

const suggestDoctorsBasedOnSymptomsFlow = ai.defineFlow(
  {
    name: 'suggestDoctorsBasedOnSymptomsFlow',
    inputSchema: SuggestDoctorsBasedOnSymptomsInputSchema,
    outputSchema: SuggestDoctorsBasedOnSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
