import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '@/hooks/useNotes';
import RichEditor from '@/components/RichEditor';
import { APP_CONFIG } from '@/constants/config';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, editNote, loading, error } = useNotes();

  const note = notes.find((n) => n.id === id);

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || APP_CONFIG.defaultCategory);

  const handleUpdate = async () => {
    if (!note || !title.trim()) return;
    try {
      await editNote(note.id, { title, content, category });
      router.back();
    } catch {
      // Handled by hook state
    }
  };

  if (!note) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="bodyLarge">Note not found</Text>
        <Button onPress={() => router.back()} style={styles.backBtn}>
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.formCard} elevation={1}>
          <Text variant="headlineSmall" style={styles.titleText}>
            Edit Note
          </Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            label="Note Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            disabled={loading}
          />

          <Text variant="bodyMedium" style={styles.label}>
            Category
          </Text>
          <View style={styles.categoriesRow}>
            {APP_CONFIG.supportedCategories.map((item) => (
              <Chip
                key={item}
                selected={category === item}
                onPress={() => setCategory(item)}
                style={styles.categoryChip}
                disabled={loading}
              >
                {item}
              </Chip>
            ))}
          </View>

          <Text variant="bodyMedium" style={styles.label}>
            Content
          </Text>
          <View style={styles.editorContainer}>
            <RichEditor initialContent={content} onChangeContent={setContent} />
          </View>

          <View style={styles.buttonRow}>
            <Button
              mode="outlined"
              onPress={() => router.back()}
              style={styles.button}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleUpdate}
              style={[styles.button, styles.saveButton]}
              loading={loading}
              disabled={loading || !title.trim()}
            >
              Save Changes
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  formCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
    marginBottom: 8,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#E5E5EA',
  },
  editorContainer: {
    height: 300,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  errorText: {
    color: '#FF3B30',
    backgroundColor: '#FFE5E5',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backBtn: {
    marginTop: 15,
  },
});
