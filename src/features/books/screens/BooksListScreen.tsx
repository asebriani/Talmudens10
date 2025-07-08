// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useBooks } from '../hooks/useBooks'
import { useParshiyot } from '../hooks/useParshiyot'
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection'
import { SectionPicker } from '../components/SectionPicker'
import { DafAmudPicker } from '../components/DafAmudPicker'
import { ParshaPicker } from '../components/ParshaPicker'
import { PillButton } from '../../../components/PillButton'
import { Row } from '../../../components/Layout/Row'

import type { NewNoteParamList } from '../../../navigation/NewNoteStack'
import type { Book } from '../types'
import type { Parsha } from '../data/parshiyot'

type Props = NativeStackScreenProps<NewNoteParamList, 'BookSelection'>

export function BooksListScreen({ navigation }: Props): JSX.Element {
  const categories = useBooks()
  const parshiyotByBook = useParshiyot()

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [selectedParsha, setSelectedParsha] = useState<Parsha | null>(null)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  const handleCategoryPress = (name: string) => {
    setSelectedCategoryName(prev => (prev === name ? null : name))
    setSelectedBook(null)
    setSelectedParsha(null)
    setSelectedSection(null)
  }

  const handleBookPress = (book: Book) => {
    setSelectedBook(book)
    setSelectedParsha(null)
    setSelectedSection(null)
  }

  const selectedCategory = categories.find(c => c.name === selectedCategoryName)

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

      {/* Parsha picker for Torah (always render now) */}
      {selectedCategoryName === 'Torah' && selectedBook && (
        <ParshaPicker
          parshiyot={parshiyotByBook[selectedBook.id] ?? []}
          selectedName={selectedParsha?.name ?? null}
          onSelect={p => {
            setSelectedParsha(p)
            setSelectedSection(null)
          }}
        />
      )}

      {/* Chapter picker for chosen Parsha */}
      {selectedCategoryName === 'Torah' && selectedBook && selectedParsha && (
        <SectionPicker
          sections={Array.from(
            { length: selectedParsha.end.chapter - selectedParsha.start.chapter + 1 },
            (_, i) => selectedParsha.start.chapter + i
          )}
          selected={selectedSection}
          onSelect={chapter => {
            setSelectedSection(chapter)
            navigation.navigate('BookView', {
              book: selectedBook,
              section: chapter,
            })
          }}
          label="פרק"
        />
      )}

      {/* Default chapter picker for non-Torah, non-Bavli */}
      {selectedBook &&
        selectedCategoryName !== 'Torah' &&
        selectedCategoryName !== 'Bavli' && (
          <SectionPicker
            sections={Array.from(
              { length: selectedBook.text.length },
              (_, i) => i + 1
            )}
            selected={selectedSection}
            onSelect={section => {
              setSelectedSection(section)
              navigation.navigate('BookView', {
                book: selectedBook,
                section,
              })
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
            navigation.navigate('BookView', {
              book: selectedBook,
              section: daf,
            })
          }}
        />
      )}
    </ScrollView>
  )
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
})
