'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="space-y-6 slide-in" style={{ maxWidth: 600, margin: '0 auto', paddingTop: 40 }}>
        <div className="glass p-8 text-center">
          <p style={{ color: 'var(--text-muted)' }}>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="space-y-6 slide-in" style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Profile hero */}
      <div className="glass p-8 relative overflow-hidden text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, #6366f1, transparent 70%)' }}
        />
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 glow"
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', color: 'white' }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="glass p-6">
        <h2 className="text-lg font-semibold mb-4">Profile Details</h2>
        <div className="space-y-4">
          <div className="profile-row">
            <span className="profile-label">📝 Full Name</span>
            <span className="profile-value">{user.name}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">📧 Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">🎯 Exam Type</span>
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}
            >
              {user.exam_type}
            </span>
          </div>
          <div className="profile-row">
            <span className="profile-label">📅 Member Since</span>
            <span className="profile-value">{memberSince}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="glass p-6">
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
          style={{
            background: 'rgba(239,68,68,0.15)',
            color: '#ef4444',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
