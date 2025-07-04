// src/features/books/components/BooksList.tsx

import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useBooks } from '../hooks/useBooks';
import { BookItem } from './BookItem';

// Hebrew labels for each category key
const CATEGORY_LABELS: Record<string, string> = {
  Torah: 'חומש',
  Prophets: 'נביאים',
  Writings: 'כתובים',
  Mishnah: 'משנה',
  Bavli: 'תלמוד בבלי',
};

export const BooksList: React.FC = () => {
  const categories = useBooks();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(cat => (
        <View key={cat.name} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>
            {CATEGORY_LABELS[cat.name] ?? cat.name}
          </Text>
          {cat.books.map(book => (
            <BookItem
              // fall back to title when id is undefined
              key={`${cat.name}-${book.id ?? book.title}`}
              book={book}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },

  categorySection: {
    marginBottom: 24,
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
});
