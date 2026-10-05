export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Personal' | 'Work' | 'Shopping' | 'Health' | 'Study' | 'Other';

export interface Task {
  id: string;
  title: string;
  notes: string;
  done: boolean;
  priority: Priority;
  category: Category;
  dueDate: string | null; // ISO date YYYY-MM-DD
  createdAt: string; // ISO timestamp
}

export type Filter = 'all' | 'active' | 'done';
export type Tab = 'tasks' | 'stats' | 'settings';

export const CATEGORIES: Category[] = [
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Study',
  'Other',
];

export const PRIORITIES: Priority[] = ['low', 'medium', 'high'];
