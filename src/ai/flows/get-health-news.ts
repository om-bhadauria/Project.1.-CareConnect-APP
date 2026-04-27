'use server';
// This file is no longer used for fetching health news as it has been replaced with a static list.
// It is kept for reference purposes.

/**
 * @fileOverview A Genkit flow to get recent health news.
 *
 * - getHealthNews - A function that returns a list of recent health news articles.
 * - GetHealthNewsOutput - The return type for the getHealthNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  summary: z.string().describe('A one-paragraph summary of the news article.'),
  url: z.string().url().describe('The URL of the news article.'),
});

const GetHealthNewsOutputSchema = z.object({
  articles: z
    .array(ArticleSchema)
    .length(5)
    .describe('A list of 5 recent health news articles.'),
});
export type GetHealthNewsOutput = z.infer<typeof GetHealthNewsOutputSchema>;

export async function getHealthNews(): Promise<GetHealthNewsOutput> {
  return getHealthNewsFlow();
}

const prompt = ai.definePrompt({
  name: 'getHealthNewsPrompt',
  output: {schema: GetHealthNewsOutputSchema},
  prompt: `You are a health and wellness news aggregator. Your task is to provide a list of 5 relevant health news article examples. For each article, provide a title, a one-paragraph summary, and the source URL. The topics should be diverse and interesting to a general audience.`,
});

const getHealthNewsFlow = ai.defineFlow(
  {
    name: 'getHealthNewsFlow',
    outputSchema: GetHealthNewsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
