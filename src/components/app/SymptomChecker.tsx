'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getDoctorSuggestion, textToSpeech } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Mic, MicOff, Play, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setSymptoms('');
      setError('');
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handlePlaySuggestion = async () => {
    if (!suggestion) return;

    setIsPlaying(true);
    setError('');

    try {
      if (audioUrl) {
         if (audioRef.current) {
          audioRef.current.play();
        }
        return;
      }
      
      const result = await textToSpeech(suggestion);
      if (result.media) {
        const newAudioUrl = result.media;
        setAudioUrl(newAudioUrl);
        const audio = new Audio(newAudioUrl);
        audioRef.current = audio;
        audio.play();
        audio.onended = () => setIsPlaying(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during text-to-speech.');
      setIsPlaying(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuggestion('');
    setAudioUrl(null);
    if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }


    startTransition(async () => {
      try {
        const result = await getDoctorSuggestion(symptoms);
        setSuggestion(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="e.g., I have a persistent cough and fever for the last 3 days..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          rows={4}
          disabled={isPending}
          className="pr-12"
        />
        <Button
          type="button"
          size="icon"
          variant={isRecording ? 'destructive' : 'outline'}
          className="absolute top-1/2 right-3 -translate-y-1/2"
          onClick={handleMicClick}
          disabled={isPending}
        >
          {isRecording ? <MicOff /> : <Mic />}
        </Button>
      </div>

      <Button type="submit" disabled={isPending || !symptoms.trim()} className="w-full">
        {isPending ? 'Analyzing...' : 'Get Suggestion'}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestion && (
        <Alert className="bg-primary/10 border-primary/20">
            <div className='flex justify-between items-start'>
                <div>
                    <div className='flex items-center gap-2'>
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary">AI Suggestion</AlertTitle>
                    </div>
                    <AlertDescription>
                        <p className="whitespace-pre-wrap">{suggestion}</p>
                    </AlertDescription>
                </div>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={handlePlaySuggestion}
                    disabled={isPlaying}
                >
                    {isPlaying ? <Loader2 className="animate-spin" /> : <Play />}
                </Button>
            </div>
        </Alert>
      )}
    </form>
  );
}
