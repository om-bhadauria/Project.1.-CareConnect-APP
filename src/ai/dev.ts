import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-doctor-video.ts';
import '@/ai/flows/suggest-doctors-based-on-symptoms.ts';
import '@/ai/flows/get-health-news.ts';
import '@/ai/flows/text-to-speech.ts';
