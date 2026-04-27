import ProtectedRoute from '@/components/app/ProtectedRoute';
import BookAppointmentClient from '@/components/app/BookAppointmentClient';

export default async function BookAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <ProtectedRoute>
      <BookAppointmentClient doctorId={id} />
    </ProtectedRoute>
  );
}
