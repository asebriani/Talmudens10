// src/features/books/hooks/useBooks.ts

import { Category } from '../types';

import { torahBooks }    from '../data/torah';
import { prophetsBooks } from '../data/prophets';
import { writingsBooks } from '../data/writings';
import { mishnahBooks }  from '../data/mishnah';
import { bavliBooks }    from '../data/bavli';

export function useBooks(): Category[] {
  return [
    { name: 'Torah',    books: torahBooks    },
    { name: 'Prophets', books: prophetsBooks },
    { name: 'Writings', books: writingsBooks },
    { name: 'Mishnah',  books: mishnahBooks  },
    { name: 'Bavli',    books: bavliBooks    },
  ];
}
