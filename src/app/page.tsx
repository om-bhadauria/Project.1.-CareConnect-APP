import LoginForm from '@/components/app/LoginForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="space-y-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Welcome to CareConnect</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Please log in to access your account.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
