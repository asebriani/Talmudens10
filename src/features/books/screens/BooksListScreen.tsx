import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBooks } from '../hooks/useBooks';
import { BooksListView } from '../components/BooksListView';
import type { RootStackParamList } from '../../../App';
import type { Book } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'BooksList'>;

export function BooksListScreen(): JSX.Element {
  const categories = useBooks();
  const navigation = useNavigation<NavProp>();

  const handleBookPress = (book: Book) => {
    navigation.navigate('Book', { book });
  };

  return (
    <BooksListView
      categories={categories}
      onBookPress={handleBookPress}
    />
  );
}
