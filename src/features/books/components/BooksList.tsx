import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useBooks } from '../hooks/useBooks';
import { CategorySection } from './CategorySection';

export const BooksList: React.FC = () => {
  const categories = useBooks();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.map(category => (
        <CategorySection
          key={category.name}
          category={category}
          // no-op for non-navigable list
          onBookPress={() => {}}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
});
