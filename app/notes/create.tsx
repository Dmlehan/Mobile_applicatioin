import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Surface, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotes } from '@/hooks/useNotes';
import RichEditor from '@/components/RichEditor';
import { APP_CONFIG } from '@/constants/config';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { addNote, loading, error } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(APP_CONFIG.defaultCategory);

  const handleSave = async () => {
    if (!title.trim()) return;
    try {
      await addNote(title, content, category);
      router.back();
    } catch {
      // Error handled by hook state
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Surface style={styles.formCard} elevation={1}>
          <Text variant="headlineSmall" style={styles.titleText}>
            New Note
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
              onPress={handleSave}
              style={[styles.button, styles.saveButton]}
              loading={loading}
              disabled={loading || !title.trim()}
            >
              Save Note
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
});
