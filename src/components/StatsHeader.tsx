import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme';

interface Props {
  theme: Theme;
  total: number;
  done: number;
  overdue: number;
  dueToday: number;
}

export default function StatsHeader({ theme, total, done, overdue, dueToday }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const cards = [
    { label: 'Total', value: total, icon: 'layers-outline', color: theme.primary },
    { label: 'Done', value: done, icon: 'checkmark-done-outline', color: theme.success },
    { label: 'Due today', value: dueToday, icon: 'today-outline', color: theme.warning },
    { label: 'Overdue', value: overdue, icon: 'alert-circle-outline', color: theme.danger },
  ];

  return (
    <View style={styles.wrap}>
      <View style={[styles.progressCard, { backgroundColor: theme.primary }]}>
        <View>
          <Text style={styles.progressPct}>{pct}%</Text>
          <Text style={styles.progressLabel}>completed</Text>
        </View>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.progressSub}>
          {done} of {total} tasks done
        </Text>
      </View>

      <View style={styles.grid}>
        {cards.map((c) => (
          <View key={c.label} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Ionicons name={c.icon as any} size={18} color={c.color} />
            <Text style={[styles.value, { color: theme.text }]}>{c.value}</Text>
            <Text style={[styles.label, { color: theme.muted }]}>{c.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  progressCard: { borderRadius: 16, padding: 16 },
  progressPct: { color: '#fff', fontSize: 28, fontWeight: '900' },
  progressLabel: { color: '#e0e7ff', fontSize: 13, fontWeight: '600' },
  barBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 8, marginVertical: 10, overflow: 'hidden' },
  barFill: { height: 8, backgroundColor: '#fff', borderRadius: 8 },
  progressSub: { color: '#e0e7ff', fontSize: 12, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  card: { flex: 1, minWidth: '22%', borderWidth: 1, borderRadius: 12, padding: 10, alignItems: 'center', gap: 2 },
  value: { fontSize: 18, fontWeight: '900' },
  label: { fontSize: 11, fontWeight: '600' },
});
