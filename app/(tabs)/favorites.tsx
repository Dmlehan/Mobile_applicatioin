import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotes } from '@/hooks/useNotes';
import NoteCard from '@/components/NoteCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const { notes, loading } = useNotes();

  // Filter notes that are marked as favorite
  const favoriteNotes = notes.filter((note) => note.favorite);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favoriteNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="star-outline" size={70} color="#D1D1D6" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No Favorite Notes</Text>
          <Text style={styles.emptySubtitle}>
            Tap the star icon on any note in the dashboard to list it here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              title={item.title}
              excerpt={item.content.replace(/<[^>]*>/g, '')}
              category={item.category}
              isFavorite={item.favorite}
              onPress={() => router.push(`/notes/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
});
