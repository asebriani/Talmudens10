// src/features/books/components/ParshaPicker.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Row } from '../../../components/Layout/Row'
import { PillButton } from '../../../components/PillButton'
import type { Parsha } from '../data/parshiyot'

interface ParshaPickerProps {
  parshiyot: Parsha[]
  selectedName: string | null
  onSelect: (parsha: Parsha) => void
}

export const ParshaPicker: React.FC<ParshaPickerProps> = ({
  parshiyot,
  selectedName,
  onSelect,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>פרשה</Text>
    <Row reverse style={styles.buttons}>
      {parshiyot.map(p => (
        <PillButton
          key={p.name}
          text={p.hebrewName}
          onPress={() => onSelect(p)}
          style={selectedName === p.name ? styles.selected : undefined}
        />
      ))}
    </Row>
  </View>
)

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
})
