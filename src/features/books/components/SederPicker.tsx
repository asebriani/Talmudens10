// src/features/books/components/SederPicker.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Row } from '../../../components/Layout/Row';
import { PillButton } from '../../../components/PillButton';
import { SEDARIM_LABELS } from '../data/sedarim';

interface SederPickerProps {
  sedarim: string[];              // keys: ['Zeraim','Moed',…]
  selected?: string;
  onSelect: (sederKey: string) => void;
}

export const SederPicker: React.FC<SederPickerProps> = ({
  sedarim,
  selected,
  onSelect,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>סדר</Text>
    <Row reverse style={styles.buttons}>
      {sedarim.map(key => (
        <PillButton
          key={key}
          text={SEDARIM_LABELS[key] ?? key}
          onPress={() => onSelect(key)}
          style={selected === key ? styles.selected : undefined}
        />
      ))}
    </Row>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
  },
  buttons: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
});
