// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useBooks } from '../hooks/useBooks';
import { useParshiyot } from '../hooks/useParshiyot';
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection';
import { SectionPicker } from '../components/SectionPicker';
import { DafAmudPicker } from '../components/DafAmudPicker';
import { ParshaPicker } from '../components/ParshaPicker';
import { PillButton } from '../../../components/PillButton';
import { Row } from '../../../components/Layout/Row';
import { SederPicker } from '../components/SederPicker';
import { mishnahSedarim, bavliSedarim } from '../data/sedarim';

import type { NewNoteParamList } from '../../../navigation/NewNoteStack';
import type { Book } from '../types';
import type { Parsha } from '../data/parshiyot';

type Props = NativeStackScreenProps<NewNoteParamList, 'BookSelection'>;

export function BooksListScreen({ navigation }: Props): JSX.Element {
  const categories = useBooks();
  const parshiyotByBook = useParshiyot();

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedSeder, setSelectedSeder]               = useState<string | null>(null);
  const [selectedBook, setSelectedBook]                 = useState<Book | null>(null);
  const [selectedParsha, setSelectedParsha]             = useState<Parsha | null>(null);
  const [selectedSection, setSelectedSection]           = useState<number | null>(null);

  const handleCategoryPress = (name: string) => {
    setSelectedCategoryName(prev => (prev === name ? null : name));
    setSelectedSeder(null);
    setSelectedBook(null);
    setSelectedParsha(null);
    setSelectedSection(null);
  };

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setSelectedSection(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Category buttons */}
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

      {/* Always show SederPicker when Mishnah or Bavli is selected */}
      {(selectedCategoryName === 'Mishnah' || selectedCategoryName === 'Bavli') && (
        <SederPicker
          sedarim={
            selectedCategoryName === 'Mishnah'
              ? (Object.keys(mishnahSedarim) as string[])
              : (Object.keys(bavliSedarim) as string[])
          }
          selected={selectedSeder ?? undefined}
          onSelect={setSelectedSeder}
        />
      )}

      {/* Once a seder is picked, show its tractates */}
      {selectedCategoryName === 'Mishnah' && selectedSeder && (
        <CategorySection
          category={{
            name: 'Mishnah',
            books: categories
              .find(c => c.name === 'Mishnah')!
              .books.filter(b => mishnahSedarim[selectedSeder].includes(b.id)),
          }}
          onBookPress={handleBookPress}
        />
      )}
      {selectedCategoryName === 'Bavli' && selectedSeder && (
        <CategorySection
          category={{
            name: 'Bavli',
            books: categories
              .find(c => c.name === 'Bavli')!
              .books.filter(b => bavliSedarim[selectedSeder].includes(b.id)),
          }}
          onBookPress={handleBookPress}
        />
      )}

      {/* Parsha picker for Torah */}
      {selectedCategoryName === 'Torah' && selectedBook && (
        <ParshaPicker
          parshiyot={parshiyotByBook[selectedBook.id] ?? []}
          selectedName={selectedParsha?.name ?? null}
          onSelect={p => {
            setSelectedParsha(p);
            setSelectedSection(null);
          }}
        />
      )}

      {/* Chapter picker for Torah parsha */}
      {selectedCategoryName === 'Torah' && selectedBook && selectedParsha && (
        <SectionPicker
          sections={Array.from(
            { length: selectedParsha.end.chapter - selectedParsha.start.chapter + 1 },
            (_, i) => selectedParsha.start.chapter + i
          )}
          selected={selectedSection}
          onSelect={chapter => {
            setSelectedSection(chapter);
            navigation.navigate('BookView', { book: selectedBook, section: chapter });
          }}
          label="פרק"
        />
      )}

      {/* Default chapter picker for Mishnah */}
      {selectedBook && selectedCategoryName === 'Mishnah' && (
        <SectionPicker
          sections={Array.from(
            { length: selectedBook.text.length },
            (_, i) => i + 1
          )}
          selected={selectedSection}
          onSelect={section => {
            setSelectedSection(section);
            navigation.navigate('BookView', { book: selectedBook, section });
          }}
          label="פרק"
        />
      )}

      {/* Daf–Amud picker for Bavli */}
      {selectedBook && selectedCategoryName === 'Bavli' && (
        <DafAmudPicker
          dafs={Array.from(
            { length: selectedBook.text.length },
            (_, i) => i + 1
          )}
          selectedDaf={selectedSection}
          onSelect={(daf, amud) => {
            setSelectedSection(daf);
            navigation.navigate('BookView', { book: selectedBook, section: daf });
          }}
        />
      )}

      {/* Chapters for Prophets & Writings */}
      {selectedBook &&
        selectedCategoryName &&
        !['Torah', 'Mishnah', 'Bavli'].includes(selectedCategoryName) && (
          <SectionPicker
            sections={Array.from(
              { length: selectedBook.text.length },
              (_, i) => i + 1
            )}
            selected={selectedSection}
            onSelect={section => {
              navigation.navigate('BookView', { book: selectedBook, section });
            }}
            label="פרק"
          />
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
