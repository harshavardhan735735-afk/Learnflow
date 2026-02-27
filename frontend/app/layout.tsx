import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';
import { StreakProvider } from '@/lib/streak-context';
import AppShell from '../components/layout/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearnFlow — Adaptive Learning Platform',
  description: 'AI-powered adaptive learning with personalized revision planning, performance analytics, and an AI coaching assistant.',
  keywords: 'adaptive learning, AI tutor, revision planner, mock tests, analytics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
        style={{ background: 'var(--bg-primary)' }}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider>
            <StreakProvider>
              <AppShell>{children}</AppShell>
            </StreakProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
