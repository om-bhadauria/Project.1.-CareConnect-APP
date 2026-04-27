'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDoctors } from '@/hooks/use-appointments';
import type { Doctor } from '@/lib/types';
import BookingForm from './BookingForm';

export default function BookAppointmentClient({ doctorId }: { doctorId: string }) {
  const { doctors, isLoading } = useDoctors();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);

  useEffect(() => {
    if (!isLoading) {
      const foundDoctor = doctors.find((item) => item.id === doctorId);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      } else {
        notFound();
      }
    }
  }, [isLoading, doctors, doctorId]);

  if (isLoading || !doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} data-ai-hint={doctor.imageHint} />
              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="font-headline text-2xl">Book Appointment</CardTitle>
              <CardDescription className="mt-1 text-base">
                with <span className="font-semibold text-primary">{doctor.name}</span> ({doctor.specialization})
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BookingForm doctor={doctor} />
        </CardContent>
      </Card>
    </div>
  );
}
