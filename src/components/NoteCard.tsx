import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NoteCardProps {
  title: string;
  excerpt: string;
  category?: string;
  isFavorite?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function NoteCard({ title, excerpt, category, isFavorite, onPress, style }: NoteCardProps) {
  // Select color matching the category
  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'Work': return { bg: '#E3F2FD', text: '#1E88E5' };
      case 'Personal': return { bg: '#E8F5E9', text: '#43A047' };
      case 'Ideas': return { bg: '#FFFDE7', text: '#F57F17' };
      case 'Study': return { bg: '#F3E5F5', text: '#8E24AA' };
      default: return { bg: '#F5F5F5', text: '#616161' };
    }
  };

  const catStyles = getCategoryStyles(category || 'General');

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>
          {title || 'Untitled Note'}
        </Text>
        {isFavorite && (
          <MaterialCommunityIcons name="star" size={20} color="#FFC107" />
        )}
      </View>
      <Text style={styles.excerpt} numberOfLines={2}>
        {excerpt || 'No additional content'}
      </Text>
      <View style={styles.cardFooter}>
        {category && (
          <Text style={[styles.category, { backgroundColor: catStyles.bg, color: catStyles.text }]}>
            {category}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  excerpt: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
