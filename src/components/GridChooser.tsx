// src/components/GridChooser.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

export type Option<T> = {
  key: string;
  value: T;
  label: string;
};

export interface GridChooserProps<T> {
  label: string;
  options: Option<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
  mode?: 'instant' | 'confirm';
  confirmLabel?: string;
  numColumns?: number;
  /** if true, layout items right-to-left */
  reverse?: boolean;
  containerStyle?: ViewStyle;
  gridStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  itemLabelStyle?: TextStyle;
  renderItem?: (props: {
    option: Option<T>;
    selected: boolean;
    onPress: () => void;
  }) => React.ReactNode;
}

export function GridChooser<T>({
  label,
  options,
  selected,
  onSelect,
  mode = 'instant',
  confirmLabel = 'Confirm',
  numColumns = 3,
  reverse = false,
  containerStyle,
  gridStyle,
  itemContainerStyle,
  itemLabelStyle,
  renderItem,
}: GridChooserProps<T>) {
  // for 'confirm' mode only
  const [current, setCurrent] = useState<T | null>(selected);

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  const chosen = mode === 'instant' ? selected : current;

  const handlePress = (value: T) => {
    if (mode === 'instant') {
      onSelect(value);
    } else {
      setCurrent(value);
    }
  };

  const defaultRender = (
    opt: Option<T>,
    isSel: boolean,
    press: () => void
  ) => (
    <Pressable
      key={opt.key}
      onPress={press}
      style={[
        styles.pill,
        isSel && styles.pillSelected,
        itemContainerStyle,
      ]}
    >
      <Text style={[styles.pillLabel, itemLabelStyle]}>{opt.label}</Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{label}</Text>

      <View
        style={[
          styles.grid,
          reverse && styles.gridReverse,
          gridStyle,
        ]}
      >
        {options.map((opt) => {
          const isSel = opt.value === chosen;
          const press = () => handlePress(opt.value);

          if (renderItem) {
            return (
              <React.Fragment key={opt.key}>
                {renderItem({ option: opt, selected: isSel, onPress: press })}
              </React.Fragment>
            );
          } else {
            return defaultRender(opt, isSel, press);
          }
        })}
      </View>

      {mode === 'confirm' && (
        <Pressable
          onPress={() => current != null && onSelect(current)}
          style={({ pressed }) => [
            styles.confirmBtn,
            pressed && styles.confirmBtnPressed,
          ]}
        >
          <Text style={styles.confirmText}>{confirmLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridReverse: {
    flexDirection: 'row-reverse',
  },
  pill: {
    backgroundColor: '#fafafa',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pillSelected: {
    backgroundColor: '#ddd',
    borderColor: '#555',
  },
  pillLabel: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  confirmBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 16,
  },
  confirmBtnPressed: {
    backgroundColor: '#005BBB',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
