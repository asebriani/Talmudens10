// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BooksListScreen } from '@features/books/screens/BooksListScreen';
import { BookScreen } from '@features/books/screens/BookScreen';
import type { Book } from '@features/books/types';

export type RootStackParamList = {
  BooksList: undefined;
  Book: { book: Book; section?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BooksList">
        <Stack.Screen
          name="BooksList"
          component={BooksListScreen}
          options={{ title: 'Books' }}
        />
        <Stack.Screen
          name="Book"
          component={BookScreen}
          options={({ route }) => ({ title: route.params.book.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
