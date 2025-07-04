// src/features/books/data/Torah/index.ts
import type { Book } from '../../types';
import { torahOrder } from './order';

import genesis     from '@assets/text/Torah/Genesis.json';
import exodus      from '@assets/text/Torah/Exodus.json';
import leviticus   from '@assets/text/Torah/Leviticus.json';
import numbers     from '@assets/text/Torah/Numbers.json';
import deuteronomy from '@assets/text/Torah/Deuteronomy.json';

const raw: Record<typeof torahOrder[number], Omit<Book, 'id'>> = {
  Genesis:     genesis,
  Exodus:      exodus,
  Leviticus:   leviticus,
  Numbers:     numbers,
  Deuteronomy: deuteronomy,
};

export const torahBooks: Book[] = torahOrder.map(id => {
  const b = raw[id];
  if (!b) throw new Error(`Missing Torah data for "${id}"`);
  return { id, title: b.title, heTitle: b.heTitle };
});
