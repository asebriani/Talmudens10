import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { BooksList } from '@features/books/components/BooksList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <BooksList />
    </SafeAreaView>
  );
}
