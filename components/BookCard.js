import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function BookCard({ book }) {
  const router = useRouter();

  // Add safety checks
  if (!book) {
    console.warn('BookCard received undefined book');
    return null;
  }

  const handlePress = () => {
    router.push(`/book/${book.id}`);
  };

  // Ensure authors is always an array
  const authors = Array.isArray(book.authors) ? book.authors : ['Unknown Author'];

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: book.imageUrl || 'https://via.placeholder.com/128x196?text=No+Cover' }}
        style={styles.cover}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{book.title || 'Unknown Title'}</Text>
        <Text style={styles.author}>by {authors.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  cover: { width: 80, height: 120, borderRadius: 8 },
  infoContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: Colors.text },
  author: { fontSize: 14, color: Colors.textSecondary },
});
