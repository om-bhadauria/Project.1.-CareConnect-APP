'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Stethoscope, Phone, MapPin } from 'lucide-react';
import type { Doctor } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const VideoSummary = dynamic(() => import('./VideoSummary'), {
  loading: () => null,
  ssr: false,
});

interface DoctorCardProps {
  doctor: Doctor;
  distance?: number;
}

export default function DoctorCard({ doctor, distance }: DoctorCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={doctor.imageUrl} alt={doctor.name} data-ai-hint={doctor.imageHint} />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="font-headline text-xl">{doctor.name}</CardTitle>
          <div className="flex flex-wrap gap-1 mt-1">
            <Badge variant="secondary">{doctor.specialization}</Badge>
            <Badge variant="outline">{doctor.subSpecialization}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" />
          <span>{doctor.city}</span>
          {distance !== undefined && (
             <Badge variant="default" className="ml-auto">{`${distance.toFixed(1)} km away`}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4 text-accent" />
          <span>{doctor.contact}</span>
        </div>
        {doctor.videoUrl && <VideoSummary videoUrl={doctor.videoUrl} />}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent hover:bg-accent/90">
          <Link href={`/book-appointment/${doctor.id}`}>Book Appointment</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
