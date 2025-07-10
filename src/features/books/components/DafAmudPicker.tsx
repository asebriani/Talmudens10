// src/features/books/components/DafAmudPicker.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { intToHebrew } from '../../../utils/hebrew';

interface DafAmudPickerProps {
  /** all available dafs (1-based) */
  dafs: number[];
  /** currently highlighted daf, or null */
  selectedDaf: number | null;
  /** called when user taps Next */
  onSelect: (daf: number, amud: 'א' | 'ב') => void;
}

export const DafAmudPicker: React.FC<DafAmudPickerProps> = ({
  dafs,
  selectedDaf,
  onSelect,
}) => {
  const [daf, setDaf] = useState<number>(selectedDaf ?? dafs[0]);
  const [amud, setAmud] = useState<'א' | 'ב'>('א');

  useEffect(() => {
    if (selectedDaf != null) {
      setDaf(selectedDaf);
    }
  }, [selectedDaf]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>דף – עמוד</Text>

      <View style={styles.pickersRow}>
        {/* Amud picker on the left */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={amud}
            onValueChange={setAmud}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="א" value="א" />
            <Picker.Item label="ב" value="ב" />
          </Picker>
        </View>

        {/* Daf picker on the right */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={daf}
            onValueChange={setDaf}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {dafs.map(n => (
              <Picker.Item key={n} label={intToHebrew(n)} value={n} />
            ))}
          </Picker>
        </View>
      </View>

      <Pressable
        onPress={() => onSelect(daf, amud)}
        style={({ pressed }) => [
          styles.nextButton,
          pressed && styles.nextButtonPressed,
        ]}
      >
        <Text style={styles.nextText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'stretch',
    textAlign: 'right',
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: '600',
  },
  pickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  pickerWrapper: {
    width: '45%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 16,
  },
  nextButtonPressed: {
    backgroundColor: '#005BBB',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
