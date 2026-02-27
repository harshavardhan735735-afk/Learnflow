'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date string (YYYY-MM-DD)
  totalDaysActive: number;
  weekHistory: boolean[]; // last 7 days: true = active, false = inactive (index 0 = 6 days ago, 6 = today)
}

interface StreakCtx {
  streak: StreakData;
  recordActivity: () => void;
}

const defaultStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  totalDaysActive: 0,
  weekHistory: [false, false, false, false, false, false, false],
};

const StreakContext = createContext<StreakCtx>({
  streak: defaultStreak,
  recordActivity: () => {},
});

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getDaysDiff(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return Math.floor((d2.getTime() - d1.getTime()) / (86400000));
}

function buildWeekHistory(lastActiveDate: string, currentStreak: number): boolean[] {
  const today = getToday();
  const week: boolean[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    if (dateStr === lastActiveDate) {
      week.push(true);
    } else if (dateStr <= today && lastActiveDate) {
      const diff = getDaysDiff(dateStr, lastActiveDate);
      // If this date is within the current streak range
      week.push(diff >= 0 && diff < currentStreak);
    } else {
      week.push(false);
    }
  }

  return week;
}

export function StreakProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useState<StreakData>(defaultStreak);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('learnflow-streak');
      if (saved) {
        const data: StreakData = JSON.parse(saved);
        const today = getToday();

        // Check if streak is broken (missed more than 1 day)
        if (data.lastActiveDate) {
          const diff = getDaysDiff(data.lastActiveDate, today);
          if (diff > 1) {
            // Streak broken — reset current, keep longest and total
            data.currentStreak = 0;
          }
        }

        data.weekHistory = buildWeekHistory(data.lastActiveDate, data.currentStreak);
        setStreak(data);
      }
    } catch {
      // Invalid data, use defaults
    }
  }, []);

  const recordActivity = useCallback(() => {
    setStreak(prev => {
      const today = getToday();

      // Already recorded today
      if (prev.lastActiveDate === today) return prev;

      const diff = prev.lastActiveDate ? getDaysDiff(prev.lastActiveDate, today) : -1;
      let newCurrent: number;

      if (diff === 1) {
        // Consecutive day
        newCurrent = prev.currentStreak + 1;
      } else if (diff === 0) {
        // Same day (shouldn't reach here but safety)
        return prev;
      } else {
        // First day or streak broken
        newCurrent = 1;
      }

      const newLongest = Math.max(prev.longestStreak, newCurrent);
      const newTotal = prev.totalDaysActive + 1;

      const updated: StreakData = {
        currentStreak: newCurrent,
        longestStreak: newLongest,
        lastActiveDate: today,
        totalDaysActive: newTotal,
        weekHistory: buildWeekHistory(today, newCurrent),
      };

      localStorage.setItem('learnflow-streak', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Auto-record activity on mount (user opened the app today)
  useEffect(() => {
    const timer = setTimeout(() => recordActivity(), 1000);
    return () => clearTimeout(timer);
  }, [recordActivity]);

  return (
    <StreakContext.Provider value={{ streak, recordActivity }}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  return useContext(StreakContext);
}
