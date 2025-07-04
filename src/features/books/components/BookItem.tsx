import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import type { Book } from '../types'

interface Props {
  book: Book
  onPress: () => void
}

export const BookItem: React.FC<Props> = ({ book, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.heTitle}>{book.heTitle}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  heTitle: {
    fontSize: 24,
    textAlign: 'right',
  },
})
