import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';
import { Theme, CATEGORY_COLORS, PRIORITY_COLORS } from '../theme';

interface Props {
  task: Task;
  theme: Theme;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  overdue: boolean;
}

export default function TaskItem({ task, theme, onToggle, onDelete, onEdit, overdue }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[
          styles.check,
          {
            borderColor: task.done ? theme.success : theme.muted,
            backgroundColor: task.done ? theme.success : 'transparent',
          },
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.done }}
      >
        {task.done ? <Ionicons name="checkmark" size={16} color="#fff" /> : null}
      </TouchableOpacity>

      <TouchableOpacity style={styles.body} onPress={() => onEdit(task)} activeOpacity={0.7}>
        <Text
          style={[
            styles.title,
            { color: theme.text, textDecorationLine: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 },
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>
        {task.notes ? (
          <Text style={[styles.notes, { color: theme.muted }]} numberOfLines={1}>
            {task.notes}
          </Text>
        ) : null}
        <View style={styles.meta}>
          <View style={[styles.badge, { backgroundColor: `${CATEGORY_COLORS[task.category]}22` }]}>
            <View style={[styles.dot, { backgroundColor: CATEGORY_COLORS[task.category] }]} />
            <Text style={[styles.badgeText, { color: CATEGORY_COLORS[task.category] }]}>{task.category}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: `${PRIORITY_COLORS[task.priority]}22` }]}>
            <Text style={[styles.badgeText, { color: PRIORITY_COLORS[task.priority] }]}>
              {task.priority.toUpperCase()}
            </Text>
          </View>
          {task.dueDate ? (
            <View style={[styles.badge, { backgroundColor: overdue ? '#ef444422' : theme.primarySoft }]}>
              <Ionicons
                name="calendar-outline"
                size={12}
                color={overdue ? '#ef4444' : theme.muted}
              />
              <Text style={[styles.badgeText, { color: overdue ? '#ef4444' : theme.muted }]}>
                {task.dueDate}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.delete} hitSlop={10}>
        <Ionicons name="trash-outline" size={18} color={theme.muted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 10,
  },
  body: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  notes: { fontSize: 13, marginTop: 2 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  dot: { width: 7, height: 7, borderRadius: 4 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  delete: { padding: 4, marginLeft: 6 },
});
