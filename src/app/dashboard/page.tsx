'use client';

import { useAppointments } from '@/hooks/use-appointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, User, BarChart, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/app/ProtectedRoute';
import UserProfile from '@/components/app/UserProfile';
import { useUser } from '@/hooks/useUser';

function DashboardContent() {
  const { appointments, isLoading: appointmentsLoading } = useAppointments();
  const { user, isLoading: userLoading } = useUser();

  const isLoading = appointmentsLoading || userLoading;

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  const upcomingAppointments = appointments
    .filter(appt => new Date(appt.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextAppointment = upcomingAppointments[0];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-4xl font-bold font-headline text-primary">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground mt-2 text-lg">Here's a summary of your health journey.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{appointments.length}</div>
                    <p className="text-xs text-muted-foreground">
                    You have {upcomingAppointments.length} upcoming.
                    </p>
                </CardContent>
                </Card>
                <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Next Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                    {nextAppointment ? (
                    <div>
                        <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-accent" />
                        <p className="font-semibold text-primary">{nextAppointment.doctor.name}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        <p>{format(parseISO(nextAppointment.date), 'EEEE, MMMM d, yyyy')}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-5 w-5 text-accent" />
                        <p>{nextAppointment.time}</p>
                        </div>
                    </div>
                    ) : (
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                    )}
                    <Button asChild className="mt-4" variant="secondary">
                    <Link href="/schedule">View Full Schedule</Link>
                    </Button>
                </CardContent>
                </Card>
            </div>
        </div>

        <div className="md:row-start-1 md:col-start-3">
             <UserProfile />
        </div>
      </div>
        
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
