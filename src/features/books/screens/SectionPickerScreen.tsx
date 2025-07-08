// src/features/books/screens/SectionPickerScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { SectionPicker } from '../components/SectionPicker';
import { NewNoteParamList } from '../../../navigation/NewNoteStack';
import { StackNavigationProp } from '@react-navigation/stack';

type SectionPickerRouteProp = RouteProp<NewNoteParamList, 'SectionPicker'>;
type SectionPickerNavProp   = StackNavigationProp<NewNoteParamList, 'SectionPicker'>;

const SectionPickerScreen: React.FC = () => {
  const navigation = useNavigation<SectionPickerNavProp>();
  const route = useRoute<SectionPickerRouteProp>();
  const { bookId, chapter } = route.params;

  // TODO: replace with real data source
  const sections = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selected, setSelected] = React.useState<number | null>(null);

  const onSelect = (section: number) => {
    setSelected(section);
    navigation.navigate('NoteEditor', { bookId, chapter, section });
  };

  return (
    <View style={styles.container}>
      <SectionPicker
        label="Section"
        sections={sections}
        selected={selected}
        onSelect={onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default SectionPickerScreen;
