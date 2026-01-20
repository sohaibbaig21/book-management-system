import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function SearchBar({ value, onChangeText, placeholder, onClear }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Text style={styles.iconText}>🔍</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Book title or author'}
        placeholderTextColor={Colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value !== '' && (
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  iconText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  clearButton: {
    padding: 4,
  },
  clearText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
});