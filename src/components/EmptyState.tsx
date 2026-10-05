import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme';

export default function EmptyState({ theme, onAdd }: { theme: Theme; onAdd: () => void }) {
  return (
    <View style={[styles.box, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Ionicons name="checkmark-done-circle-outline" size={44} color={theme.muted} />
      <Text style={[styles.t, { color: theme.text }]}>No tasks found</Text>
      <Text style={[styles.s, { color: theme.muted }]}>Try a different search or create a new task.</Text>
      <TouchableOpacity onPress={onAdd} style={[styles.btn, { backgroundColor: theme.primary }]}>
        <Text style={styles.btnText}>Add task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: 16, padding: 24, alignItems: 'center', gap: 6, marginTop: 8 },
  t: { fontSize: 16, fontWeight: '800', marginTop: 8 },
  s: { fontSize: 13, textAlign: 'center' },
  btn: { marginTop: 12, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10 },
  btnText: { color: '#fff', fontWeight: '800' },
});
