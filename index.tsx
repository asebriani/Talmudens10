// index.tsx
import 'react-native-gesture-handler';           // ← must be first
import { enableScreens } from 'react-native-screens';
import { registerRootComponent } from 'expo';    // or 'react-native' AppRegistry
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import App from './App';

// opt in to native-screen-backed navigators
enableScreens();

function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(Root);
