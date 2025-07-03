import genesis from '@assets/text/Torah/Genesis.json';
import exodus from '@assets/text/Torah/Exodus.json';
import leviticus from '@assets/text/Torah/Leviticus.json';
import numbers from '@assets/text/Torah/Numbers.json';
import deuteronomy from '@assets/text/Torah/Deuteronomy.json';

import prophetsPlaceholder from '@assets/text/Prophets/placeholder.json';
import writingsPlaceholder from '@assets/text/Writings/placeholder.json';
import mishnahPlaceholder from '@assets/text/Mishnah/placeholder.json';
import bavliPlaceholder from '@assets/text/Bavli/placeholder.json';

import { Book, Category } from '../types';

export function useBooks(): Category[] {
  const torah: Book[] = [
    genesis,
    exodus,
    leviticus,
    numbers,
    deuteronomy,
  ];

  const placeholder = (p: any): Book[] => [p];

  return [
    { name: 'Torah', books: torah },
    { name: 'Prophets', books: placeholder(prophetsPlaceholder) },
    { name: 'Writings', books: placeholder(writingsPlaceholder) },
    { name: 'Mishnah', books: placeholder(mishnahPlaceholder) },
    { name: 'Bavli', books: placeholder(bavliPlaceholder) },
  ];
}
