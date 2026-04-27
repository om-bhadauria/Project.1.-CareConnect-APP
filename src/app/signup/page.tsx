import SignUpForm from '@/components/app/SignUpForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SignUpPage() {
  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Create Account</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Join CareConnect today.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Sign Up</CardTitle>
          <CardDescription>
            Enter your details to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
