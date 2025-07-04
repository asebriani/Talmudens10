// src/features/books/screens/BookScreen.tsx

import React from 'react';
import { ScrollView, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

export const BookScreen: React.FC<Props> = ({ route }) => {
  const { book } = route.params;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* dump the full book object; replace with your actual text-rendering later */}
      <Text selectable>
        {JSON.stringify(book, null, 2)}
      </Text>
    </ScrollView>
  );
};
