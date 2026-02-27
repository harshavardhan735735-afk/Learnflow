'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useStreak } from '@/lib/streak-context';

const BREADCRUMB_MAP: Record<string, string> = {
  '': 'Dashboard',
  'domains': 'Domains',
  'tests': 'Tests',
  'play': 'Test Player',
  'analytics': 'Analytics',
  'planner': 'Revision Planner',
  'coach': 'AI Coach',
  'exam-coach': 'Exam Coach',
  'results': 'Results',
  'profile': 'Profile',
};

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { streak } = useStreak();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: BREADCRUMB_MAP[seg] || decodeURIComponent(seg),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  // Build day labels for the week based on today
  const todayIdx = new Date().getDay(); // 0=Sun, 1=Mon, ...
  const weekDays: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = (todayIdx - i + 7) % 7;
    weekDays.push(DAY_LABELS[d === 0 ? 6 : d - 1]); // Convert Sun=0 to Mon-based index
  }

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)', minHeight: '64px' }}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm ml-14">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2">
            {i > 0 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
            {i === crumbs.length - 1 ? (
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-muted)' }}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Streak display */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: streak.currentStreak > 0 ? 'rgba(245,158,11,0.12)' : 'var(--bg-card)',
            border: streak.currentStreak > 0 ? '1px solid rgba(245,158,11,0.3)' : '1px solid var(--border)',
            color: streak.currentStreak > 0 ? '#f59e0b' : 'var(--text-muted)',
          }}
          title={`Current: ${streak.currentStreak} days | Best: ${streak.longestStreak} days | Total: ${streak.totalDaysActive} days`}
        >
          <span className="text-sm">🔥</span>
          <span>{streak.currentStreak}</span>
          {/* Mini week dots */}
          <div className="hidden sm:flex items-center gap-0.5 ml-1">
            {streak.weekHistory.map((active, i) => (
              <div
                key={i}
                className="flex flex-col items-center"
                title={`${weekDays[i]}: ${active ? 'Active' : 'Inactive'}`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: active ? '#f59e0b' : 'var(--border)',
                    boxShadow: active ? '0 0 4px rgba(245,158,11,0.5)' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
          <span className="text-xs font-medium hidden sm:inline">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>

        {/* Status */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.3)' }}
        >
          <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: '#6366f1' }} />
          Online
        </div>

        {/* Profile avatar */}
        <Link
          href="/profile"
          className="header-avatar"
          title="View Profile"
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Link>
      </div>
    </header>
  );
}
