'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import type { ExamType } from '@/lib/types';

const EXAM_TYPES: { value: ExamType; label: string; icon: string }[] = [
  { value: 'JEE', label: 'JEE', icon: '⚡' },
  { value: 'NEET', label: 'NEET', icon: '🔬' },
  { value: 'BOARDS', label: 'Boards', icon: '📚' },
  { value: 'CAT', label: 'CAT', icon: '📊' },
  { value: 'GATE', label: 'GATE', icon: '🔧' },
  { value: 'UPSC', label: 'UPSC', icon: '🏛️' },
  { value: 'OTHER', label: 'Other', icon: '📝' },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examType, setExamType] = useState<ExamType>('OTHER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password, examType);
      router.push('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card slide-in">
        {/* Logo */}
        <div className="auth-logo">
          <div
            className="auth-logo-icon glow"
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)' }}
          >
            LF
          </div>
          <h1 className="auth-title gradient-text">Join LearnFlow</h1>
          <p className="auth-subtitle">Create your account and start learning</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>

          <div className="auth-field">
            <label>Exam Type</label>
            <div className="exam-type-grid">
              {EXAM_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`exam-type-btn ${examType === t.value ? 'active' : ''}`}
                  onClick={() => setExamType(t.value)}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <span className="auth-spinner" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
