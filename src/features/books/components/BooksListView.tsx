import React from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { BookItem } from './BookItem'
import type { Category, Book } from '../types'

const CATEGORY_LABELS: Record<string, string> = {
  Torah: 'חומש',
  Prophets: 'נביאים',
  Writings: 'כתובים',
  Mishnah: 'משנה',
  Bavli: 'תלמוד בבלי',
}

interface Props {
  categories: Category[]
  onBookPress: (book: Book) => void
}

export const BooksListView: React.FC<Props> = ({ categories, onBookPress }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {categories.map(cat => (
      <View key={cat.name} style={styles.categorySection}>
        <Text style={styles.categoryTitle}>
          {CATEGORY_LABELS[cat.name] ?? cat.name}
        </Text>
        {cat.books.map(book => (
          <BookItem
            key={`${cat.name}-${book.id ?? book.title}`}
            book={book}
            onPress={() => onBookPress(book)}
          />
        ))}
      </View>
    ))}
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
})
