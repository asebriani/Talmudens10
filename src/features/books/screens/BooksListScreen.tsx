// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useBooks } from '../hooks/useBooks';
import { useParshiyot } from '../hooks/useParshiyot';
import { GridChooser } from '../../../components/GridChooser';
import { BookItem } from '../components/BookItem';
import { PillButton } from '../../../components/PillButton';
import { Row } from '../../../components/Layout/Row';
import { intToHebrew } from '../../../utils/hebrew';
import type { NewNoteParamList } from '../../../navigation/NewNoteStack';
import type { Book } from '../types';
import type { Parsha } from '../data/parshiyot';
import { sederConfig } from '../data/sedarim';
import { CATEGORY_LABELS } from '../components/CategorySection';

type Props = NativeStackScreenProps<NewNoteParamList, 'BookSelection'>;

export function BooksListScreen({ navigation }: Props) {
  const categories = useBooks();
  const parshiyotByBook = useParshiyot();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeder, setSelectedSeder]       = useState<string | null>(null);
  const [selectedBook, setSelectedBook]         = useState<Book | null>(null);
  const [selectedParsha, setSelectedParsha]     = useState<Parsha | null>(null);
  const [selectedSection, setSelectedSection]   = useState<number | null>(null);

  const handleCategoryPress = (name: string) => {
    setSelectedCategory((prev) => (prev === name ? null : name));
    setSelectedSeder(null);
    setSelectedBook(null);
    setSelectedParsha(null);
    setSelectedSection(null);
  };
  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setSelectedParsha(null);
    setSelectedSection(null);
  };

  const isTextWithSedarim =
    selectedCategory === 'Mishnah' || selectedCategory === 'Bavli';
  const config =
    isTextWithSedarim
      ? sederConfig[selectedCategory as 'Mishnah' | 'Bavli']
      : undefined;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Category row */}
      <Row reverse style={styles.categoryContainer}>
        {categories.map((cat) => (
          <PillButton
            key={cat.name}
            text={CATEGORY_LABELS[cat.name] ?? cat.name}
            onPress={() => handleCategoryPress(cat.name)}
            style={
              selectedCategory === cat.name
                ? styles.categorySelected
                : undefined
            }
          />
        ))}
      </Row>

      {/* “סדר” chooser (only for Mishnah/Bavli) */}
      {config && (
        <GridChooser<string>
          reverse
          label="סדר"
          options={Object.keys(config.sedarim).map((s) => ({
            key: s,
            value: s,
            label: config.labels[s],
          }))}
          selected={selectedSeder}
          onSelect={(s) => {
            setSelectedSeder(s);
            setSelectedBook(null);
          }}
          mode="instant"
          numColumns={3}
        />
      )}

      {/* Tractate chooser (only after a seder is chosen) */}
      {config && selectedSeder && (
        <GridChooser<Book>
          reverse
          label={CATEGORY_LABELS[selectedCategory!] ?? selectedCategory!}
          options={categories
            .find((c) => c.name === selectedCategory!)!
            .books
            .filter((b) => config.sedarim[selectedSeder].includes(b.id))
            .map((b) => ({
              key: b.id,
              value: b,
              label:
                selectedCategory === 'Mishnah'
                  ? b.heTitle.replace(/^משנה\s*/u, '')
                  : b.heTitle,
            }))}
          selected={selectedBook}
          onSelect={handleBookPress}
          mode="instant"
          numColumns={4}
          renderItem={({ option, selected, onPress }) => (
            <BookItem
              book={option.value}
              onPress={onPress}
              isMishnah={selectedCategory === 'Mishnah'}
              style={selected ? styles.selectedBook : undefined}
            />
          )}
        />
      )}

      {/* Book chooser for Torah, Prophets, Writings */}
      {!config && selectedCategory && (
        <GridChooser<Book>
          reverse
          label={CATEGORY_LABELS[selectedCategory]!}
          options={categories
            .find((c) => c.name === selectedCategory)!
            .books.map((b) => ({
              key: b.id,
              value: b,
              label: b.heTitle.replace(/^משנה\s*/u, ''), // safe for all three
            }))}
          selected={selectedBook}
          onSelect={handleBookPress}
          mode="instant"
          numColumns={4}
          renderItem={({ option, selected, onPress }) => (
            <BookItem
              book={option.value}
              onPress={onPress}
              isMishnah={false}
              style={selected ? styles.selectedBook : undefined}
            />
          )}
        />
      )}

      {/* Parsha chooser (Torah only) */}
      {selectedCategory === 'Torah' && selectedBook && (
        <GridChooser<Parsha>
          reverse
          label="פרשה"
          options={(parshiyotByBook[selectedBook.id] ?? []).map((p) => ({
            key: p.name,
            value: p,
            label: p.hebrewName,
          }))}
          selected={selectedParsha}
          onSelect={(p) => {
            setSelectedParsha(p);
            setSelectedSection(null);
          }}
          mode="instant"
          numColumns={2}
          itemLabelStyle={{ fontSize: 18 }}
        />
      )}

      {/* Chapter / Daf picker (any selected book) */}
      {selectedBook && (
        <GridChooser<number>
          reverse
          label={selectedCategory === 'Bavli' ? 'דף' : 'פרק'}
          options={Array.from(
            { length: selectedBook.text.length },
            (_, i) => ({
              key: String(i + 1),
              value: i + 1,
              label: intToHebrew(i + 1),
            })
          )}
          selected={selectedSection}
          onSelect={(n) => {
            setSelectedSection(n);
            navigation.navigate('BookView', {
              book: selectedBook!,
              section: n,
            });
          }}
          mode="confirm"
          confirmLabel="Next"
          itemLabelStyle={{ fontSize: 18 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  categoryContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categorySelected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
  selectedBook: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
});
