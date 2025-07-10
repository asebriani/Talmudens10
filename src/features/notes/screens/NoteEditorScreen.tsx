// src/features/notes/screens/NoteEditorScreen.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NoteEditorScreen: React.FC = () => (
  <View style={styles.container}>
    <Text>Note editor goes here</Text>
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }
})

export default NoteEditorScreen
