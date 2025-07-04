// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useBooks } from '../hooks/useBooks';
import { PillButton } from '../../../components/PillButton';
import { CATEGORY_LABELS } from '../components/CategorySection';
import type { RootStackParamList } from '../../../App';
import type { Book } from '../types';

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
      {/* ────── Category Tier ────── */}
      <View style={styles.categoryContainer}>
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
      </View>

      {/* ────── Book Tier ────── */}
      {selectedCategory && (
        <View style={styles.booksContainer}>
          {selectedCategory.books.map(book => {
            const displayHeTitle =
              selectedCategory.name === 'Mishnah'
                ? book.heTitle.replace(/^משנה\s*/u, '')
                : book.heTitle;

            return (
              <PillButton
                key={`${selectedCategory.name}-${book.id}`}  // ← composite key
                text={displayHeTitle}
                onPress={() => handleBookPress(book)}
              />
            );
          })}
        </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categorySelected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
