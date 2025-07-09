// src/features/books/components/CategorySection.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Row } from '../../../components/Layout/Row';
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
  onBookPress?: (book: Book) => void;
  /** the currently selected book ID, for highlighting */
  selectedBookId?: string;
}

export function CategorySection({
  category,
  onBookPress = () => {},
  selectedBookId,
}: Props): JSX.Element {
  const isMishnah = category.name === 'Mishnah';

  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>
        {CATEGORY_LABELS[category.name] ?? category.name}
      </Text>
      <Row reverse style={styles.booksContainer}>
        {category.books.map(book => (
          <BookItem
            key={`${category.name}-${book.id}`}
            book={book}
            onPress={() => onBookPress(book)}
            isMishnah={isMishnah}
            style={
              book.id === selectedBookId
                ? styles.selectedBook
                : undefined
            }
          />
        ))}
      </Row>
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
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectedBook: {
    backgroundColor: '#ddd',
    borderColor:   '#555',
  },
});
