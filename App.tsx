import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {Provider } from 'react-redux';
import Navigation from './src/navigation';
import { Fragment, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { store } from './src/state/Store';
import { Alert, View } from 'react-native';
import * as Updates from 'expo-updates';
import React from 'react';
import registerNNPushToken from 'native-notify';
import { ToastProvider } from 'react-native-toast-notifications'

export const queryClient = new QueryClient();

export default function App() {
  registerNNPushToken(6405, 'JhIbh6BDeO8Z5mEBHU50Dh');
  // load fonts
  const [fontLoaded] = useFonts({
    'Jakarta-Sans': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Axiforma-Bold': require('./assets/fonts/Axiforma-Bold.ttf'),
  })

  // React.useEffect(() => {
  //   Updates.checkForUpdateAsync()
  //   .then((data) => {
  //     if (data.isAvailable) {
  //       Alert.alert('Update', 'An update is available')
  //       Updates.fetchUpdateAsync()
  //       .then((data) => {
  //         data.isNew
  //       })
  //     }
  //   })
  // }, [])
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
      <ToastProvider>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Fragment>
          <Navigation />
        </Fragment>
      </Provider>
    </QueryClientProvider>
      </ToastProvider>
    </View>
  );
}

