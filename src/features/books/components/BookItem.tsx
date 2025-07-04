import React from 'react';
import type { Book } from '../types';
import { PillButton } from '../../../components/PillButton';

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
  // If this is a Mishnah tractate, drop the leading "משנה "
  const displayHeTitle = isMishnah
    ? book.heTitle.replace(/^משנה\s*/u, '')
    : book.heTitle;

  return <PillButton text={displayHeTitle} onPress={onPress} />;
}