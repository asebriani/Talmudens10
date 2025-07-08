// src/features/notes/screens/SavedNotesScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedNotesScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.placeholder}>
      Your saved notes will appear here.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholder: { fontSize: 18, color: '#666' },
});

export default SavedNotesScreen;
