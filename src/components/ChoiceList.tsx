// src/components/ChoiceList.tsx

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PillButton } from './PillButton'

export type Option<T extends string | number> = {
  value: T
  label: string
}

export interface ChoiceListProps<T extends string | number> {
  /** Title shown above */
  label: string
  /** List of value/label options */
  options: Option<T>[]
  /** Currently selected value (or null) */
  selected: T | null
  /** Called when user taps “Next” (picker) or a button (button mode) */
  onSelect: (value: T) => void
  /** “button” = row of pills; “picker” = native wheel + Next button */
  mode?: 'button' | 'picker'
  /** override container */
  containerStyle?: ViewStyle
  /** override text in buttons or picker items */
  itemStyle?: TextStyle
  /** override default “Next” label */
  confirmLabel?: string
}

export function ChoiceList<T extends string | number>({
  label,
  options,
  selected,
  onSelect,
  mode = 'button',
  containerStyle,
  itemStyle,
  confirmLabel = 'Next',
}: ChoiceListProps<T>) {
  const [current, setCurrent] = useState<T>(selected ?? options[0].value)

  // if parent selected changes, sync
  useEffect(() => {
    if (selected != null) setCurrent(selected)
  }, [selected])

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{label}</Text>

      {mode === 'picker' ? (
        <>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={current}
              onValueChange={setCurrent as any}
              style={styles.picker}
              itemStyle={itemStyle}
            >
              {options.map(o => (
                <Picker.Item
                  key={String(o.value)}
                  label={o.label}
                  value={o.value}
                />
              ))}
            </Picker>
          </View>

          <Pressable
            onPress={() => onSelect(current)}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.nextButtonPressed,
            ]}
          >
            <Text style={styles.nextText}>{confirmLabel}</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.row}>
          {options.map(o => (
            <PillButton
              key={String(o.value)}
              text={o.label}
              onPress={() => onSelect(o.value)}
              style={o.value === selected ? styles.selected : undefined}
              textStyle={itemStyle}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',            // <–– center everything
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
    alignSelf: 'stretch',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pickerWrapper: {
    width: '60%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: { flex: 1 },
  selected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
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
})
