export interface Book {
    title: string;
    heTitle: string;
    status?: 'locked' | 'unlocked' | 'placeholder';
  }
  
  export interface Category {
    name: string;
    books: Book[];
  }
  