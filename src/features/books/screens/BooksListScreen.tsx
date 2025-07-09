// src/features/books/screens/BooksListScreen.tsx

import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { useBooks } from '../hooks/useBooks'
import { useParshiyot } from '../hooks/useParshiyot'
import { CATEGORY_LABELS, CategorySection } from '../components/CategorySection'
import { SelectionList } from '../../../components/SelectionList'
import { PillButton } from '../../../components/PillButton'
import { Row } from '../../../components/Layout/Row'
import { intToHebrew } from '../../../utils/hebrew'
import type { NewNoteParamList } from '../../../navigation/NewNoteStack'
import type { Book } from '../types'
import type { Parsha } from '../data/parshiyot'
import { sederConfig } from '../data/sedarim'

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

  // Only Mishnah & Bavli use our new unified config:
  const isTextWithSedarim =
    selectedCategory === 'Mishnah' || selectedCategory === 'Bavli'
  const config = isTextWithSedarim
    ? sederConfig[selectedCategory as 'Mishnah' | 'Bavli']
    : undefined

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

      {/*── Unified “סדר” chooser for Mishnah/Bavli ──*/}
      {config && (
        <SelectionList
          label="סדר"
          mode="button"
          options={Object.keys(config.sedarim).map(s => ({
            value: s,
            label: config.labels[s],
          }))}
          selected={selectedSeder}
          onSelect={s => {
            setSelectedSeder(s)
            setSelectedBook(null)
          }}
        />
      )}

      {/*── Tractates grid for selected seder ──*/}
      {config && selectedSeder && (
        <CategorySection
          category={{
            name: selectedCategory!,
            books: categories
              .find(c => c.name === selectedCategory!)!
              .books.filter(b =>
                config.sedarim[selectedSeder].includes(b.id)
              ),
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
          selected={selectedParsha}
          onSelect={p => {
            setSelectedParsha(p)
            setSelectedSection(null)
          }}
          itemStyle={{ fontSize: 18 }}
        />
      )}

      {/*── Chapter/Daf picker ──*/}
      {selectedBook && (
        <SelectionList
          label={selectedCategory === 'Bavli' ? 'דף' : 'פרק'}
          mode="picker"
          options={(() => {
            const count = selectedBook.text.length
            return Array.from({ length: count }, (_, i) => ({
              value: i + 1,
              label: intToHebrew(i + 1),
            }))
          })()}
          selected={selectedSection}
          onSelect={n => {
            setSelectedSection(n)
            navigation.navigate('BookView', {
              book: selectedBook!,
              section: n,
            })
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
