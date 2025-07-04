import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategorySection } from './CategorySection';
import type { Category, Book } from '../types';

interface Props {
  categories: Category[];
  onBookPress: (book: Book) => void;
}

export const BooksListView: React.FC<Props> = ({
  categories,
  onBookPress,
}) => (
  <ScrollView contentContainerStyle={styles.container}>
    {categories.map(category => (
      <CategorySection
        key={category.name}
        category={category}
        onBookPress={onBookPress}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
});
