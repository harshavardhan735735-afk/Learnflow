/**
 * Typed API client for communicating with the FastAPI backend.
 */
import type {
  Domain,
  Subject,
  MockTest,
  Question,
  SubmitAttemptRequest,
  AttemptResult,
  Analytics,
  RevisionPlan,
  ResourcesResponse,
  ChatRequest,
  ChatResponse,
  LoginRequest,
  SignupRequest,
  AuthResponse,
  User,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// ─── Domains ─────────────────────────────────────────────
export const getDomains  = () => fetchAPI<Domain[]>('/domains');
export const getDomain   = (id: number) => fetchAPI<Domain>(`/domains/${id}`);

// ─── Subjects ────────────────────────────────────────────
export const getSubjects = (domainId: number) =>
  fetchAPI<Subject[]>(`/subjects/${domainId}`);

// ─── Tests ────────────────────────────────────────────────
export const getTests = (subjectId: number) =>
  fetchAPI<MockTest[]>(`/tests/${subjectId}`);

// ─── Questions ───────────────────────────────────────────
export const getQuestions = (testId: number) =>
  fetchAPI<Question[]>(`/questions/${testId}`);

// ─── Attempts ────────────────────────────────────────────
export const submitAttempt = (payload: SubmitAttemptRequest) =>
  fetchAPI<AttemptResult>('/submit_attempt', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// ─── Analytics ───────────────────────────────────────────
export const getAnalytics = (studentId: string) =>
  fetchAPI<Analytics>(`/analytics/${studentId}`);

// ─── Planner ─────────────────────────────────────────────
export const generatePlan = (studentId: string) =>
  fetchAPI<RevisionPlan>(`/generate_plan/${studentId}`, { method: 'POST' });

// ─── Resources ───────────────────────────────────────────
export const getResources = (topic: string, topK = 5) =>
  fetchAPI<ResourcesResponse>(`/resources/${encodeURIComponent(topic)}?top_k=${topK}`);

// ─── Chat ────────────────────────────────────────────────
export const sendChat = (payload: ChatRequest) =>
  fetchAPI<ChatResponse>('/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// ─── Auth ────────────────────────────────────────────────
export const loginUser = (payload: LoginRequest) =>
  fetchAPI<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const signupUser = (payload: SignupRequest) =>
  fetchAPI<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getUserProfile = (studentId: number) =>
  fetchAPI<User>(`/auth/me/${studentId}`);

// Re-export types for convenience
export type {
  Domain, Subject, MockTest, Question,
  SubmitAttemptRequest, AttemptResult, Analytics,
  RevisionPlan, ResourcesResponse, ChatRequest, ChatResponse,
  TopicPerformance, DayPlan, StudySession, ResourceItem, ChatMessage,
  User, LoginRequest, SignupRequest, AuthResponse, ExamType,
} from './types';
