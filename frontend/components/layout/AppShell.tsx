'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Sidebar from './Sidebar';
import Header from './Header';

const AUTH_ROUTES = ['/login', '/signup'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn, loading } = useAuth();

  const isAuthPage = AUTH_ROUTES.includes(pathname);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="auth-spinner-lg" />
      </div>
    );
  }

  // Auth pages: full-screen, no sidebar/header
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Redirect to login if not logged in (client-side)
  if (!isLoggedIn) {
    // Use direct navigation to avoid hooks issues
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="auth-spinner-lg" />
      </div>
    );
  }

  // Normal app layout
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
