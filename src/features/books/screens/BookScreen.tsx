// src/features/books/screens/BookScreen.tsx

import React from 'react';
import { ScrollView, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

export function BookScreen({ route }: Props): JSX.Element {
  const { book, section } = route.params;

  const content = section != null
    ? (book as any).text[section - 1]
    : book;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text selectable>
        {JSON.stringify(content, null, 2)}
      </Text>
    </ScrollView>
  );
}
