import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Text, FAB, Chip, Searchbar, Surface, ActivityIndicator, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNotes } from '@/hooks/useNotes';
import { useAuth } from '@/hooks/useAuth';
import NoteCard from '@/components/NoteCard';
import { APP_CONFIG } from '@/constants/config';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { notes, loading, fetchNotes } = useNotes();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotes();
    setRefreshing(false);
  };

  // Filter notes based on category & search query
  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Surface style={styles.header} elevation={1}>
        <View style={styles.headerTop}>
          <Text variant="headlineSmall" style={styles.greeting}>
            NoteSphere
          </Text>
          <Text variant="bodySmall" style={styles.email}>
            {user?.email}
          </Text>
        </View>

        <Searchbar
          placeholder="Search notes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          mode="bar"
        />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['All', ...APP_CONFIG.supportedCategories]}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.chipsContainer}
          renderItem={({ item }) => (
            <Chip
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
              style={styles.chip}
              selectedColor="#FFFFFF"
              showSelectedOverlay
            >
              {item}
            </Chip>
          )}
        />
      </Surface>

      {loading && !refreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <IconButton icon="note-text-outline" size={60} iconColor="#CCC" />
              <Text variant="bodyLarge" style={styles.emptyText}>
                No notes found
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtext}>
                Tap the + button to create your first note!
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <NoteCard
              title={item.title}
              excerpt={item.content.replace(/<[^>]*>/g, '')} // Strip HTML tags for preview
              category={item.category}
              isFavorite={item.favorite}
              onPress={() => router.push(`/notes/${item.id}`)}
            />
          )}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => router.push('/notes/create')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greeting: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  email: {
    color: '#666',
  },
  searchbar: {
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  chipsContainer: {
    paddingVertical: 4,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#E5E5EA',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  emptySubtext: {
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
  },
});
