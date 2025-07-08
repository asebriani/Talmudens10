// src/features/books/screens/BooksListScreen.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useBooks } from '../hooks/useBooks';
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection';
import { SectionPicker } from '../components/SectionPicker';
import { PillButton } from '../../../components/PillButton';
import { Row } from '../../../components/Layout/Row';

import type { NewNoteParamList } from '../../../navigation/NewNoteStack';
import type { Book, Category } from '../types';

type Props = NativeStackScreenProps<NewNoteParamList, 'BookSelection'>;

export function BooksListScreen({ navigation }: Props): JSX.Element {
  const categories = useBooks();

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleCategoryPress = (name: string) => {
    setSelectedCategoryName(prev => (prev === name ? null : name));
    setSelectedBook(null);
    setSelectedSection(null);
  };

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setSelectedSection(null);
  };

  const selectedCategory = categories.find(c => c.name === selectedCategoryName);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Category picker */}
      <Row reverse style={styles.categoryContainer}>
        {categories.map(cat => (
          <PillButton
            key={cat.name}
            text={CATEGORY_LABELS[cat.name] ?? cat.name}
            onPress={() => handleCategoryPress(cat.name)}
            style={selectedCategoryName === cat.name ? styles.categorySelected : undefined}
          />
        ))}
      </Row>

      {/* Book picker */}
      {selectedCategory && (
        <CategorySection
          category={selectedCategory}
          onBookPress={handleBookPress}
        />
      )}

      {/* Section picker */}
      {selectedBook && (
        <SectionPicker
          sections={Array.from(
            { length: selectedBook.text.length },
            (_, i) => i + 1
          )}
          selected={selectedSection}
          onSelect={section => {
            setSelectedSection(section);
            navigation.navigate('BookView', {
              book: selectedBook,
              section,
            });
          }}
          label={selectedCategoryName === 'Bavli' ? 'Daf' : 'Chapter'}
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
