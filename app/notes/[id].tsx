import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Surface, IconButton, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '@/hooks/useNotes';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { notes, editNote, removeNote, loading, error } = useNotes();

  const note = notes.find((n) => n.id === id);

  const handleToggleFavorite = async () => {
    if (!note) return;
    try {
      await editNote(note.id, { favorite: !note.favorite });
    } catch {
      // Handled by hook state
    }
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await removeNote(note.id);
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

  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    dateStyle: 'medium',
  });

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.card} elevation={1}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            {note.title}
          </Text>
          <IconButton
            icon={note.favorite ? 'star' : 'star-outline'}
            iconColor={note.favorite ? '#FFCC00' : '#8E8E93'}
            size={28}
            onPress={handleToggleFavorite}
            disabled={loading}
          />
        </View>

        <View style={styles.metaRow}>
          <Text variant="labelMedium" style={styles.categoryBadge}>
            {note.category}
          </Text>
          <Text variant="bodySmall" style={styles.date}>
            Updated: {formattedDate}
          </Text>
        </View>

        <Divider style={styles.divider} />

        {error && <Text style={styles.errorText}>{error}</Text>}

        {loading ? (
          <ActivityIndicator size="small" color="#007AFF" style={styles.loadingSpinner} />
        ) : (
          <Text variant="bodyLarge" style={styles.content}>
            {note.content}
          </Text>
        )}

        <Divider style={styles.divider} />

        <View style={styles.buttonRow}>
          <Button
            mode="outlined"
            icon="delete"
            textColor="#FF3B30"
            onPress={handleDelete}
            style={[styles.button, styles.deleteButton]}
            disabled={loading}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            icon="pencil"
            onPress={() => router.push(`/notes/edit?id=${note.id}`)}
            style={[styles.button, styles.editButton]}
            disabled={loading}
          >
            Edit Note
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    color: '#333333',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  categoryBadge: {
    color: '#007AFF',
    backgroundColor: '#E6F0FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  date: {
    color: '#8E8E93',
  },
  divider: {
    marginVertical: 16,
  },
  content: {
    lineHeight: 24,
    color: '#333333',
    minHeight: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    borderColor: '#FF3B30',
  },
  editButton: {
    backgroundColor: '#007AFF',
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
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingSpinner: {
    marginVertical: 20,
  },
});
