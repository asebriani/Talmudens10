// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';

const App: React.FC = () => (
  <NavigationContainer>
    <BottomTabs />
  </NavigationContainer>
);

export default App;
