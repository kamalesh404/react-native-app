import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Category, Priority } from './types';

const TASKS_KEY = '@taskmaster:tasks:v1';
const THEME_KEY = '@taskmaster:theme:v1';

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function newTaskId(): string {
  return uid();
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await AsyncStorage.getItem(TASKS_KEY);
    if (!raw) return seedTasks();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedTasks();
    return parsed as Task[];
  } catch {
    return seedTasks();
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // ignore write errors (low storage etc.)
  }
}

export async function loadThemeMode(): Promise<'light' | 'dark' | 'auto'> {
  try {
    const v = await AsyncStorage.getItem(THEME_KEY);
    if (v === 'light' || v === 'dark' || v === 'auto') return v;
    return 'auto';
  } catch {
    return 'auto';
  }
}

export async function saveThemeMode(mode: 'light' | 'dark' | 'auto'): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, mode);
  } catch {
    // ignore
  }
}

export function seedTasks(): Task[] {
  const now = new Date().toISOString();
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const samples: Array<Omit<Task, 'id' | 'createdAt'>> = [
    {
      title: 'Welcome to TaskMaster',
      notes: 'Tap the + button to add your first real task.',
      done: false,
      priority: 'medium' as Priority,
      category: 'Personal' as Category,
      dueDate: fmt(today),
    },
    {
      title: 'Try dark mode',
      notes: 'Go to Settings tab and switch theme.',
      done: false,
      priority: 'low' as Priority,
      category: 'Personal' as Category,
      dueDate: null,
    },
    {
      title: 'Finish project report',
      notes: 'Export PDF and send to team.',
      done: false,
      priority: 'high' as Priority,
      category: 'Work' as Category,
      dueDate: fmt(tomorrow),
    },
  ];

  return samples.map((s) => ({
    ...s,
    id: uid(),
    createdAt: now,
  }));
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.done) return false;
  return task.dueDate < todayStr();
}
