// src/features/books/components/SectionPicker.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Row } from '../../../components/Layout/Row';
import { PillButton } from '../../../components/PillButton';

interface SectionPickerProps {
  /** array of 1-based section numbers */
  sections: number[];
  /** currently highlighted section, or null */
  selected: number | null;
  /** called when user taps a section */
  onSelect: (n: number) => void;
  /** label text above row (“Chapter” or “Daf”) */
  label: string;
}

export const SectionPicker: React.FC<SectionPickerProps> = ({
  sections,
  selected,
  onSelect,
  label,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{label}</Text>
    <Row reverse style={styles.row}>
      {sections.map(n => (
        <PillButton
          key={n}
          text={`${n}`}
          onPress={() => onSelect(n)}
          style={selected === n ? styles.selected : undefined}
        />
      ))}
    </Row>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  row: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
});
