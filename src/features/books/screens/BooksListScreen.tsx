// src/features/books/screens/BooksListScreen.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useBooks } from '../hooks/useBooks';
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection';
import { PillButton } from '../../../components/PillButton';
import { Row } from '../../../components/Layout/Row';
import type { RootStackParamList } from '../../../App';
import type { Book, Category } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BooksList'>;

export function BooksListScreen(): JSX.Element {
  const categories = useBooks();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const navigation = useNavigation<NavProp>();

  const handleCategoryPress = (name: string) => {
    setSelectedCategoryName(prev => (prev === name ? null : name));
  };

  const handleBookPress = (book: Book) => {
    navigation.navigate('Book', { book });
  };

  const selectedCategory = categories.find(c => c.name === selectedCategoryName);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Row reverse style={styles.categoryContainer}>
        {categories.map(cat => (
          <PillButton
            key={cat.name}
            text={CATEGORY_LABELS[cat.name] ?? cat.name}
            onPress={() => handleCategoryPress(cat.name)}
            style={
              selectedCategoryName === cat.name
                ? styles.categorySelected
                : undefined
            }
          />
        ))}
      </Row>

      {selectedCategory && (
        <CategorySection
          category={selectedCategory}
          onBookPress={handleBookPress}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categorySelected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
});
