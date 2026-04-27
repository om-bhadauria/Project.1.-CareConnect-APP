import SymptomChecker from '@/components/app/SymptomChecker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProtectedRoute from '@/components/app/ProtectedRoute';

export default function SymptomCheckerPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline text-primary">Symptom Checker</h1>
            <p className="text-muted-foreground mt-2 text-lg">Describe your symptoms to get a doctor recommendation.</p>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="font-headline">Analyze Your Symptoms</CardTitle>
            <CardDescription>
                Not sure which specialist to consult? Describe your symptoms, and our AI will suggest the right type of doctor for you.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <SymptomChecker />
            </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
