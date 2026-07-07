import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface NoteCardProps {
  title: string;
  excerpt: string;
  category?: string;
  isFavorite?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function NoteCard({ title, excerpt, category, isFavorite, onPress, style }: NoteCardProps) {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.title} numberOfLines={1}>
        {title || 'Untitled Note'}
      </Text>
      <Text style={styles.excerpt} numberOfLines={2}>
        {excerpt || 'No additional content'}
      </Text>
      {category && <Text style={styles.category}>{category}</Text>}
      {isFavorite && <Text style={styles.favoriteBadge}>★ Favorite</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F0FF',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  favoriteBadge: {
    fontSize: 12,
    color: '#FFCC00',
    fontWeight: 'bold',
    marginTop: 6,
  },
});
