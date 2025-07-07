// src/features/books/types.ts

export interface Book {
  id: string;
  title: string;
  heTitle: string;
  text: string[][];
}

export interface Category {
  name: string;
  books: Book[];
}
