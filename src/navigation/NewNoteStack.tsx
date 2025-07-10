// src/navigation/NewNoteStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BooksListScreen } from '../features/books/screens/BooksListScreen';
import { BookScreen }      from '../features/books/screens/BookScreen';
import SectionPickerScreen from '../features/books/screens/SectionPickerScreen';
import NoteEditorScreen    from '../features/notes/screens/NoteEditorScreen';

import type { Book } from '../features/books/types';

export type NewNoteParamList = {
  BookSelection: undefined;
  BookView: {
    book: Book;
    section?: number;
  };
  SectionPicker: {
    bookId: string;
    chapter: number;
  };
  NoteEditor: {
    bookId: string;
    chapter: number;
    section: number;
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
    <Stack.Screen
      name="SectionPicker"
      component={SectionPickerScreen}
      options={{ title: 'Choose Section' }}
    />
    <Stack.Screen
      name="NoteEditor"
      component={NoteEditorScreen}
      options={{ title: 'New Note' }}
    />
  </Stack.Navigator>
);

export default NewNoteStack;
