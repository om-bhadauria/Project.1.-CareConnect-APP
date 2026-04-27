import AddDoctorForm from '@/components/app/AddDoctorForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProtectedRoute from '@/components/app/ProtectedRoute';

export default function AddDoctorPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Join Our Network</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Are you a doctor? Add your profile to be listed on CareConnect.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Create Your Profile</CardTitle>
            <CardDescription>
              Fill in the details below to create your professional profile on our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddDoctorForm />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
