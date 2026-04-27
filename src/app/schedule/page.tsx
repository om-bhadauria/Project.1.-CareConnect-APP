import ScheduleView from '@/components/app/ScheduleView';
import ProtectedRoute from '@/components/app/ProtectedRoute';

export default function SchedulePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">My Schedule</h1>
          <p className="text-muted-foreground mt-2 text-lg">View and manage your upcoming appointments.</p>
        </div>
        <ScheduleView />
      </div>
    </ProtectedRoute>
  );
}
