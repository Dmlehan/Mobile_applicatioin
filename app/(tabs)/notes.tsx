import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotes } from '@/hooks/useNotes';

interface CategoryItem {
  name: string;
  icon: string;
  color: string;
}

const CATEGORIES: CategoryItem[] = [
  { name: 'General', icon: 'folder', color: '#9E9E9E' },
  { name: 'Work', icon: 'briefcase', color: '#2196F3' },
  { name: 'Personal', icon: 'account', color: '#4CAF50' },
  { name: 'Ideas', icon: 'lightbulb', color: '#FFC107' },
  { name: 'Study', icon: 'book-open-variant', color: '#9C27B0' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const { notes } = useNotes();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Group notes by category
  const getNoteCount = (category: string) => {
    return notes.filter((n) => n.category === category).length;
  };

  const getNotesByCategory = (category: string) => {
    return notes.filter((n) => n.category === category);
  };

  const handleToggleExpand = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notes by Category</Text>
      <Text style={styles.subtitle}>Tap a category folder to browse its notes.</Text>

      <View style={styles.grid}>
        {CATEGORIES.map((item) => {
          const count = getNoteCount(item.name);
          const isExpanded = expandedCategory === item.name;
          const categoryNotes = getNotesByCategory(item.name);

          return (
            <Surface key={item.name} style={styles.card} elevation={1}>
              <TouchableOpacity
                onPress={() => handleToggleExpand(item.name)}
                style={styles.cardHeader}
                activeOpacity={0.7}
              >
                <View style={styles.leftSection}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} style={styles.folderIcon} />
                  <View>
                    <Text style={styles.categoryName}>{item.name}</Text>
                    <Text style={styles.noteCount}>{count} {count === 1 ? 'note' : 'notes'}</Text>
                  </View>
                </View>
                <IconButton
                  icon={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  onPress={() => handleToggleExpand(item.name)}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  {categoryNotes.length === 0 ? (
                    <Text style={styles.noNotesText}>No notes in this category.</Text>
                  ) : (
                    categoryNotes.map((note) => (
                      <TouchableOpacity
                        key={note.id}
                        onPress={() => router.push(`/notes/${note.id}`)}
                        style={styles.noteItem}
                      >
                        <MaterialCommunityIcons name="note-text-outline" size={18} color="#8E8E93" />
                        <Text style={styles.noteTitle} numberOfLines={1}>
                          {note.title}
                        </Text>
                        <MaterialCommunityIcons name="chevron-right" size={16} color="#C7C7CC" style={styles.arrow} />
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}
            </Surface>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  grid: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folderIcon: {
    marginRight: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  noteCount: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    backgroundColor: '#FAF9FB',
    paddingVertical: 8,
  },
  noNotesText: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  noteTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#333333',
  },
  arrow: {
    marginLeft: 8,
  },
});
