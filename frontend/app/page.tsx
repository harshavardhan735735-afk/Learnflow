'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDomains, getAnalytics } from '@/lib/api';
import type { Domain, Analytics } from '@/lib/types';

const STUDENT_ID = process.env.NEXT_PUBLIC_STUDENT_ID || 'student_1';

export default function HomePage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDomains(),
      getAnalytics(STUDENT_ID).catch(() => null),
    ]).then(([d, a]) => {
      setDomains(d);
      setAnalytics(a);
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Tests Taken', value: analytics?.total_tests_taken ?? 0, icon: '📝', color: '#6366f1' },
    { label: 'Overall Accuracy', value: `${analytics?.overall_accuracy ?? 0}%`, icon: '🎯', color: '#22d3ee' },
    { label: 'Weak Topics', value: analytics?.weakest_topics.length ?? 0, icon: '⚠️', color: '#f59e0b' },
    { label: 'Domains Available', value: domains.length, icon: '🌐', color: '#22c55e' },
  ];

  return (
    <div className="space-y-8 slide-in">
      {/* Hero */}
      <div className="glass p-8 relative overflow-hidden" style={{ borderRadius: '16px' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #6366f1, transparent 60%)' }}
        />
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back! 👋
          </h1>
          <p style={{ color: 'var(--text-muted)' }} className="text-base mb-6">
            {analytics?.total_tests_taken
              ? `You've taken ${analytics.total_tests_taken} tests. Keep it up!`
              : 'Start your learning journey — pick a domain below.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/analytics"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', color: 'white' }}
            >
              View Analytics →
            </Link>
            <Link
              href="/planner"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:bg-white/10"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              📅 My Revision Plan
            </Link>
            <Link
              href="/coach"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 hover:bg-white/10"
              style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            >
              🤖 Ask AI Coach
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass p-5 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {loading ? '—' : s.value}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weak topics alert */}
      {analytics && analytics.weakest_topics.length > 0 && (
        <div
          className="glass p-4 flex items-start gap-3"
          style={{ borderLeft: '3px solid #f59e0b' }}
        >
          <span className="text-xl mt-0.5">⚠️</span>
          <div>
            <div className="font-semibold text-sm mb-1">Focus Areas</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Your weakest topics: {analytics.weakest_topics.slice(0, 4).join(', ')}.{' '}
              <Link href="/planner" className="underline" style={{ color: '#6366f1' }}>
                Generate a revision plan →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Domains Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4">Explore Domains</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-28 rounded-xl shimmer" />
              ))
            : domains.map((d) => (
                <Link
                  key={d.id}
                  href={`/domains/${d.id}`}
                  className="glass p-4 flex flex-col items-center text-center gap-2 hover:scale-105 transition-all duration-200 hover:glow group"
                  style={{ minHeight: '112px' }}
                >
                  <span className="text-3xl">{d.icon || '📁'}</span>
                  <span
                    className="text-xs font-medium leading-tight group-hover:text-white transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {d.name}
                  </span>
                </Link>
              ))}
        </div>
      </div>

      {/* Recent attempts */}
      {analytics && analytics.recent_attempts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Attempts</h2>
          <div className="glass overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Test', 'Score', 'Accuracy', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analytics.recent_attempts.slice(0, 5).map((a) => (
                  <tr
                    key={a.attempt_id}
                    style={{ borderBottom: '1px solid var(--border)' }}
                    className="hover:bg-white/5"
                  >
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]">{a.test_name}</td>
                    <td className="px-4 py-3">{a.score}/{a.total}</td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: a.percentage >= 70 ? 'rgba(34,197,94,0.15)' : a.percentage >= 50 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                          color: a.percentage >= 70 ? '#22c55e' : a.percentage >= 50 ? '#f59e0b' : '#ef4444',
                        }}
                      >
                        {a.percentage}%
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-muted)' }}>
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
