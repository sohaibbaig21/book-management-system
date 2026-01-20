import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Colors from '../constants/Colors';

export default function BookDetail({ book }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Text key={i} style={styles.star}>★</Text>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Text key={i} style={styles.star}>★</Text>);
      } else {
        stars.push(<Text key={i} style={styles.starEmpty}>★</Text>);
      }
    }
    return stars;
  };

  const handlePreview = () => {
    if (book.previewLink) {
      Linking.openURL(book.previewLink);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ 
            uri: book.largImageUrl || book.imageUrl || 'https://via.placeholder.com/200x300?text=No+Cover' 
          }}
          style={styles.coverLarge}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.authors.join(', ')}</Text>
        <Text style={styles.publishInfo}>
          Published in {book.publishedDate.split('-')[0]}
        </Text>

        <View style={styles.ratingSection}>
          <View style={styles.stars}>
            {renderStars(book.averageRating)}
          </View>
          <Text style={styles.ratingText}>
            {book.averageRating.toFixed(1)} ({book.ratingsCount} reviews)
          </Text>
        </View>

        {book.previewLink && (
          <TouchableOpacity style={styles.readButton} onPress={handlePreview}>
            <Text style={styles.readButtonText}>✓ Book Read</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About the author</Text>
        <Text style={styles.aboutText}>
          {book.authors[0]} is the author of {book.title}.{' '}
          {book.publisher && `Published by ${book.publisher}.`}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>{book.description}</Text>
        
        {book.pageCount > 0 && (
          <Text style={styles.metaText}>Pages: {book.pageCount}</Text>
        )}
        {book.categories.length > 0 && (
          <Text style={styles.metaText}>
            Categories: {book.categories.join(', ')}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  coverLarge: {
    width: 200,
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: Colors.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  publishInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    color: Colors.star,
    fontSize: 24,
    marginHorizontal: 2,
  },
  starEmpty: {
    color: Colors.border,
    fontSize: 24,
    marginHorizontal: 2,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  readButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  readButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  overviewText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  metaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
});