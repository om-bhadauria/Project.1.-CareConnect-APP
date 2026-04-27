import { specializations } from '@/lib/doctors';
import DoctorList from '@/components/app/DoctorList';
import ProtectedRoute from '@/components/app/ProtectedRoute';

export default function DoctorsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">Find a Doctor</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your trusted partner in finding healthcare in India.</p>
        </div>
        <DoctorList allSpecializations={specializations} />
      </div>
    </ProtectedRoute>
  );
}
