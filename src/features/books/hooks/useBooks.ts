// src/features/books/hooks/useBooks.ts

import { Category } from '../types';

import { torahBooks }    from '../data/Torah';
import { prophetsBooks } from '../data/Prophets';
import { writingsBooks } from '../data/Writings';
import { mishnahBooks }  from '../data/Mishnah';
import { bavliBooks }    from '../data/Bavli';

export function useBooks(): Category[] {
  return [
    { name: 'Torah',    books: torahBooks    },
    { name: 'Prophets', books: prophetsBooks },
    { name: 'Writings', books: writingsBooks },
    { name: 'Mishnah',  books: mishnahBooks  },
    { name: 'Bavli',    books: bavliBooks    },
  ];
}
