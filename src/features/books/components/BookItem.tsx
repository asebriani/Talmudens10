// src/features/books/components/BookItem.tsx

import React from 'react';
import type { Book } from '../types';
import { PillButton } from '../../../components/PillButton';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

interface Props {
  book: Book;
  onPress: () => void;
  /** Only strip the Hebrew "משנה " prefix when true */
  isMishnah?: boolean;
  /** Optional override for container style to indicate selection */
  style?: StyleProp<ViewStyle>;
  /** Optional override for text style */
  textStyle?: StyleProp<TextStyle>;
}

export function BookItem({
  book,
  onPress,
  isMishnah = false,
  style,
  textStyle,
}: Props): JSX.Element {
  // If this is a Mishnah tractate, drop the leading "משנה "
  const displayHeTitle = isMishnah
    ? book.heTitle.replace(/^משנה\s*/u, '')
    : book.heTitle;

  return (
    <PillButton
      text={displayHeTitle}
      onPress={onPress}
      style={style}
      textStyle={textStyle}
    />
  );
}
