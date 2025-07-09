// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useBooks } from '../hooks/useBooks'
import { useParshiyot } from '../hooks/useParshiyot'
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection'
import { ChoiceList } from '../../../components/ChoiceList'
import { DafAmudPicker } from '../components/DafAmudPicker'
import { PillButton } from '../../../components/PillButton'
import { Row } from '../../../components/Layout/Row'

import { SEDARIM_LABELS, mishnahSedarim, bavliSedarim } from '../data/sedarim'
import { intToHebrew } from '../../../utils/hebrew'

import type { NewNoteParamList } from '../../../navigation/NewNoteStack'
import type { Book } from '../types'
import type { Parsha } from '../data/parshiyot'

type Props = NativeStackScreenProps<NewNoteParamList, 'BookSelection'>

export function BooksListScreen({ navigation }: Props) {
  const categories = useBooks()
  const parshiyotByBook = useParshiyot()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSeder, setSelectedSeder]       = useState<string | null>(null)
  const [selectedBook, setSelectedBook]         = useState<Book | null>(null)
  const [selectedParsha, setSelectedParsha]     = useState<Parsha | null>(null)
  const [selectedSection, setSelectedSection]   = useState<number | null>(null)

  const handleCategoryPress = (name: string) => {
    setSelectedCategory(prev => (prev === name ? null : name))
    setSelectedSeder(null)
    setSelectedBook(null)
    setSelectedParsha(null)
    setSelectedSection(null)
  }

  const handleBookPress = (book: Book) => {
    setSelectedBook(book)
    setSelectedParsha(null)
    setSelectedSection(null)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Category buttons */}
      <Row reverse style={styles.categoryContainer}>
        {categories.map(cat => (
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

      {/* ── Books grid for Torah, Prophets & Writings ── */}
      {['Torah', 'Prophets', 'Writings'].includes(selectedCategory!) && (
        <CategorySection
          category={categories.find(c => c.name === selectedCategory!)!}
          onBookPress={handleBookPress}
          selectedBookId={selectedBook?.id}
        />
      )}

      {/* ── Seder chooser (Mishnah / Bavli) ── */}
      {(selectedCategory === 'Mishnah' || selectedCategory === 'Bavli') && (
        <ChoiceList
          label="סדר"
          mode="button"
          options={(
            selectedCategory === 'Mishnah'
              ? Object.keys(mishnahSedarim)
              : Object.keys(bavliSedarim)
          ).map(s => ({ value: s, label: SEDARIM_LABELS[s] }))}
          selected={selectedSeder}
          onSelect={s => {
            setSelectedSeder(s)
            setSelectedBook(null)
          }}
        />
      )}

      {/* ── Tractates grid for Mishnah ── */}
      {selectedCategory === 'Mishnah' && selectedSeder && (
        <CategorySection
          category={{
            name: 'Mishnah',
            books: categories
              .find(c => c.name === 'Mishnah')!
              .books.filter(b => mishnahSedarim[selectedSeder].includes(b.id)),
          }}
          onBookPress={handleBookPress}
          selectedBookId={selectedBook?.id}
        />
      )}

      {/* ── Tractates grid for Bavli ── */}
      {selectedCategory === 'Bavli' && selectedSeder && (
        <CategorySection
          category={{
            name: 'Bavli',
            books: categories
              .find(c => c.name === 'Bavli')!
              .books.filter(b => bavliSedarim[selectedSeder].includes(b.id)),
          }}
          onBookPress={handleBookPress}
          selectedBookId={selectedBook?.id}
        />
      )}

      {/* ── Parsha chooser for Torah ── */}
      {selectedCategory === 'Torah' && selectedBook && (
        <ChoiceList
          label="פרשה"
          mode="button"
          options={(parshiyotByBook[selectedBook.id] ?? []).map(p => ({
            value: p.name,
            label: p.hebrewName,
          }))}
          selected={selectedParsha?.name ?? null}
          onSelect={name => {
            const p = (parshiyotByBook[selectedBook.id] ?? []).find(
              x => x.name === name
            )!
            setSelectedParsha(p)
          }}
        />
      )}

      {/* ── Chapter chooser for a Torah parsha ── */}
      {selectedCategory === 'Torah' &&
        selectedBook &&
        selectedParsha && (
          <ChoiceList
            label="פרק"
            mode="picker"
            options={Array.from(
              {
                length:
                  selectedParsha.end.chapter -
                    selectedParsha.start.chapter +
                  1,
              },
              (_, i) => {
                const ch = selectedParsha.start.chapter + i
                return { value: ch, label: intToHebrew(ch) }
              }
            )}
            selected={selectedSection}
            onSelect={chapter =>
              navigation.navigate('BookView', {
                book: selectedBook,
                section: chapter,
              })
            }
          />
        )}

      {/* ── Chapter chooser for Mishnah ── */}
      {selectedCategory === 'Mishnah' && selectedBook && (
        <ChoiceList
          label="פרק"
          mode="picker"
          options={selectedBook.text.map((_, i) => ({
            value: i + 1,
            label: intToHebrew(i + 1),
          }))}
          selected={selectedSection}
          onSelect={section =>
            navigation.navigate('BookView', {
              book: selectedBook,
              section,
            })
          }
        />
      )}

      {/* ── Daf–Amud picker for Bavli ── */}
      {selectedCategory === 'Bavli' && selectedBook && (
        <DafAmudPicker
          dafs={Array.from({ length: selectedBook.text.length }, (_, i) => i + 1)}
          selectedDaf={selectedSection}
          onSelect={(daf, amud) => {
            setSelectedSection(daf)
            navigation.navigate('BookView', {
              book: selectedBook,
              section: daf,
            })
          }}
        />
      )}

      {/* ── Chapter chooser for Prophets & Writings ── */}
      {selectedBook &&
        selectedCategory &&
        !['Torah', 'Mishnah', 'Bavli'].includes(selectedCategory) && (
          <ChoiceList
            label="פרק"
            mode="picker"
            options={selectedBook.text.map((_, i) => ({
              value: i + 1,
              label: intToHebrew(i + 1),
            }))}
            selected={selectedSection}
            onSelect={section =>
              navigation.navigate('BookView', {
                book: selectedBook,
                section,
              })
            }
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
