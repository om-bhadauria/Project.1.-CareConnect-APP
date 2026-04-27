'use client';

import { useAppointments } from '@/hooks/use-appointments';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO, isWithinInterval, addHours } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Trash2, Loader2, BellRing } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import type { Appointment } from '@/lib/types';
import Link from 'next/link';

export default function ScheduleView() {
  const { appointments, removeAppointment, isLoading } = useAppointments();
  const { toast } = useToast();
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!isLoading && appointments.length > 0) {
      const now = new Date();
      const upcoming = appointments
        .filter(appt => !appt.reminderShown)
        .find(appt => {
            const apptDate = parseISO(appt.date);
            return isWithinInterval(apptDate, { start: now, end: addHours(now, 24) });
        });

      if (upcoming) {
        setUpcomingAppointment(upcoming);
      }
    }
  }, [appointments, isLoading]);

  const handleCancel = (appointmentId: string, doctorName: string) => {
    removeAppointment(appointmentId);
    toast({
      title: 'Appointment Canceled',
      description: `Your appointment with ${doctorName} has been canceled.`,
      variant: 'destructive',
    });
  };
  
  const handleReminderClose = () => {
    if (upcomingAppointment) {
      // In a real app, you'd want to mark this persistently.
      // For this demo, we'll just close the dialog.
      // A more robust solution might involve updating the appointment in localStorage.
      setUpcomingAppointment(null);
    }
  };


  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold">No Appointments Found</h2>
        <p className="text-muted-foreground mt-2">You have not booked any appointments yet.</p>
        <Button asChild className="mt-4">
          <Link href="/">Book an Appointment</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {upcomingAppointment && (
         <AlertDialog open={!!upcomingAppointment} onOpenChange={(open) => !open && handleReminderClose()}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                    <BellRing className="text-primary"/>
                    Appointment Reminder
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You have an upcoming appointment with{' '}
                  <span className="font-semibold text-primary">{upcomingAppointment.doctor.name}</span>{' '}
                  on {format(parseISO(upcomingAppointment.date), 'PPP')} at {upcomingAppointment.time}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleReminderClose}>Got it!</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
      <div className="space-y-6 max-w-4xl mx-auto">
        {appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(appt => (
          <Card key={appt.id} className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardDescription>Appointment with</CardDescription>
                  <CardTitle className="font-headline text-xl text-primary">{appt.doctor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{appt.doctor.specialization}</p>
                </div>
                <Avatar>
                  <AvatarImage src={appt.doctor.imageUrl} alt={appt.doctor.name} data-ai-hint={appt.doctor.imageHint} />
                  <AvatarFallback>{appt.doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                      <p className="font-semibold">{format(new Date(appt.date), 'EEEE, MMMM d, yyyy')}</p>
                      <p className="text-sm text-muted-foreground">For: {appt.patientName}</p>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <p className="font-semibold">{appt.time}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancel(appt.id, appt.doctor.name)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
