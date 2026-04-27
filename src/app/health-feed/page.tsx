import HealthFeed from '@/components/app/HealthFeed';
import ProtectedRoute from '@/components/app/ProtectedRoute';

export default function HealthFeedPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline text-primary">Health Feed</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A curated selection of recent news and developments in health and medicine.
          </p>
        </div>
        <HealthFeed />
      </div>
    </ProtectedRoute>
  );
}
