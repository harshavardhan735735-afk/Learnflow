'use client';

import { useState } from 'react';
import { getChapterMockTest, getChapterResources } from './chapter-data';
import type { MCQ } from './chapter-data';
import { getChapterFormulas } from './formula-data';
import type { FormulaSection } from './formula-data';
import { getChapterTopics } from './topics-data';
import { getChapterPrerequisites } from './prerequisites-data';
import type { Prerequisite } from './prerequisites-data';

interface Props {
  subject: string;
  chapter: string;
  examColor: string;
  onBack: () => void;
}

type Tab = 'prerequisites' | 'topics' | 'mock' | 'resources' | 'formulas';

export default function ChapterDetail({ subject, chapter, examColor, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('prerequisites');
  const questions = getChapterMockTest(subject, chapter);
  const resources = getChapterResources(subject, chapter);
  const formulaSections = getChapterFormulas(subject, chapter);
  const topics = getChapterTopics(chapter);
  const prerequisites = getChapterPrerequisites(chapter);

  return (
    <div className="space-y-5 slide-in">
      {/* Header */}
      <div className="glass p-5 rounded-2xl">
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm mb-3 hover:opacity-80 transition-opacity"
          style={{ color: examColor }}>
          ← Back to chapters
        </button>
        <h2 className="text-xl font-bold">{chapter}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${examColor}22`, color: examColor }}>
            {subject}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {questions.length} questions · {resources.length} resources
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 flex-wrap">
        {([['prerequisites', '⚙️ Prerequisites'], ['topics', '📖 Topics'], ['mock', '📝 Mock Test'], ['resources', '📚 Resources'], ['formulas', '📐 Formulas']] as [Tab, string][]).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: tab === id ? `linear-gradient(135deg, ${examColor}33, ${examColor}11)` : 'var(--bg-card)',
              border: tab === id ? `1px solid ${examColor}` : '1px solid var(--border)',
              color: tab === id ? examColor : 'var(--text-muted)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'prerequisites' && <PrerequisitesView prerequisites={prerequisites} examColor={examColor} chapter={chapter} />}
      {tab === 'topics' && <TopicsView topics={topics} examColor={examColor} chapter={chapter} />}
      {tab === 'mock' && <MockTestView questions={questions} examColor={examColor} chapter={chapter} />}
      {tab === 'resources' && <ResourcesView resources={resources} examColor={examColor} />}
      {tab === 'formulas' && <FormulasView sections={formulaSections} examColor={examColor} />}
    </div>
  );
}

// ─── Mock Test ──────────────────────────────────────────────────────────────

function MockTestView({ questions, examColor, chapter }: { questions: MCQ[]; examColor: string; chapter: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const score = submitted
    ? questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0)
    : 0;

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      if (!confirm(`You've answered ${Object.keys(answers).length}/${questions.length} questions. Submit anyway?`)) return;
    }
    setSubmitted(true);
    setCurrentQ(0);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  };

  const q = questions[currentQ];
  const answered = Object.keys(answers).length;
  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;
  const pctColor = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-4">
      {/* Score card */}
      {submitted && (
        <div className="glass p-6 rounded-2xl text-center" style={{ borderLeft: `4px solid ${pctColor}` }}>
          <div className="text-4xl font-bold mb-1" style={{ color: pctColor }}>{score}/{questions.length}</div>
          <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {pct}% — {pct >= 70 ? '🎉 Great job!' : pct >= 50 ? '👍 Good, keep practicing!' : '💪 Needs more work'}
          </div>
          <button onClick={reset}
            className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: `${examColor}22`, color: examColor, border: `1px solid ${examColor}44` }}>
            🔄 Retake Test
          </button>
        </div>
      )}

      {/* Question nav pills */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => {
          let bg = 'var(--bg-card)';
          let bc = 'var(--border)';
          let clr = 'var(--text-muted)';
          if (submitted) {
            if (answers[i] === questions[i].correct) { bg = 'rgba(34,197,94,0.15)'; bc = '#22c55e'; clr = '#22c55e'; }
            else if (answers[i] !== undefined) { bg = 'rgba(239,68,68,0.15)'; bc = '#ef4444'; clr = '#ef4444'; }
          } else if (i === currentQ) {
            bg = `${examColor}22`; bc = examColor; clr = examColor;
          } else if (answers[i] !== undefined) {
            bg = `${examColor}11`; bc = `${examColor}44`; clr = examColor;
          }
          return (
            <button key={i} onClick={() => setCurrentQ(i)}
              className="w-9 h-9 rounded-lg text-xs font-bold transition-all"
              style={{ background: bg, border: `1px solid ${bc}`, color: clr }}>
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question card */}
      <div className="glass p-5 rounded-xl">
        <div className="text-xs mb-2" style={{ color: examColor }}>
          Question {currentQ + 1} of {questions.length}
        </div>
        <div className="text-base font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          {q.question}
        </div>
        <div className="space-y-2">
          {q.options.map((opt, oi) => {
            let style: React.CSSProperties = { background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' };
            if (submitted) {
              if (oi === q.correct) style = { background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e', color: '#22c55e' };
              else if (oi === answers[currentQ]) style = { background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444', color: '#ef4444' };
            } else if (answers[currentQ] === oi) {
              style = { background: `${examColor}15`, border: `1px solid ${examColor}`, color: examColor };
            }
            return (
              <button key={oi} onClick={() => selectAnswer(currentQ, oi)}
                className="w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3"
                style={style}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  {String.fromCharCode(65 + oi)}
                </span>
                {opt}
                {submitted && oi === q.correct && <span className="ml-auto">✓</span>}
                {submitted && oi === answers[currentQ] && oi !== q.correct && <span className="ml-auto">✗</span>}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--text-primary)' }}>
            <strong style={{ color: examColor }}>💡 Explanation:</strong> {q.explanation}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          ← Previous
        </button>

        {!submitted ? (
          currentQ < questions.length - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${examColor}, #22d3ee)`, color: 'white' }}>
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 transition-all"
              style={{ background: `linear-gradient(135deg, ${examColor}, #22d3ee)`, color: 'white' }}>
              ✅ Submit Test ({answered}/{questions.length})
            </button>
          )
        ) : (
          <button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))}
            disabled={currentQ === questions.length - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Resources ──────────────────────────────────────────────────────────────

function ResourcesView({ resources, examColor }: { resources: ReturnType<typeof getChapterResources>; examColor: string }) {
  const typeIcon: Record<string, string> = { YouTube: '🎬', Notes: '📖', Practice: '📝' };
  const typeColor: Record<string, string> = { YouTube: '#ef4444', Notes: '#6366f1', Practice: '#22c55e' };

  return (
    <div className="space-y-3">
      {resources.map((r, i) => (
        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: `${typeColor[r.type] || examColor}15` }}>
            {typeIcon[r.type] || r.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{r.title}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${typeColor[r.type] || examColor}15`, color: typeColor[r.type] || examColor }}>
                {r.type}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Free</span>
            </div>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full shrink-0"
            style={{ background: `${examColor}15`, color: examColor }}>
            Open →
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Prerequisites ──────────────────────────────────────────────────────────

function PrerequisitesView({ prerequisites, examColor, chapter }: { prerequisites: Prerequisite[]; examColor: string; chapter: string }) {
  const priorityConfig = {
    essential:   { label: 'Essential',    color: '#ef4444', icon: '🔴', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
    recommended: { label: 'Recommended',  color: '#f59e0b', icon: '🟡', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
    helpful:     { label: 'Helpful',      color: '#22c55e', icon: '🟢', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  };

  if (prerequisites.length === 0) {
    return (
      <div className="glass p-6 rounded-xl text-center">
        <div className="text-4xl mb-3">🚀</div>
        <h3 className="font-bold text-lg mb-1" style={{ color: examColor }}>No Prerequisites!</h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          You can start learning <strong>{chapter}</strong> right away. This is a foundational chapter.
        </p>
      </div>
    );
  }

  const essential = prerequisites.filter(p => p.priority === 'essential');
  const recommended = prerequisites.filter(p => p.priority === 'recommended');
  const helpful = prerequisites.filter(p => p.priority === 'helpful');

  return (
    <div className="space-y-4">
      <div className="glass p-5 rounded-xl">
        <h3 className="font-semibold mb-1 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: examColor }} />
          Before You Start — {chapter}
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          {prerequisites.length} prerequisite{prerequisites.length > 1 ? 's' : ''} · Complete these to build a strong foundation
        </p>

        {[essential, recommended, helpful].map((group, gi) => {
          if (group.length === 0) return null;
          const priority = group[0].priority;
          const cfg = priorityConfig[priority];
          return (
            <div key={gi} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs">{cfg.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                  {cfg.label}
                </span>
                <div className="flex-1 h-px" style={{ background: cfg.border }} />
              </div>
              <div className="space-y-2">
                {group.map((prereq, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        {prereq.chapter}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${examColor}15`, color: examColor }}>
                        {prereq.subject}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {prereq.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual learning path */}
      <div className="glass p-5 rounded-xl">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
          <span>📍</span> Suggested Learning Path
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {prerequisites.filter(p => p.priority === 'essential').map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                {p.chapter}
              </span>
              <span style={{ color: examColor }}>→</span>
            </div>
          ))}
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: `${examColor}20`, border: `1px solid ${examColor}`, color: examColor }}>
            {chapter} ✓
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Topics ─────────────────────────────────────────────────────────────────

function TopicsView({ topics, examColor, chapter }: { topics: string[]; examColor: string; chapter: string }) {
  return (
    <div className="space-y-4">
      <div className="glass p-5 rounded-xl">
        <h3 className="font-semibold mb-1 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full" style={{ background: examColor }} />
          Topics to Cover — {chapter}
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          {topics.length} topics · Master all of these for full marks
        </p>
        <div className="space-y-2">
          {topics.map((topic, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg transition-all hover:scale-[1.005]"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: `${examColor}18`, color: examColor, border: `1px solid ${examColor}33` }}>
                {i + 1}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Formulas ───────────────────────────────────────────────────────────────

function FormulasView({ sections, examColor }: { sections: FormulaSection[]; examColor: string }) {
  return (
    <div className="space-y-5">
      {sections.map((section, si) => (
        <div key={si} className="glass p-5 rounded-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full" style={{ background: examColor }} />
            {section.heading}
          </h3>
          <div className="space-y-2.5">
            {section.formulas.map((f, fi) => (
              <div key={fi} className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    {f.name}
                  </div>
                </div>
                <div className="text-base font-bold mt-1.5 font-mono tracking-wide" style={{ color: examColor }}>
                  {f.formula}
                </div>
                {f.description && (
                  <div className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                    {f.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="glass p-10 text-center rounded-2xl" style={{ border: '2px dashed var(--border)' }}>
          <div className="text-4xl mb-3">📐</div>
          <p style={{ color: 'var(--text-muted)' }}>Formulas for this chapter will be added soon.</p>
        </div>
      )}
    </div>
  );
}
