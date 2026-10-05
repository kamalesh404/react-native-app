import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Task, Category, Priority, CATEGORIES, PRIORITIES } from '../types';
import { Theme } from '../theme';

interface Props {
  visible: boolean;
  theme: Theme;
  initial?: Task | null;
  onClose: () => void;
  onSave: (data: { title: string; notes: string; category: Category; priority: Priority; dueDate: string | null }) => void;
}

export default function AddTaskModal({ visible, theme, initial, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState<Category>('Personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (visible) {
      setTitle(initial?.title ?? '');
      setNotes(initial?.notes ?? '');
      setCategory(initial?.category ?? 'Personal');
      setPriority(initial?.priority ?? 'medium');
      setDueDate(initial?.dueDate ?? '');
    }
  }, [visible, initial]);

  const valid = title.trim().length > 0;
  const dueValid = dueDate === '' || /^\d{4}-\d{2}-\d{2}$/.test(dueDate);

  const handleSave = () => {
    if (!valid || !dueValid) return;
    onSave({
      title: title.trim(),
      notes: notes.trim(),
      category,
      priority,
      dueDate: dueDate === '' ? null : dueDate,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[styles.sheet, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <Text style={[styles.h, { color: theme.text }]}>
            {initial ? 'Edit task' : 'New task'}
          </Text>

          <Text style={[styles.label, { color: theme.muted }]}>Title *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Buy groceries"
            placeholderTextColor={theme.muted}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
          />

          <Text style={[styles.label, { color: theme.muted }]}>Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Details (optional)"
            placeholderTextColor={theme.muted}
            style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
          />

          <Text style={[styles.label, { color: theme.muted }]}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
            {CATEGORIES.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCategory(c)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: category === c ? theme.primary : theme.primarySoft,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={{ color: category === c ? '#fff' : theme.text, fontWeight: '700', fontSize: 12 }}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.label, { color: theme.muted }]}>Priority</Text>
          <View style={styles.row}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: priority === p ? theme.text : theme.input,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={{ color: priority === p ? theme.bg : theme.text, fontWeight: '700', fontSize: 12 }}>
                  {p.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: theme.muted }]}>Due date (YYYY-MM-DD, optional)</Text>
          <TextInput
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="2026-10-10"
            placeholderTextColor={theme.muted}
            style={[
              styles.input,
              {
                backgroundColor: theme.input,
                color: dueValid ? theme.text : theme.danger,
                borderColor: dueValid ? theme.border : theme.danger,
              },
            ]}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.btn, { backgroundColor: theme.input, borderColor: theme.border }]}
            >
              <Text style={[styles.btnText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!valid || !dueValid}
              style={[styles.btn, { backgroundColor: valid && dueValid ? theme.primary : theme.muted }]}
            >
              <Text style={[styles.btnText, { color: '#fff' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    padding: 18,
    maxHeight: '92%',
  },
  h: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  label: { fontSize: 12, fontWeight: '700', marginTop: 10, marginBottom: 6, textTransform: 'uppercase' },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  row: { flexDirection: 'row', marginBottom: 4 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btn: { flex: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1 },
  btnText: { fontWeight: '800', fontSize: 15 },
});
