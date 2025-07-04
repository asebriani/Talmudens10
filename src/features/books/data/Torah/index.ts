// src/features/books/data/Torah/index.ts

import { Book } from '../../types';
import genesis     from '@assets/text/Torah/Genesis.json';
import exodus      from '@assets/text/Torah/Exodus.json';
import leviticus   from '@assets/text/Torah/Leviticus.json';
import numbers     from '@assets/text/Torah/Numbers.json';
import deuteronomy from '@assets/text/Torah/Deuteronomy.json';

export const torahBooks: Book[] = [
  genesis,
  exodus,
  leviticus,
  numbers,
  deuteronomy,
];
