'use client';

import { useState, useTransition } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { getVideoSummary } from '@/app/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Loader2 } from 'lucide-react';

interface VideoSummaryProps {
  videoUrl: string;
}

export default function VideoSummary({ videoUrl }: VideoSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSummarize = () => {
    setError(null);
    setSummary(null);
    startTransition(async () => {
      try {
        const result = await getVideoSummary(videoUrl);
        setSummary(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      }
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
            <div className='flex items-center gap-2'>
                <Sparkles className="h-4 w-4 text-primary"/>
                <span>AI Video Introduction</span>
            </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          {isPending && (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Generating summary...</span>
            </div>
          )}
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          {summary && <p className="text-sm text-muted-foreground">{summary}</p>}
          {!summary && !isPending && (
            <div className='text-center'>
                <p className='text-sm text-muted-foreground mb-2'>Get a quick summary of the doctor's introduction.</p>
                <Button variant="outline" size="sm" onClick={handleSummarize}>
                    Summarize Video
                </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
