import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticationFlow from './Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../state/Store'
import { ActivityIndicator, Alert, StatusBar, useWindowDimensions, Image } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import theme, { darkTheme } from '../style/theme'
import DashboardRoutes from './Dashboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DARKMODE, LOGGEDINSTATES } from '../enums/init.enum'
import useVerifyToken from '../hooks/useVerifyToken'
import * as SplashScreen from 'expo-splash-screen'
import * as Updates from 'expo-updates';
import { Box, Box as View } from '../components/General'
import useNetwork from '../hooks/useNetwork'
import { showMessage } from 'react-native-flash-message'
import CustomText from '../components/General/Text'

// import { Box } from '../components/General'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import Axios from '../utils/api'


const Navigation = () => {
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
  const { isConnected } = useNetwork();
  // const { isLoading, isError, data, status } = useVerifyToken()
  const dispatch = useDispatch<Dispatch>();
  const height = useWindowDimensions().height;

  const checkForUpdates = React.useCallback(async() => {
      try {
          const update = await Updates.checkForUpdateAsync();
    
          if (update.isAvailable) {
              Alert.alert('Update Availabe', 'Seems like you have an update. Would you like to update now?', [
                  {text: 'No', onPress: () => {}, },
                  {text: 'Yes', onPress: async() => {
                      await Updates.fetchUpdateAsync();
                      await Updates.reloadAsync();
                  }, }
              ]);          
          } else {
            return
          }
        } catch (error) {
          // You can also add an alert() to see the error message in case of an error when fetching updates.
          // Alert.alert(`Error fetching latest Expo update:`, `${error}`, [
          //     {text: 'No', onPress: () => {}, },
          //     {text: 'Yes', onPress: async() => {
          //         // await Updates.fetchUpdateAsync();
          //         // await Updates.reloadAsync();
          //     }, }
          // ]);
        }
  }, []);

  React.useEffect(() => {
    (async function() {
      const mode = await AsyncStorage.getItem(DARKMODE.DARKMODE);
      const bio = await AsyncStorage.getItem('biometric');

      checkForUpdates();

      // check if they have bio metric enabled
      if (bio === 'true') {
        dispatch({ type: 'isBiometricEnabled/on' })
      } else {
        dispatch({ type: 'isBiometricEnabled/off' })
      }
      // check if they have dark mode enabled
      if (mode === 'true') {
        dispatch({ type: 'isDarkMode/on' });
      } else {
        dispatch({ type: 'isDarkMode/off' });
      }
      dispatch({ type: 'loggedIn/logout' });
      SplashScreen.hideAsync()
      
    })()
  }, [])

  React.useEffect(() => {
    if (isConnected && loggedIn) {
      showMessage({
        message: 'You are connected to the internet.',
        description: 'You are now connected to the internet',
        animated: true,
        statusBarHeight: 20,
        backgroundColor: 'green',
        floating: false,
        duration: 4000,
        autoHide: true,
      });
    }
    if (!isConnected && loggedIn) {
      showMessage({
        message: 'No Internet connection',
        description: 'You are currently nott connected to the internet',
        animated: true,
        statusBarHeight: 20,
        backgroundColor: 'red',
        floating: false,
        duration: 1000,
        autoHide: false,
    });
    }
  }, [isConnected])

  if (!isConnected) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <StatusBar translucent barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" />
        <Box backgroundColor='mainBackground' flex={1} height={height} justifyContent='center' alignItems='center'>
          <Image source={require('../../assets/noi.jpg')} resizeMode='cover' style={{ width: 200, height: 200 }} />
          <CustomText variant='body'>NO INTERNET CONNECTION!</CustomText>
        </Box>
      </NavigationContainer>
    </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <StatusBar translucent barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" />
        {!loggedIn && <AuthenticationFlow />}
        {loggedIn && <DashboardRoutes />}
        {/* <View style={{ width:'100%', height: 50, backgroundColor: 'transparent', position: 'absolute', bottom: 0  }}>

        </View> */}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation
