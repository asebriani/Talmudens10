// src/features/books/data/Writings/index.ts
import type { Book } from '../../types';
import { writingsOrder } from './order';

import Psalms        from '@assets/text/Writings/Psalms.json';
import Proverbs      from '@assets/text/Writings/Proverbs.json';
import Job           from '@assets/text/Writings/Job.json';
import SongOfSongs   from '@assets/text/Writings/SongOfSongs.json';
import Ruth          from '@assets/text/Writings/Ruth.json';
import Lamentations  from '@assets/text/Writings/Lamentations.json';
import Ecclesiastes  from '@assets/text/Writings/Ecclesiastes.json';
import Esther        from '@assets/text/Writings/Esther.json';
import Daniel        from '@assets/text/Writings/Daniel.json';
import Ezra          from '@assets/text/Writings/Ezra.json';
import Nehemiah      from '@assets/text/Writings/Nehemiah.json';
import ChroniclesI   from '@assets/text/Writings/ChroniclesI.json';
import ChroniclesII  from '@assets/text/Writings/ChroniclesII.json';

const raw: Record<typeof writingsOrder[number], Omit<Book, 'id'>> = {
  Psalms,
  Proverbs,
  Job,
  SongOfSongs,
  Ruth,
  Lamentations,
  Ecclesiastes,
  Esther,
  Daniel,
  Ezra,
  Nehemiah,
  ChroniclesI,
  ChroniclesII,
};

export const writingsBooks: Book[] = writingsOrder.map(id => {
  const b = raw[id];
  if (!b) throw new Error(`Missing Writings data for "${id}"`);
  return { id, title: b.title, heTitle: b.heTitle };
});
