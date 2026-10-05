import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Task, Filter, Tab, Category } from './src/types';
import { lightTheme, darkTheme, Theme } from './src/theme';
import {
  loadTasks,
  saveTasks,
  newTaskId,
  loadThemeMode,
  saveThemeMode,
  todayStr,
  isOverdue,
} from './src/storage';
import TaskItem from './src/components/TaskItem';
import AddTaskModal from './src/components/AddTaskModal';
import FilterBar from './src/components/FilterBar';
import StatsHeader from './src/components/StatsHeader';
import EmptyState from './src/components/EmptyState';

export default function App() {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('auto');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState<Tab>('tasks');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const dark = themeMode === 'dark' || (themeMode === 'auto' && systemScheme === 'dark');
  const theme: Theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    (async () => {
      const [t, m] = await Promise.all([loadTasks(), loadThemeMode()]);
      setTasks(t);
      setThemeMode(m);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const overdue = tasks.filter(isOverdue).length;
    const dueToday = tasks.filter((t) => !t.done && t.dueDate === todayStr()).length;
    return { total, done, overdue, dueToday };
  }, [tasks]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === 'active' && t.done) return false;
      if (filter === 'done' && !t.done) return false;
      if (category !== 'All' && t.category !== category) return false;
      if (q) {
        const hay = `${t.title} ${t.notes} ${t.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, query, filter, category]);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete task?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const handleSave = (data: {
    title: string;
    notes: string;
    category: Category;
    priority: Task['priority'];
    dueDate: string | null;
  }) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
    } else {
      const now = new Date().toISOString();
      setTasks((prev) => [{ id: newTaskId(), createdAt: now, done: false, ...data }, ...prev]);
    }
    setEditing(null);
  };

  const clearDone = () => {
    if (!tasks.some((t) => t.done)) return;
    Alert.alert('Clear completed?', 'Remove all done tasks.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => setTasks((prev) => prev.filter((t) => !t.done)),
      },
    ]);
  };

  const cycleTheme = async () => {
    const next = themeMode === 'auto' ? 'light' : themeMode === 'light' ? 'dark' : 'auto';
    setThemeMode(next);
    await saveThemeMode(next);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <View style={[styles.header, { borderColor: theme.border }]}>
        <View>
          <Text style={[styles.logo, { color: theme.text }]}>TaskMaster</Text>
          <Text style={[styles.sub, { color: theme.muted }]}>Stay organized daily</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={cycleTheme}
            style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Ionicons
              name={themeMode === 'dark' ? 'moon' : themeMode === 'light' ? 'sunny' : 'contrast'}
              size={18}
              color={theme.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openAdd}
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {tab === 'tasks' && (
        <View style={styles.body}>
          <FilterBar
            theme={theme}
            query={query}
            onQuery={setQuery}
            filter={filter}
            onFilter={setFilter}
            category={category}
            onCategory={setCategory}
            total={visible.length}
          />
          <FlatList
            data={visible}
            keyExtractor={(t) => t.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListEmptyComponent={<EmptyState theme={theme} onAdd={openAdd} />}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                theme={theme}
                overdue={isOverdue(item)}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={openEdit}
              />
            )}
          />
          {tasks.some((t) => t.done) && (
            <TouchableOpacity onPress={clearDone} style={styles.clearBtn}>
              <Text style={[styles.clearText, { color: theme.danger }]}>Clear completed</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {tab === 'stats' && (
        <View style={styles.body}>
          <StatsHeader
            theme={theme}
            total={stats.total}
            done={stats.done}
            overdue={stats.overdue}
            dueToday={stats.dueToday}
          />
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Tips</Text>
            <Text style={[styles.tip, { color: theme.muted }]}>
              • Use priority HIGH for urgent work.{'\n'}• Keep due dates realistic.{'\n'}•
              Clear done tasks weekly.
            </Text>
          </View>
        </View>
      )}

      {tab === 'settings' && (
        <View style={styles.body}>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Appearance</Text>
            <Text style={[styles.tip, { color: theme.muted }]}>Current: {themeMode}</Text>
            <TouchableOpacity
              onPress={cycleTheme}
              style={[styles.rowBtn, { backgroundColor: theme.primarySoft }]}
            >
              <Text style={[styles.rowBtnText, { color: theme.primary }]}>
                Switch theme (Auto → Light → Dark)
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Data</Text>
            <Text style={[styles.tip, { color: theme.muted }]}>
              Tasks are stored offline on your device with AsyncStorage.
            </Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Reset?', 'Delete all tasks and restore samples.', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                      const { seedTasks } = await import('./src/storage');
                      setTasks(seedTasks());
                    },
                  },
                ])
              }
              style={[styles.rowBtn, { backgroundColor: '#ef444422' }]}
            >
              <Text style={[styles.rowBtnText, { color: theme.danger }]}>Reset demo data</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>About</Text>
            <Text style={[styles.tip, { color: theme.muted }]}>
              TaskMaster v1.0.0{'\n'}Built with Expo + React Native + TypeScript.
            </Text>
          </View>
        </View>
      )}

      <View style={[styles.tabs, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {(
          [
            { key: 'tasks', label: 'Tasks', icon: 'list' },
            { key: 'stats', label: 'Stats', icon: 'bar-chart' },
            { key: 'settings', label: 'Settings', icon: 'settings' },
          ] as Array<{ key: Tab; label: string; icon: string }>
        ).map((t) => {
          const active = tab === t.key;
          return (
            <TouchableOpacity key={t.key} onPress={() => setTab(t.key)} style={styles.tabBtn}>
              <Ionicons
                name={(active ? t.icon : `${t.icon}-outline`) as any}
                size={22}
                color={active ? theme.primary : theme.muted}
              />
              <Text style={[styles.tabText, { color: active ? theme.primary : theme.muted }]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <AddTaskModal
        visible={modalOpen}
        theme={theme}
        initial={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingTop: RNStatusBar.currentHeight ?? 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  logo: { fontSize: 22, fontWeight: '900' },
  sub: { fontSize: 12, fontWeight: '600' },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  addBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, paddingHorizontal: 14, paddingTop: 12 },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 10 },
  cardTitle: { fontSize: 15, fontWeight: '800', marginBottom: 6 },
  tip: { fontSize: 13, lineHeight: 20 },
  rowBtn: { marginTop: 10, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  rowBtnText: { fontWeight: '800', fontSize: 13 },
  clearBtn: { position: 'absolute', bottom: 84, alignSelf: 'center' },
  clearText: { fontWeight: '800', fontSize: 13 },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabBtn: { flex: 1, alignItems: 'center', gap: 2 },
  tabText: { fontSize: 11, fontWeight: '700' },
});
