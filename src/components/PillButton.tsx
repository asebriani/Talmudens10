// src/components/PillButton.tsx

import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';

export interface PillButtonProps
  // inherit everything Pressable can do, except its own `style` and `children`
  extends Omit<PressableProps, 'style' | 'children'> {
  /** Text to display inside the pill */
  text: string;
  /** Optional override for container style */
  style?: StyleProp<ViewStyle>;
  /** Optional override for text style */
  textStyle?: StyleProp<TextStyle>;
}

export function PillButton({
  text,
  onPress,
  style,
  textStyle,
  ...pressableRest
}: PillButtonProps): JSX.Element {
  return (
    <Pressable
      {...pressableRest}
      onPress={onPress}
      android_ripple={{ color: '#ccc' }}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Text style={[styles.label, textStyle]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    margin: 4,            // space on all sides for wrapping
    borderWidth: 1,       // thin black border
    borderColor: '#000',
  },
  buttonPressed: {
    backgroundColor: '#ddd',
  },
  label: {
    fontSize: 24,
    textAlign: 'center',  // center the text inside the pill
    color: '#333',
  },
});
