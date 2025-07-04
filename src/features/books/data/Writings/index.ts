// src/features/books/data/Writings/index.ts

import { Book } from '../../types';
import { writingsOrder } from './order';

import ChroniclesI   from '@assets/text/Writings/ChroniclesI.json';
import ChroniclesII  from '@assets/text/Writings/ChroniclesII.json';
import Daniel        from '@assets/text/Writings/Daniel.json';
import Ecclesiastes  from '@assets/text/Writings/Ecclesiastes.json';
import Esther        from '@assets/text/Writings/Esther.json';
import Ezra          from '@assets/text/Writings/Ezra.json';
import Job           from '@assets/text/Writings/Job.json';
import Lamentations  from '@assets/text/Writings/Lamentations.json';
import Nehemiah      from '@assets/text/Writings/Nehemiah.json';
import Proverbs      from '@assets/text/Writings/Proverbs.json';
import Psalms        from '@assets/text/Writings/Psalms.json';
import Ruth          from '@assets/text/Writings/Ruth.json';
import SongOfSongs   from '@assets/text/Writings/SongOfSongs.json';

const raw: Record<string, Book> = {
  ChroniclesI,
  ChroniclesII,
  Daniel,
  Ecclesiastes,
  Esther,
  Ezra,
  Job,
  Lamentations,
  Nehemiah,
  Proverbs,
  Psalms,
  Ruth,
  SongOfSongs,
};

/**
 * Build `writingsBooks` in the exact order given by `writingsOrder`.
 * Throws if any entry in the order array has no corresponding JSON import.
 */
export const writingsBooks: Book[] = writingsOrder.map(id => {
  const book = raw[id];
  if (!book) {
    throw new Error(`Missing Writings JSON for ${id}`);
  }
  return book;
});
