import 'react-native-gesture-handler';
import React from 'react';
import { RootState, store } from './src/state/Store'
import { Provider } from 'react-redux'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { StatusBar } from 'react-native'

// redux
import { Dispatch } from './src/state/Store'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from './src/navigation';
import { DARKMODE, LOGGEDINSTATES } from './src/enums/init.enum'

// initialization function
function Init() {
  const dispatch = useDispatch<Dispatch>();
  const darkMode = useSelector((state: RootState) => state.isDarkMode);

  // async
  const isLoggedIn = useAsyncStorage(LOGGEDINSTATES.LOGGEDIN);
  const isDarkMode = useAsyncStorage(DARKMODE.DARKMODE);

  // fonts

  const [fontLoaded] = useFonts({
    'Jakarta-Sans': require('./src/res/fonts/PlusJakartaSans-Regular.ttf'),
    'Axiforma-Bold': require('./src/res/fonts/Axiforma-Bold.ttf'),
  })

  React.useEffect(() => {
    
    (async function() {
      const checkLoggedin = await isLoggedIn.getItem();
      const checkDarkMode = await isDarkMode.getItem();

      // if (checkDarkMode === 'true') {
      //   dispatch.isDarkMode.on();
      // } else {
      //   dispatch.isDarkMode.off();
      // }

      if (checkLoggedin === 'true') {
        dispatch.loggedIn.login();
      } else {
        dispatch.loggedIn.logout();
      }
    })()
  }, []);

  React.useEffect(() => {
    (async function() {
      await SplashScreen.preventAutoHideAsync();
      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [fontLoaded])

  if(!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar translucent barStyle={darkMode ? 'light-content':'dark-content'} backgroundColor="transparent" />
      <Navigation />
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
        <Init />
    </Provider>
  );
}
