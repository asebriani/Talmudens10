import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookItem } from './BookItem';
import type { Category, Book } from '../types';

// Hebrew labels for each category
const CATEGORY_LABELS: Record<string, string> = {
  Torah: 'חומש',
  Prophets: 'נביאים',
  Writings: 'כתובים',
  Mishnah: 'משנה',
  Bavli: 'תלמוד בבלי',
};

interface Props {
  category: Category;
  onBookPress: (book: Book) => void;
}

export const CategorySection: React.FC<Props> = ({
  category,
  onBookPress,
}) => {
  const isMishnah = category.name === 'Mishnah';

  return (
    <View style={styles.categorySection}>
      <Text style={styles.categoryTitle}>
        {CATEGORY_LABELS[category.name] ?? category.name}
      </Text>
      {category.books.map(book => (
        <BookItem
          key={`${category.name}-${book.id ?? book.title}`}
          book={book}
          onPress={() => onBookPress(book)}
          isMishnah={isMishnah}
        />
      ))}
    </View>
  );
};

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
});
