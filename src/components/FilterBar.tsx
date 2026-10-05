import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Filter, Category, CATEGORIES } from '../types';
import { Theme } from '../theme';

interface Props {
  theme: Theme;
  query: string;
  onQuery: (q: string) => void;
  filter: Filter;
  onFilter: (f: Filter) => void;
  category: Category | 'All';
  onCategory: (c: Category | 'All') => void;
  total: number;
}

const FILTERS: Array<{ key: Filter; label: string; icon: string }> = [
  { key: 'all', label: 'All', icon: 'list-outline' },
  { key: 'active', label: 'Active', icon: 'ellipse-outline' },
  { key: 'done', label: 'Done', icon: 'checkmark-circle-outline' },
];

export default function FilterBar({
  theme,
  query,
  onQuery,
  filter,
  onFilter,
  category,
  onCategory,
  total,
}: Props) {
  return (
    <View>
      <View style={[styles.search, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search-outline" size={18} color={theme.muted} />
        <TextInput
          value={query}
          onChangeText={onQuery}
          placeholder="Search tasks..."
          placeholderTextColor={theme.muted}
          style={[styles.searchInput, { color: theme.text }]}
        />
        {query ? (
          <TouchableOpacity onPress={() => onQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.muted} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.segment}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => onFilter(f.key)}
              style={[
                styles.segBtn,
                { backgroundColor: active ? theme.primary : theme.card, borderColor: theme.border },
              ]}
            >
              <Ionicons name={f.icon as any} size={15} color={active ? '#fff' : theme.muted} />
              <Text style={[styles.segText, { color: active ? '#fff' : theme.text }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cats}>
        {(['All', ...CATEGORIES] as Array<Category | 'All'>).map((c) => {
          const active = category === c;
          return (
            <TouchableOpacity
              key={c}
              onPress={() => onCategory(c)}
              style={[
                styles.catChip,
                { backgroundColor: active ? theme.text : theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.catText, { color: active ? theme.bg : theme.text }]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={[styles.count, { color: theme.muted }]}>
        {total} task{total === 1 ? '' : 's'} shown
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 15 },
  segment: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  segBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 9,
  },
  segText: { fontWeight: '800', fontSize: 13 },
  cats: { marginBottom: 6 },
  catChip: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8 },
  catText: { fontWeight: '700', fontSize: 12 },
  count: { fontSize: 12, marginTop: 2, marginBottom: 8 },
});
