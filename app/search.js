import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Added for the back arrow

import Colors from '../constants/Colors';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import ErrorMessage from '../components/ErrorMessage';
import { useDebounce } from '../hooks/useDebounce';
import { searchBooks } from '../services/bookService';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('general'); // 'general', 'title', 'author'
  const [showModal, setShowModal] = useState(false);
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

  const performSearch = async (query, type = searchType) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchBooks(query, type);
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Book</Text>
        <View style={styles.placeholder} />
      </View>

      {/* SEARCH TYPE SELECTOR */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.selectorText}>
            {searchType === 'general' ? 'Search by: All' :
             searchType === 'title' ? 'Search by: Title' :
             'Search by: Author'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* SEARCH TYPE MODAL */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search by:</Text>

            <TouchableOpacity
              style={[styles.modalOption, searchType === 'general' && styles.modalOptionActive]}
              onPress={() => {
                setSearchType('general');
                setShowModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, searchType === 'general' && styles.modalOptionTextActive]}>
                All (Title or Author)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, searchType === 'title' && styles.modalOptionActive]}
              onPress={() => {
                setSearchType('title');
                setShowModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, searchType === 'title' && styles.modalOptionTextActive]}>
                Title
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, searchType === 'author' && styles.modalOptionActive]}
              onPress={() => {
                setSearchType('author');
                setShowModal(false);
              }}
            >
              <Text style={[styles.modalOptionText, searchType === 'author' && styles.modalOptionTextActive]}>
                Author
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* SEARCH INPUT SECTION */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={
          searchType === 'title' ? 'Search by book title' :
          searchType === 'author' ? 'Search by author name' :
          'Book title or author'
        }
        onClear={handleClear}
      />

      {/* CONTENT SECTION */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}

      {error && !loading && (
        <ErrorMessage message={error} onRetry={() => performSearch(searchQuery)} />
      )}

      {!loading && !error && books.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>
            {searchType === 'title' ? 'Search for books by title' :
             searchType === 'author' ? 'Search for books by author' :
             'Search for books by title or author'}
          </Text>
        </View>
      )}

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
    paddingTop: 10,
    paddingBottom: 5,
    // Removed border here to match the clean design in your image
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    flex: 1, // Added flex to help center the title
  },
  placeholder: {
    width: 40, // Balanced with the backButton width
  },
  selectorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.lightGray,
  },
  selectorText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    margin: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: Colors.lightGray,
  },
  modalOptionActive: {
    backgroundColor: Colors.primary,
  },
  modalOptionText: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  modalOptionTextActive: {
    color: 'white',
    fontWeight: '600',
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
    opacity: 0.3,
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