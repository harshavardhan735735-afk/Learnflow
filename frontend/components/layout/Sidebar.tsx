'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDomains } from '@/lib/api';
import type { Domain } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

const NAV_LINKS = [
  { href: '/',           label: 'Dashboard',       icon: '⚡' },
  { href: '/analytics',  label: 'Analytics',        icon: '📊' },
  { href: '/planner',    label: 'Revision Planner', icon: '📅' },
  { href: '/coach',      label: 'AI Coach',         icon: '🤖' },
  { href: '/exam-coach', label: 'Exam Coach',       icon: '🎓' },
];

type SidebarTab = 'main' | 'domains';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('main');

  useEffect(() => {
    getDomains()
      .then(setDomains)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Set open to true on desktop by default
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setOpen(true);
    }
  }, []);

  // Auto-switch to domains tab if we're on a domain page
  useEffect(() => {
    if (pathname.startsWith('/domains/')) {
      setSidebarTab('domains');
    }
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        className="hamburger-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger-icon ${open ? 'open' : ''}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar ${open ? 'sidebar-open' : ''}`}
      >
        {/* Logo */}
        <div suppressHydrationWarning className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div
              suppressHydrationWarning
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold glow"
              style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
            >
              LF
            </div>
            <div suppressHydrationWarning>
              <div suppressHydrationWarning className="font-bold text-base gradient-text">LearnFlow</div>
              <div suppressHydrationWarning className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {user?.name || 'Student'}
              </div>
            </div>
          </Link>
        </div>

        {/* Tab switcher */}
        <div className="py-3">
          <div className="sidebar-tabs">
            <button
              className={`sidebar-tab ${sidebarTab === 'main' ? 'active' : ''}`}
              onClick={() => setSidebarTab('main')}
            >
              ⚡ Main
            </button>
            <button
              className={`sidebar-tab ${sidebarTab === 'domains' ? 'active' : ''}`}
              onClick={() => setSidebarTab('domains')}
            >
              📁 Domains
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {sidebarTab === 'main' ? (
            /* ── Main Navigation ── */
            <nav className="px-3 pb-4">
              {NAV_LINKS.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-all duration-200
                    ${isActive(href)
                      ? 'text-white glow'
                      : 'hover:bg-white/5'
                    }`}
                  style={isActive(href)
                    ? { background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))', color: 'var(--text-primary)' }
                    : { color: 'var(--text-muted)' }
                  }
                >
                  <span className="text-base">{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>
          ) : (
            /* ── Domains List ── */
            <div suppressHydrationWarning className="px-3 pb-4">
              <div
                suppressHydrationWarning
                className="text-xs font-semibold uppercase tracking-wider px-3 mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                All Domains
              </div>

              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div suppressHydrationWarning key={i} className="h-9 rounded-lg mb-1 shimmer" />
                ))
              ) : domains.length > 0 ? (
                domains.map((d) => (
                  <Link
                    key={d.id}
                    href={`/domains/${d.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 text-sm transition-all duration-200
                      ${pathname === `/domains/${d.id}` ? '' : 'hover:bg-white/5'}`}
                    style={
                      pathname === `/domains/${d.id}`
                        ? { background: 'rgba(99,102,241,0.2)', color: 'var(--text-primary)' }
                        : { color: 'var(--text-muted)' }
                    }
                  >
                    <span>{d.icon || '📁'}</span>
                    <span className="truncate">{d.name}</span>
                  </Link>
                ))
              ) : (
                <div className="px-3 py-6 text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    No domains available
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div suppressHydrationWarning className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div suppressHydrationWarning className="text-xs" style={{ color: 'var(--text-muted)' }}>
            🔬 LearnFlow v1.0 — AI-Adaptive
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
