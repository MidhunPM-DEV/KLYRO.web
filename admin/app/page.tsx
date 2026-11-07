import AdminDashboard from '@/admin/components/AdminDashboard';
import AuthGuard from '@/admin/components/AuthGuard';

export default function AdminHomePage() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
}

