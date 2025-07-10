// src/features/books/components/SectionPicker.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { intToHebrew } from '../../../utils/hebrew';

interface SectionPickerProps {
  /** array of 1-based section numbers */
  sections: number[];
  /** currently highlighted section, or null */
  selected: number | null;
  /** called when user taps Next */
  onSelect: (n: number) => void;
  /** label text above picker (“Chapter” or “Daf”) */
  label: string;
}

export const SectionPicker: React.FC<SectionPickerProps> = ({
  sections,
  selected,
  onSelect,
  label,
}) => {
  const [value, setValue] = useState<number>(selected ?? sections[0]);

  useEffect(() => {
    if (selected != null) {
      setValue(selected);
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={setValue}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {sections.map(n => (
            <Picker.Item key={n} label={intToHebrew(n)} value={n} />
          ))}
        </Picker>
      </View>

      <Pressable
        onPress={() => onSelect(value)}
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
  pickerWrapper: {
    width: '60%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
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
