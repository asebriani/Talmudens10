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
    backgroundColor: '#fafafa',       // a notch lighter than before
    paddingVertical: 8,               // slightly more comfortable tap target
    paddingHorizontal: 16,
    borderRadius: 20,                // extra-rounded pill
    margin: 4,                       // spacing when wrapping
    borderWidth: 1,
    borderColor: '#ccc',             // softer grey border

    // iOS drop-shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,

    // Android elevation
    elevation: 2,
  },
  buttonPressed: {
    backgroundColor: '#e8e8e8',      // subtle darken on press
    shadowOpacity: 0,                // flatten the shadow
    elevation: 0,
  },
  label: {
    fontSize: 18,                    // slightly smaller for balance
    textAlign: 'center',
    color: '#333',
  },
});

