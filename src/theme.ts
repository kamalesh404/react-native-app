export interface Theme {
  bg: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primarySoft: string;
  success: string;
  warning: string;
  danger: string;
  input: string;
}

export const lightTheme: Theme = {
  bg: '#f1f5f9',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  primary: '#6366f1',
  primarySoft: '#eef2ff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  input: '#f8fafc',
};

export const darkTheme: Theme = {
  bg: '#020617',
  card: '#0f172a',
  text: '#f1f5f9',
  muted: '#94a3b8',
  border: '#1e293b',
  primary: '#818cf8',
  primarySoft: '#1e1b4b',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  input: '#1e293b',
};

export const CATEGORY_COLORS: Record<string, string> = {
  Personal: '#8b5cf6',
  Work: '#3b82f6',
  Shopping: '#f59e0b',
  Health: '#10b981',
  Study: '#ec4899',
  Other: '#64748b',
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};
