// src/features/books/components/CategorySection.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookItem } from './BookItem';
import type { Category, Book } from '../types';

/** Hebrew labels for each category */
export const CATEGORY_LABELS: Record<string, string> = {
  Torah:    'חומש',
  Prophets: 'נביאים',
  Writings: 'כתובים',
  Mishnah:  'משנה',
  Bavli:    'תלמוד בבלי',
};

interface Props {
  category: Category;
  /** now optional */
  onBookPress?: (book: Book) => void;
}

export function CategorySection({
  category,
  onBookPress = (_book: Book) => {},
}: Props): JSX.Element {
  const isMishnah = category.name === 'Mishnah';

  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>
        {CATEGORY_LABELS[category.name] ?? category.name}
      </Text>
      <View style={styles.booksContainer}>
        {category.books.map(book => (
          <BookItem
            key={`${category.name}-${book.id}`}
            book={book}
            onPress={() => onBookPress(book)}
            isMishnah={isMishnah}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',        // allow pills to flow to next line
    justifyContent: 'center' // center rows horizontally
  },
});