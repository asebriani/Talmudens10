// src/navigation/NewNoteStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BooksListScreen } from '../features/books/screens/BooksListScreen';
import { BookScreen }      from '../features/books/screens/BookScreen';
import type { Book }       from '../features/books/types';

export type NewNoteParamList = {
  BookSelection: undefined;
  BookView: {
    book: Book;
    section?: number;
  };
};

const Stack = createNativeStackNavigator<NewNoteParamList>();

const NewNoteStack: React.FC = () => (
  <Stack.Navigator initialRouteName="BookSelection">
    <Stack.Screen
      name="BookSelection"
      component={BooksListScreen}
      options={{ title: 'Books' }}
    />
    <Stack.Screen
      name="BookView"
      component={BookScreen}
      options={{ title: 'Text' }}
    />
  </Stack.Navigator>
);

export default NewNoteStack;
