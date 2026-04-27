'use server';

/**
 * @fileOverview Summarizes a doctor's video using AI.
 *
 * - summarizeDoctorVideo - A function that summarizes a doctor's video.
 * - SummarizeDoctorVideoInput - The input type for the summarizeDoctorVideo function.
 * - SummarizeDoctorVideoOutput - The return type for the summarizeDoctorVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDoctorVideoInputSchema = z.object({
  videoUrl: z
    .string()
    .describe('The URL of the doctor\'s video to summarize.'),
});
export type SummarizeDoctorVideoInput = z.infer<typeof SummarizeDoctorVideoInputSchema>;

const SummarizeDoctorVideoOutputSchema = z.object({
  summary: z.string().describe('The summary of the doctor\'s video.'),
});
export type SummarizeDoctorVideoOutput = z.infer<typeof SummarizeDoctorVideoOutputSchema>;

export async function summarizeDoctorVideo(
  input: SummarizeDoctorVideoInput
): Promise<SummarizeDoctorVideoOutput> {
  return summarizeDoctorVideoFlow(input);
}

const summarizeDoctorVideoPrompt = ai.definePrompt({
  name: 'summarizeDoctorVideoPrompt',
  input: {schema: SummarizeDoctorVideoInputSchema},
  output: {schema: SummarizeDoctorVideoOutputSchema},
  prompt: `You are an AI expert specializing in summarizing videos.

You will summarize the video provided in the videoUrl. The summary should be concise and capture the doctor's expertise and approach.

Video URL: {{{videoUrl}}}`,
});

const summarizeDoctorVideoFlow = ai.defineFlow(
  {
    name: 'summarizeDoctorVideoFlow',
    inputSchema: SummarizeDoctorVideoInputSchema,
    outputSchema: SummarizeDoctorVideoOutputSchema,
  },
  async input => {
    const {output} = await summarizeDoctorVideoPrompt(input);
    return output!;
  }
);
