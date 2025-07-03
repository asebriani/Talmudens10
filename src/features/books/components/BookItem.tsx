// src/features/books/components/BookItem.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Book } from '../types';

export const BookItem: React.FC<{ book: Book }> = ({ book }) => (
  <View style={styles.item}>
    <Text style={styles.heTitle}>{book.heTitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
  },
  heTitle: {
    fontSize: 24,
    textAlign: 'right',
  },
});
