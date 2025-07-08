// src/navigation/BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewNoteStack from './NewNoteStack';
import SavedNotesScreen from '../features/notes/screens/SavedNotesScreen';

export type BottomTabParamList = {
  NewNote: undefined;
  SavedNotes: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#888',
    }}
  >
    <Tab.Screen
      name="NewNote"
      component={NewNoteStack}
      options={{ tabBarLabel: 'New Note' }}
    />
    <Tab.Screen
      name="SavedNotes"
      component={SavedNotesScreen}
      options={{ tabBarLabel: 'Saved Notes' }}
    />
  </Tab.Navigator>
);

export default BottomTabs;
