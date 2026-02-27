'use client';

import { useState, useMemo } from 'react';
import ChapterDetail from './ChapterDetail';

// ─── Constants ──────────────────────────────────────────────────────────────

const EXAMS = [
  { id: 'jee_main',     label: 'JEE Main',      icon: '🔵', stream: 'MPC', color: '#6366f1' },
  { id: 'jee_advanced', label: 'JEE Advanced',  icon: '🟣', stream: 'MPC', color: '#8b5cf6' },
  { id: 'eamcet_mpc',   label: 'EAMCET (MPC)',  icon: '🟡', stream: 'MPC', color: '#f59e0b' },
  { id: 'eamcet_bipc',  label: 'EAMCET (BiPC)', icon: '🟡', stream: 'BiPC', color: '#f59e0b' },
  { id: 'neet',         label: 'NEET',           icon: '🟢', stream: 'BiPC', color: '#22c55e' },
];

const SUBJECTS: Record<string, string[]> = {
  jee_main:     ['Physics', 'Chemistry', 'Mathematics'],
  jee_advanced: ['Physics', 'Chemistry', 'Mathematics'],
  eamcet_mpc:   ['Physics', 'Chemistry', 'Mathematics'],
  eamcet_bipc:  ['Biology', 'Physics', 'Chemistry'],
  neet:         ['Biology', 'Physics', 'Chemistry'],
};

// ─── Full NTA Chapter Lists ─────────────────────────────────────────────────

const CHAPTERS: Record<string, string[]> = {
  // JEE & NEET Physics (20 chapters — "Communication Systems" removed)
  Physics: [
    'Physics and Measurement',
    'Kinematics',
    'Laws of Motion',
    'Work, Energy, and Power',
    'Rotational Motion',
    'Gravitation',
    'Properties of Solids and Liquids',
    'Thermodynamics',
    'Kinetic Theory of Gases',
    'Oscillations and Waves',
    'Electrostatics',
    'Current Electricity',
    'Magnetic Effects of Current and Magnetism',
    'Electromagnetic Induction and Alternating Currents',
    'Electromagnetic Waves',
    'Optics',
    'Dual Nature of Matter and Radiation',
    'Atoms and Nuclei',
    'Electronic Devices',
    'Experimental Skills',
  ],
  // JEE & NEET Chemistry (21 chapters — removed States of Matter, Surface Chemistry, s-Block, Metallurgy, Polymers, Environmental Chem, Everyday Life)
  Chemistry: [
    // Physical Chemistry
    'Some Basic Concepts in Chemistry',
    'Atomic Structure',
    'Chemical Bonding and Molecular Structure',
    'Chemical Thermodynamics',
    'Solutions',
    'Equilibrium',
    'Redox Reactions',
    'Electrochemistry',
    'Chemical Kinetics',
    // Inorganic Chemistry
    'Classification of Elements and Periodicity',
    'p-Block Elements',
    'd- and f-Block Elements',
    'Coordination Compounds',
    // Organic Chemistry
    'Purification and Characterisation of Organic Compounds',
    'Basic Principles of Organic Chemistry',
    'Hydrocarbons',
    'Organic Compounds Containing Halogens',
    'Organic Compounds Containing Oxygen',
    'Organic Compounds Containing Nitrogen',
    'Biomolecules',
    'Principles Related to Practical Chemistry',
  ],
  // JEE Mathematics (14 chapters — removed Mathematical Induction and Mathematical Reasoning)
  Mathematics: [
    'Sets, Relations, and Functions',
    'Complex Numbers and Quadratic Equations',
    'Matrices and Determinants',
    'Permutations and Combinations',
    'Binomial Theorem and its Simple Applications',
    'Sequence and Series',
    'Limit, Continuity, and Differentiability',
    'Integral Calculus',
    'Differential Equations',
    'Coordinate Geometry',
    'Three-Dimensional Geometry',
    'Vector Algebra',
    'Statistics and Probability',
    'Trigonometry',
  ],
  // NEET Biology (10 chapters)
  Biology: [
    // Class 11
    'Diversity in Living World',
    'Structural Organisation in Animals and Plants',
    'Cell Structure and Function',
    'Plant Physiology',
    'Human Physiology',
    // Class 12
    'Reproduction',
    'Genetics and Evolution',
    'Biology and Human Welfare',
    'Biotechnology and Its Applications',
    'Ecology and Environment',
  ],
};

const WEIGHTAGE: Record<string, Record<string, number>> = {
  jee_main:     { Mathematics: 33, Physics: 33, Chemistry: 34 },
  jee_advanced: { Mathematics: 33, Physics: 33, Chemistry: 34 },
  eamcet_mpc:   { Mathematics: 40, Physics: 30, Chemistry: 30 },
  eamcet_bipc:  { Biology: 50, Physics: 25, Chemistry: 25 },
  neet:          { Biology: 50, Physics: 25, Chemistry: 25 },
};

const MAX_MARKS: Record<string, number> = {
  jee_main: 300, jee_advanced: 360,
  eamcet_mpc: 160, eamcet_bipc: 160, neet: 720,
};

const VIDEO_RESOURCES: Record<string, { title: string; url: string; icon: string }[]> = {
  Mathematics: [
    { title: 'Physics Wallah Maths', url: 'https://www.youtube.com/@PhysicsWallah', icon: '▶️' },
    { title: 'Unacademy JEE Maths',  url: 'https://www.youtube.com/@UnacademyJEE',  icon: '▶️' },
    { title: 'IIT-PAL Lectures',     url: 'https://www.youtube.com/@IITPAL',         icon: '▶️' },
  ],
  Physics: [
    { title: 'Physics Wallah',     url: 'https://www.youtube.com/@PhysicsWallah', icon: '▶️' },
    { title: 'IIT-PAL Physics',    url: 'https://www.youtube.com/@IITPAL',        icon: '▶️' },
    { title: 'Unacademy Physics',  url: 'https://www.youtube.com/@UnacademyJEE',  icon: '▶️' },
  ],
  Chemistry: [
    { title: 'Physics Wallah Chemistry', url: 'https://www.youtube.com/@PhysicsWallah', icon: '▶️' },
    { title: 'Unacademy Chemistry',      url: 'https://www.youtube.com/@UnacademyJEE',  icon: '▶️' },
  ],
  Biology: [
    { title: 'PW NEET Biology',     url: 'https://www.youtube.com/@PWNEET',          icon: '▶️' },
    { title: 'Unacademy NEET',      url: 'https://www.youtube.com/@UnacademyNEET',   icon: '▶️' },
    { title: 'Khan Academy Biology', url: 'https://www.youtube.com/@khanacademy',    icon: '▶️' },
  ],
};

const STRATEGY: Record<string, {
  attemptOrder: string; timeSplit: string; negativeMarking: string;
  highWeightage: string[]; tips: string[];
}> = {
  jee_main: {
    attemptOrder: 'Chemistry → Physics → Mathematics',
    timeSplit: 'Chemistry: 60 min | Physics: 60 min | Maths: 60 min',
    negativeMarking: '−1 for every wrong MCQ. Integer type has no penalty — always attempt.',
    highWeightage: ['Integral Calculus', 'Thermodynamics', 'Basic Principles of Organic Chemistry', 'Coordinate Geometry', 'Electrostatics'],
    tips: [
      'Attempt Chemistry first — it\'s fastest and boosts confidence.',
      'Mark tough MCQs and return in the last 15 min.',
      'Integer-type questions carry no negative — never skip them.',
      'Aim for 85%+ accuracy in Chemistry to compensate Maths time.',
    ],
  },
  jee_advanced: {
    attemptOrder: 'Paper 1: Physics → Chemistry → Maths | Paper 2: Maths → Chemistry → Physics',
    timeSplit: '3 hours per paper — ~60 min per subject',
    negativeMarking: 'Complex partial marking — read each section\'s rules carefully before starting.',
    highWeightage: ['Integral Calculus', 'Electrochemistry', 'Laws of Motion', 'Thermodynamics', 'Coordinate Geometry'],
    tips: [
      'Never guess in partial-marking sections — the penalty is severe.',
      'Solve paragraph-based questions from your strongest subject first.',
      'Leave 20 minutes at end of each paper for review.',
      'Quality over quantity — 15 correct > 25 with errors.',
    ],
  },
  eamcet_mpc: {
    attemptOrder: 'Mathematics → Physics → Chemistry',
    timeSplit: 'Maths: 80 min | Physics: 40 min | Chemistry: 40 min',
    negativeMarking: 'No negative marking — attempt all 160 questions.',
    highWeightage: ['Coordinate Geometry', 'Organic Compounds Containing Oxygen', 'Optics', 'Chemical Thermodynamics'],
    tips: [
      'No negative marking — never leave a question blank.',
      'Maths has 80 questions; speed practice is critical.',
      'Use elimination for tricky options to save time.',
      'Target completing Physics and Chemistry in 80 minutes total.',
    ],
  },
  eamcet_bipc: {
    attemptOrder: 'Biology → Chemistry → Physics',
    timeSplit: 'Biology: 80 min | Chemistry: 40 min | Physics: 40 min',
    negativeMarking: 'No negative marking — attempt all 160 questions.',
    highWeightage: ['Human Physiology', 'Organic Compounds Containing Oxygen', 'Optics', 'Genetics and Evolution'],
    tips: [
      'Biology has the most questions — start with it while fresh.',
      'Revise NCERT diagrams and tables thoroughly.',
      'Physics formulas need quick recall — use a formula sheet.',
      'Chemistry is scoring — aim for 90%+ in Chemistry.',
    ],
  },
  neet: {
    attemptOrder: 'Biology → Chemistry → Physics',
    timeSplit: 'Biology: 90 min | Chemistry: 45 min | Physics: 45 min',
    negativeMarking: '−1 for every wrong answer. Skip if less than 50% confident.',
    highWeightage: ['Human Physiology', 'Genetics and Evolution', 'Basic Principles of Organic Chemistry', 'Ecology and Environment'],
    tips: [
      'Biology (Botany + Zoology) carries 360/720 — master NCERT line by line.',
      'Physics is calculative — don\'t rush, show all working mentally.',
      'Chemistry is most scoring — aim for 95%+ accuracy.',
      'NCERT is the bible for NEET — read it 3+ times.',
    ],
  },
};

const MATERIAL_TYPES = [
  { type: '📘 Concept Notes',      desc: 'Detailed theory with diagrams' },
  { type: '📄 Formula Sheet',      desc: 'All key formulas in one sheet' },
  { type: '📊 Solved Examples',    desc: 'Step-by-step solved problems' },
  { type: '📝 Practice Worksheet', desc: 'Topic-wise practice problems' },
  { type: '📚 Previous Year Qs',   desc: 'Last 10-year exam questions' },
  { type: '⏱ Mini Timed Test',     desc: '20-question 25-min drill' },
  { type: '🧠 Flashcards',         desc: 'Quick recall cards' },
  { type: '🎯 Strategy Notes',     desc: 'Exam-specific approach guide' },
];

const TABS = ['🏠 Setup', '📊 Mock Analysis', '📅 Revision Plan', '📚 Materials', '🎯 Strategy', '📈 Prediction'];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChapterAccuracy { chapter: string; subject: string; accuracy: number }
interface WeakChapter { chapter: string; subject: string; accuracy: number; mistakeType: string; priority: 'High' | 'Medium' | 'Low' }
interface DaySession { subject: string; chapter: string; durationMinutes: number; sessionType: string }
interface DayPlan { day: number; date: string; sessions: DaySession[]; totalMinutes: number }

// ─── Helper ──────────────────────────────────────────────────────────────────

function classifyMistake(acc: number): string {
  if (acc < 40) return 'Conceptual';
  if (acc < 60) return 'Calculation';
  if (acc < 75) return 'Careless';
  if (acc < 85) return 'Time Pressure';
  return 'Strong';
}

function getPriorityColor(p: string) {
  return p === 'High' ? '#ef4444' : p === 'Medium' ? '#f59e0b' : '#22c55e';
}

function genPlan(weakChapters: WeakChapter[], _examType: string): DayPlan[] {
  const today = new Date();
  const sorted = [...weakChapters].sort((a, b) => a.accuracy - b.accuracy);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() + i);
    const sessions: DaySession[] = [];
    if (i === 6) {
      sorted.slice(0, 3).forEach(t => sessions.push({ subject: t.subject, chapter: t.chapter, durationMinutes: 30, sessionType: 'Revision' }));
      sessions.push({ subject: 'All Subjects', chapter: 'Full Mock Test', durationMinutes: 60, sessionType: 'Mini Test' });
    } else {
      const a = sorted[(i * 2) % Math.max(sorted.length, 1)];
      const b = sorted[(i * 2 + 1) % Math.max(sorted.length, 1)];
      [a, b].filter(Boolean).forEach(t => {
        sessions.push({ subject: t.subject, chapter: t.chapter, durationMinutes: t.priority === 'High' ? 45 : 30, sessionType: t.mistakeType === 'Conceptual' ? 'Concept' : 'Practice' });
      });
      if (sorted[0]) sessions.push({ subject: sorted[0].subject, chapter: `PYQ — ${sorted[0].chapter}`, durationMinutes: 20, sessionType: 'PYQ' });
    }
    return { day: i + 1, date: d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }), sessions, totalMinutes: sessions.reduce((s, x) => s + x.durationMinutes, 0) };
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SetupTab({ examType, setExamType, onChapterClick }: { examType: string; setExamType: (e: string) => void; onChapterClick: (subject: string, chapter: string) => void }) {
  const selected = EXAMS.find(e => e.id === examType);
  const subjects = SUBJECTS[examType] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Select Your Exam</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          The system will adapt the analysis, plan, and strategy to your specific exam.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAMS.map(exam => (
            <button
              key={exam.id}
              onClick={() => setExamType(exam.id)}
              className="p-5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: examType === exam.id ? `linear-gradient(135deg, ${exam.color}22, ${exam.color}11)` : 'var(--bg-card)',
                border: examType === exam.id ? `2px solid ${exam.color}` : '2px solid var(--border)',
                boxShadow: examType === exam.id ? `0 0 20px ${exam.color}33` : 'none',
              }}
            >
              <div className="text-3xl mb-2">{exam.icon}</div>
              <div className="font-bold text-base">{exam.label}</div>
              <div className="text-xs mt-1 px-2 py-0.5 rounded-full w-fit" style={{ background: `${exam.color}22`, color: exam.color }}>
                {exam.stream}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="glass p-5 rounded-2xl space-y-3" style={{ borderLeft: `3px solid ${selected.color}` }}>
          <div className="font-semibold">{selected.icon} {selected.label} — Subjects</div>
          <div className="flex flex-wrap gap-2">
            {subjects.map(s => (
              <span key={s} className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ background: `${selected.color}22`, color: selected.color, border: `1px solid ${selected.color}44` }}>
                {s}
              </span>
            ))}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Max Marks: <strong>{MAX_MARKS[selected.id]}</strong> &nbsp;|&nbsp;
            Stream: <strong>{selected.stream}</strong>
          </div>
        </div>
      )}

      {/* Chapter listing per subject */}
      {selected && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">📖 Syllabus Chapters</h3>
          {subjects.map(subject => {
            const chapters = CHAPTERS[subject] || [];
            return (
              <div key={subject} className="glass p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold">{subject}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${selected.color}22`, color: selected.color }}>
                    {chapters.length} chapters
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chapters.map((ch, i) => (
                    <button key={i} onClick={() => onChapterClick(subject, ch)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = selected!.color; e.currentTarget.style.color = selected!.color; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                      {ch} →
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!examType && (
        <div className="glass p-10 text-center rounded-2xl" style={{ border: '2px dashed var(--border)' }}>
          <div className="text-5xl mb-3">🎓</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pick an exam above to get started</p>
        </div>
      )}
    </div>
  );
}

function MockAnalysisTab({
  examType, chapterAccuracies, setChapterAccuracies, weakChapters, setWeakChapters,
}: {
  examType: string;
  chapterAccuracies: ChapterAccuracy[];
  setChapterAccuracies: (t: ChapterAccuracy[]) => void;
  weakChapters: WeakChapter[];
  setWeakChapters: (w: WeakChapter[]) => void;
}) {
  const subjects = SUBJECTS[examType] || [];
  const exam = EXAMS.find(e => e.id === examType);
  const [activeSubject, setActiveSubject] = useState(subjects[0] || '');

  const getAcc = (chapter: string, subject: string) =>
    chapterAccuracies.find(t => t.chapter === chapter && t.subject === subject)?.accuracy ?? 70;

  const setAcc = (chapter: string, subject: string, accuracy: number) => {
    setChapterAccuracies([
      ...chapterAccuracies.filter(t => !(t.chapter === chapter && t.subject === subject)),
      { chapter, subject, accuracy },
    ]);
  };

  const analyze = () => {
    const allEntries = subjects.flatMap(subj =>
      (CHAPTERS[subj] || []).map(chapter => ({
        chapter, subject: subj, accuracy: getAcc(chapter, subj),
      }))
    );
    const weak: WeakChapter[] = allEntries
      .filter(e => e.accuracy < 85)
      .map(e => ({
        ...e,
        mistakeType: classifyMistake(e.accuracy),
        priority: e.accuracy < 50 ? 'High' : e.accuracy < 70 ? 'Medium' : 'Low',
      })) as WeakChapter[];
    setWeakChapters(weak.sort((a, b) => a.accuracy - b.accuracy));
  };

  if (!examType) return (
    <div className="glass p-10 text-center rounded-2xl">
      <div className="text-4xl mb-3">⚠️</div>
      <p style={{ color: 'var(--text-muted)' }}>Please select an exam in the Setup tab first.</p>
    </div>
  );

  const chapters = CHAPTERS[activeSubject] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Mock Test Analysis</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Set your accuracy % per chapter. Drag the sliders.</p>
        </div>
        <button onClick={analyze}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all"
          style={{ background: `linear-gradient(135deg, ${exam?.color || '#6366f1'}, #22d3ee)`, color: 'white' }}>
          🔍 Analyze All Subjects
        </button>
      </div>

      {/* Subject tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1">
        {subjects.map(s => (
          <button key={s} onClick={() => setActiveSubject(s)}
            className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: activeSubject === s ? `linear-gradient(135deg, ${exam?.color || '#6366f1'}33, ${exam?.color || '#6366f1'}11)` : 'var(--bg-card)',
              border: activeSubject === s ? `1px solid ${exam?.color || '#6366f1'}` : '1px solid var(--border)',
              color: activeSubject === s ? exam?.color || '#6366f1' : 'var(--text-muted)',
            }}>
            {s}
            <span className="ml-1.5 text-xs opacity-60">({(CHAPTERS[s] || []).length})</span>
          </button>
        ))}
      </div>

      {/* Chapter accuracy sliders for active subject */}
      <div className="glass p-5 rounded-xl">
        <div className="font-semibold mb-4 flex items-center gap-2">
          <span>{activeSubject}</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${exam?.color || '#6366f1'}22`, color: exam?.color || '#6366f1' }}>
            {chapters.length} chapters
          </span>
        </div>
        <div className="space-y-3">
          {chapters.map(chapter => {
            const acc = getAcc(chapter, activeSubject);
            const color = acc >= 75 ? '#22c55e' : acc >= 50 ? '#f59e0b' : '#ef4444';
            return (
              <div key={chapter} className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{chapter}</span>
                  <span className="font-bold" style={{ color }}>{acc}%</span>
                </div>
                <input type="range" min={0} max={100} value={acc}
                  onChange={e => setAcc(chapter, activeSubject, Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: color }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak chapters detected */}
      {weakChapters.length > 0 && (
        <div className="glass p-5 rounded-xl space-y-4">
          <h3 className="font-semibold">🔴 Weak Chapters Detected ({weakChapters.length})</h3>

          {/* Group by subject */}
          {subjects.map(subj => {
            const subjectWeakChapters = weakChapters.filter(w => w.subject === subj);
            if (subjectWeakChapters.length === 0) return null;
            return (
              <div key={subj}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: exam?.color || '#6366f1' }}>
                  {subj} ({subjectWeakChapters.length})
                </div>
                <div className="space-y-2">
                  {subjectWeakChapters.map((wt, i) => {
                    const pc = getPriorityColor(wt.priority);
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg"
                        style={{ background: 'var(--bg-primary)', borderLeft: `3px solid ${pc}` }}>
                        <div>
                          <div className="text-sm font-medium">{wt.chapter}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{wt.mistakeType} error</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: pc }}>{wt.accuracy}%</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${pc}22`, color: pc }}>{wt.priority}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RevisionPlanTab({ examType, weakChapters }: { examType: string; weakChapters: WeakChapter[] }) {
  const [plan, setPlan] = useState<DayPlan[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const exam = EXAMS.find(e => e.id === examType);

  const generate = () => {
    setPlan(genPlan(weakChapters, examType));
    setSelectedDay(0);
  };

  const sessionColor: Record<string, string> = { Concept: '#6366f1', Practice: '#22d3ee', Revision: '#f59e0b', 'Mini Test': '#22c55e', PYQ: '#8b5cf6' };
  const dayData = plan[selectedDay];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">7-Day Revision Plan</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {weakChapters.length > 0 ? `Targeting ${weakChapters.length} weak chapters` : 'Run Mock Analysis first to get a personalized plan'}
          </p>
        </div>
        <button onClick={generate}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all"
          style={{ background: `linear-gradient(135deg, ${exam?.color || '#6366f1'}, #22d3ee)`, color: 'white' }}>
          {plan.length > 0 ? '🔄 Regenerate' : '✨ Generate Plan'}
        </button>
      </div>

      {plan.length === 0 && (
        <div className="glass p-10 text-center rounded-2xl" style={{ border: '2px dashed var(--border)' }}>
          <div className="text-5xl mb-3">📅</div>
          <p style={{ color: 'var(--text-muted)' }}>Click Generate Plan to create your adaptive 7-day schedule</p>
        </div>
      )}

      {plan.length > 0 && (
        <>
          <div className="grid grid-cols-7 gap-2">
            {plan.map((day, i) => (
              <button key={i} onClick={() => setSelectedDay(i)}
                className="p-2 rounded-xl text-center transition-all hover:scale-105"
                style={{
                  background: i === selectedDay ? 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(34,211,238,0.2))' : 'var(--bg-card)',
                  border: i === selectedDay ? '1px solid rgba(99,102,241,0.6)' : '1px solid var(--border)',
                }}>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>D{day.day}</div>
                <div className="text-sm font-bold my-0.5" style={{ color: i === selectedDay ? 'white' : 'var(--text-primary)' }}>{day.sessions.length}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{day.totalMinutes}m</div>
              </button>
            ))}
          </div>

          {dayData && (
            <div className="glass p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Day {dayData.day} — {dayData.date}</h3>
                <span className="text-sm px-3 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>
                  ⏱ {dayData.totalMinutes} min
                </span>
              </div>
              <div className="space-y-2">
                {dayData.sessions.map((s, i) => {
                  const c = sessionColor[s.sessionType] || '#6366f1';
                  const vids = VIDEO_RESOURCES[s.subject] || [];
                  return (
                    <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)', borderLeft: `3px solid ${c}` }}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium">{s.chapter}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${c}22`, color: c }}>{s.sessionType}</span>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.subject} · {s.durationMinutes} min</span>
                          </div>
                        </div>
                      </div>
                      {vids.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {vids.map((v, j) => (
                            <a key={j} href={v.url} target="_blank" rel="noopener noreferrer"
                              className="text-xs flex items-center gap-1 hover:underline"
                              style={{ color: '#6366f1' }}>
                              {v.icon} {v.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MaterialsTab({ examType }: { examType: string }) {
  const subjects = SUBJECTS[examType] || [];
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || '');
  const exam = EXAMS.find(e => e.id === examType);
  const videos = VIDEO_RESOURCES[selectedSubject] || [];
  const chapters = CHAPTERS[selectedSubject] || [];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold mb-1">Study Materials</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Curated resources for each subject and chapter</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subjects.map(s => (
          <button key={s} onClick={() => setSelectedSubject(s)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: selectedSubject === s ? `linear-gradient(135deg, ${exam?.color || '#6366f1'}33, ${exam?.color || '#6366f1'}11)` : 'var(--bg-card)',
              border: selectedSubject === s ? `1px solid ${exam?.color || '#6366f1'}` : '1px solid var(--border)',
              color: selectedSubject === s ? exam?.color || '#6366f1' : 'var(--text-muted)',
            }}>
            {s}
          </button>
        ))}
      </div>

      {selectedSubject && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MATERIAL_TYPES.map((m) => (
              <div key={m.type} className="glass p-4 rounded-xl hover:scale-105 transition-all cursor-pointer"
                style={{ border: '1px solid var(--border)' }}>
                <div className="text-2xl mb-2">{m.type.split(' ')[0]}</div>
                <div className="text-xs font-semibold">{m.type.slice(3)}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{m.desc}</div>
              </div>
            ))}
          </div>

          <div className="glass p-5 rounded-xl">
            <h3 className="font-semibold mb-3">📹 Video Resources — {selectedSubject}</h3>
            <div className="space-y-3">
              {videos.map((v, i) => (
                <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{ background: 'rgba(239,68,68,0.15)' }}>
                    ▶️
                  </div>
                  <div>
                    <div className="text-sm font-medium">{v.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>YouTube · Free</div>
                  </div>
                  <div className="ml-auto text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>
                    Open →
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="glass p-5 rounded-xl">
            <h3 className="font-semibold mb-3">📖 Chapters — {selectedSubject}</h3>
            <div className="flex flex-wrap gap-2">
              {chapters.map((ch, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-sm cursor-pointer hover:scale-105 transition-all"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StrategyTab({ examType }: { examType: string }) {
  const s = STRATEGY[examType];
  const exam = EXAMS.find(e => e.id === examType);
  if (!examType || !s) return (
    <div className="glass p-10 text-center rounded-2xl">
      <div className="text-4xl mb-3">🎯</div>
      <p style={{ color: 'var(--text-muted)' }}>Select an exam in the Setup tab first.</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Exam Strategy — {exam?.label}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-5 rounded-xl" style={{ borderLeft: `3px solid ${exam?.color}` }}>
          <div className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: exam?.color }}>Attempt Order</div>
          <div className="font-medium">{s.attemptOrder}</div>
        </div>
        <div className="glass p-5 rounded-xl" style={{ borderLeft: '3px solid #22d3ee' }}>
          <div className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: '#22d3ee' }}>Time Split</div>
          <div className="font-medium">{s.timeSplit}</div>
        </div>
        <div className="glass p-5 rounded-xl md:col-span-2" style={{ borderLeft: '3px solid #ef4444' }}>
          <div className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: '#ef4444' }}>Negative Marking Rule</div>
          <div className="font-medium">{s.negativeMarking}</div>
        </div>
      </div>

      <div className="glass p-5 rounded-xl">
        <h3 className="font-semibold mb-3">🏆 High-Weightage Chapters</h3>
        <div className="flex flex-wrap gap-2">
          {s.highWeightage.map(t => (
            <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ background: `${exam?.color}22`, color: exam?.color, border: `1px solid ${exam?.color}44` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="glass p-5 rounded-xl">
        <h3 className="font-semibold mb-3">💡 Expert Tips</h3>
        <div className="space-y-3">
          {s.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: `${exam?.color}33`, color: exam?.color }}>
                {i + 1}
              </span>
              <span className="text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictionTab({ examType, chapterAccuracies }: { examType: string; chapterAccuracies: ChapterAccuracy[] }) {
  const exam = EXAMS.find(e => e.id === examType);

  const { predicted, subjectScores, readiness, subjects, maxMarks, weightage } = useMemo(() => {
    const subjects = SUBJECTS[examType] || [];
    const maxMarks = MAX_MARKS[examType] || 300;
    const weightage = WEIGHTAGE[examType] || {};
    const subjectAvg: Record<string, number> = {};
    subjects.forEach(subj => {
      const entries = chapterAccuracies.filter(t => t.subject === subj);
      const avg = entries.length ? entries.reduce((s, e) => s + e.accuracy, 0) / entries.length : 70;
      subjectAvg[subj] = avg;
    });
    let total = 0;
    const subjectScores: Record<string, number> = {};
    subjects.forEach(subj => {
      const w = weightage[subj] || 33;
      const subjectMaxMarks = (w / 100) * maxMarks;
      const score = (subjectAvg[subj] / 100) * subjectMaxMarks;
      subjectScores[subj] = Math.round(score);
      total += score;
    });
    return { predicted: Math.round(total), subjectScores, readiness: Math.round((total / maxMarks) * 100), subjects, maxMarks, weightage };
  }, [examType, chapterAccuracies]);

  const readinessColor = readiness >= 70 ? '#22c55e' : readiness >= 50 ? '#f59e0b' : '#ef4444';
  const readinessEmoji = readiness >= 70 ? '🎉' : readiness >= 50 ? '👍' : '💪';
  const percentile = Math.min(99.9, readiness * 0.95);
  const rank = readiness >= 80 ? '< 5,000' : readiness >= 65 ? '5K – 20K' : readiness >= 50 ? '20K – 80K' : '> 80K';

  if (!examType) return (
    <div className="glass p-10 text-center rounded-2xl">
      <div className="text-4xl mb-3">📈</div>
      <p style={{ color: 'var(--text-muted)' }}>Select an exam and enter chapter scores first.</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Score Prediction</h2>

      <div className="glass p-8 text-center rounded-2xl" style={{ borderLeft: `3px solid ${readinessColor}` }}>
        <div className="text-5xl mb-2">{readinessEmoji}</div>
        <div className="text-5xl font-bold mb-1" style={{ color: readinessColor }}>{predicted}<span className="text-2xl text-gray-400">/{maxMarks}</span></div>
        <div className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Predicted Score — {exam?.label}</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Readiness', value: `${readiness}%`, color: readinessColor },
          { label: 'Percentile', value: `~${percentile.toFixed(1)}`, color: '#22d3ee' },
          { label: 'Est. Rank', value: rank, color: exam?.color || '#6366f1' },
        ].map(c => (
          <div key={c.label} className="glass p-4 text-center rounded-xl">
            <div className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div className="glass p-5 rounded-xl">
        <h3 className="font-semibold mb-4">Subject-wise Score Breakdown</h3>
        <div className="space-y-4">
          {subjects.map(subj => {
            const score = subjectScores[subj] || 0;
            const w = weightage[subj] || 33;
            const subjectMax = Math.round((w / 100) * maxMarks);
            const pct = subjectMax > 0 ? (score / subjectMax) * 100 : 0;
            const color = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
            return (
              <div key={subj}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{subj}</span>
                  <span style={{ color }}>{score}/{subjectMax} ({Math.round(pct)}%)</span>
                </div>
                <div className="h-3 rounded-full" style={{ background: 'var(--bg-card)' }}>
                  <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass p-4 rounded-xl" style={{ border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
        <div className="text-xs" style={{ color: '#f59e0b' }}>
          ⚠️ <strong>Disclaimer:</strong> This is an indicative estimate based on average chapter accuracy. Actual results depend on exam difficulty, attempt quality, and revision between now and exam day.
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ExamCoachPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [examType, setExamType] = useState('');
  const [chapterAccuracies, setChapterAccuracies] = useState<ChapterAccuracy[]>([]);
  const [weakChapters, setWeakChapters] = useState<WeakChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<{ subject: string; chapter: string } | null>(null);

  const exam = EXAMS.find(e => e.id === examType);

  // Chapter detail view
  if (selectedChapter && exam) {
    return (
      <div className="space-y-6 slide-in">
        <ChapterDetail
          subject={selectedChapter.subject}
          chapter={selectedChapter.chapter}
          examColor={exam.color}
          onBack={() => setSelectedChapter(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 slide-in">
      {/* Header */}
      <div className="glass p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 80% 50%, #6366f1, transparent 60%)' }} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">🎓 Exam Coach</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              AI-powered personalized coaching for JEE · IIT · EAMCET · NEET
            </p>
          </div>
          {exam && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: `${exam.color}22`, color: exam.color, border: `1px solid ${exam.color}44` }}>
              {exam.icon} {exam.label}
            </div>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex overflow-x-auto gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {TABS.map((tab, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: activeTab === i ? 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(34,211,238,0.2))' : 'transparent',
              color: activeTab === i ? 'white' : 'var(--text-muted)',
              border: activeTab === i ? '1px solid rgba(99,102,241,0.5)' : '1px solid transparent',
            }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 0 && <SetupTab examType={examType} setExamType={setExamType} onChapterClick={(s, c) => setSelectedChapter({ subject: s, chapter: c })} />}
        {activeTab === 1 && (
          <MockAnalysisTab
            examType={examType}
            chapterAccuracies={chapterAccuracies}
            setChapterAccuracies={setChapterAccuracies}
            weakChapters={weakChapters}
            setWeakChapters={setWeakChapters}
          />
        )}
        {activeTab === 2 && <RevisionPlanTab examType={examType} weakChapters={weakChapters} />}
        {activeTab === 3 && <MaterialsTab examType={examType} />}
        {activeTab === 4 && <StrategyTab examType={examType} />}
        {activeTab === 5 && <PredictionTab examType={examType} chapterAccuracies={chapterAccuracies} />}
      </div>
    </div>
  );
}
