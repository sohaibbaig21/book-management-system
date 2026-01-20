import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function BookCard({ book }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/book/${book.id}`);
  };

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

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Image
        source={{ 
          uri: book.imageUrl || 'https://via.placeholder.com/128x196?text=No+Cover' 
        }}
        style={styles.cover}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          by {book.authors.join(', ')}
        </Text>
        <Text style={styles.year}>Published in {book.publishedDate.split('-')[0]}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStars(book.averageRating)}
          </View>
          <Text style={styles.ratingText}>
            {book.averageRating.toFixed(1)} ({book.ratingsCount} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'column',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  star: {
    color: Colors.star,
    fontSize: 16,
    marginRight: 2,
  },
  starEmpty: {
    color: Colors.border,
    fontSize: 16,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});