import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useBooks } from '../hooks/useBooks'
import { useParshiyot } from '../hooks/useParshiyot'
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection'
import { SelectionList } from '../../../components/SelectionList'
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

      {/*── Books grid for Torah, Prophets & Writings ──*/}
      {['Torah', 'Prophets', 'Writings'].includes(selectedCategory!) && (
        <CategorySection
          category={categories.find(c => c.name === selectedCategory!)!}
          onBookPress={handleBookPress}
          selectedBookId={selectedBook?.id}
        />
      )}

      {/*── Seder chooser for Mishnah / Bavli ──*/}
      {(selectedCategory === 'Mishnah' || selectedCategory === 'Bavli') && (
        <SelectionList
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

      {/*── Tractates grid for Mishnah & Bavli ──*/}
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

      {/*── Parsha chooser for Torah ──*/}
      {selectedCategory === 'Torah' && selectedBook && (
        <SelectionList
          label="פרשה"
          mode="button"
          options={(parshiyotByBook[selectedBook.id] ?? []).map(p => ({
            value: p,
            label: p.hebrewName,
          }))}
          selected={selectedParsha ?? null}
          onSelect={p => {
            setSelectedParsha(p)
            setSelectedSection(null)
          }}
          itemStyle={{ fontSize: 18 }}
        />
      )}

      {/*── Chapter / Section chooser ──*/}
      {selectedBook && (
        <SelectionList
          label={
            selectedCategory === 'Bavli'
              ? 'דף'
              : selectedCategory === 'Torah'
              ? 'פרק'
              : 'פרק'
          }
          mode="picker"
          options={(() => {
            // Bavli text array is [daf][amud], but we index just by daf
            const count =
              selectedCategory === 'Bavli'
                ? selectedBook.text.length
                : selectedBook.text.length
            return Array.from({ length: count }, (_, i) => ({
              value: i + 1,
              label:
                selectedCategory === 'Bavli'
                  ? intToHebrew(i + 1)
                  : intToHebrew(i + 1),
            }))
          })()}
          selected={selectedSection}
          onSelect={n => {
            setSelectedSection(n)
            if (selectedCategory === 'Bavli') {
              navigation.navigate('BookView', {
                book: selectedBook!,
                section: n,
              })
            } else {
              navigation.navigate('BookView', {
                book: selectedBook!,
                section: n,
              })
            }
          }}
          confirmLabel="Next"
          itemStyle={{ fontSize: 18 }}
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
