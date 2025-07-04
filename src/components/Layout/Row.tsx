// src/components/Layout/Row.tsx
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface RowProps extends ViewProps {
  /** if true, uses row-reverse instead of row */
  reverse?: boolean;
}

export const Row: React.FC<RowProps> = ({
  reverse = false,
  style,
  children,
  ...rest
}) => (
  <View
    style={[reverse ? styles.reverse : styles.row, style]}
    {...rest}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
});
