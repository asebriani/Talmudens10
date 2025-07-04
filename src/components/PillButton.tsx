import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Props {
  /** Text to display inside the pill */
  text: string;
  /** Callback when the pill is pressed */
  onPress: () => void;
  /** Optional override for container style */
  style?: ViewStyle;
  /** Optional override for text style */
  textStyle?: TextStyle;
}

export function PillButton({
  text,
  onPress,
  style,
  textStyle,
}: Props): JSX.Element {
  return (
    <Pressable
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
