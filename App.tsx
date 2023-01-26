import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {Provider } from 'react-redux';
import Navigation from './src/navigation';
import { Fragment, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { store } from './src/state/Store';
import { View } from 'react-native';

export const queryClient = new QueryClient();

export default function App() {
  // load fonts
  const [fontLoaded] = useFonts({
    'Jakarta-Sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Axiforma-Bold': require('./assets/fonts/Axiforma-Bold.ttf'),
  })
  const onLayout = useCallback(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }
  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1 }}
    >
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Fragment>
          <Navigation />
        </Fragment>
      </Provider>
    </QueryClientProvider>
    </View>
  );
}

