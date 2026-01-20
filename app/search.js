import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import ErrorMessage from '../components/ErrorMessage';
import { useDebounce } from '../hooks/useDebounce';
import { searchBooks } from '../services/bookService';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearchQuery.trim().length > 0) {
      performSearch(debouncedSearchQuery);
    } else {
      setBooks([]);
      setError(null);
    }
  }, [debouncedSearchQuery]);

  const performSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchBooks(query);
      setBooks(results);
      
      if (results.length === 0) {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setBooks([]);
    setError(null);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Search Book</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderEmptyState = () => {
    if (searchQuery.trim().length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>Search for books by title or author</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Book title or author"
        onClear={handleClear}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={() => performSearch(searchQuery)} />
      )}

      {!loading && !error && books.length === 0 && renderEmptyState()}

      {!loading && !error && books.length > 0 && (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard book={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 28,
    color: Colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 36,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});