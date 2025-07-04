import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import type { Book } from '../types';

interface Props {
  book: Book;
  onPress: () => void;
  /** Only strip the Hebrew "משנה " prefix when true */
  isMishnah?: boolean;
}

export function BookItem({
  book,
  onPress,
  isMishnah = false,
}: Props): JSX.Element {
  // Remove leading "משנה " if this is a Mishnah tractate
  const displayHeTitle = isMishnah
    ? book.heTitle.replace(/^משנה\s*/u, '')
    : book.heTitle;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Text style={styles.heTitle}>{displayHeTitle}</Text>
    </Pressable>
  );
}

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
});
