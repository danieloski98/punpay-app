import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthenticationFlow from './Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../state/Store'
import { ActivityIndicator, Alert, StatusBar } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import theme, { darkTheme } from '../style/theme'
import DashboardRoutes from './Dashboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DARKMODE, LOGGEDINSTATES } from '../enums/init.enum'
import useVerifyToken from '../hooks/useVerifyToken'
import * as SplashScreen from 'expo-splash-screen'
// import { Box } from '../components/General'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import Axios from '../utils/api'


const Navigation = () => {
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
  // const { isLoading, isError, data, status } = useVerifyToken()
  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    (async function() {
      const mode = await AsyncStorage.getItem(DARKMODE.DARKMODE);
      const bio = await AsyncStorage.getItem('biometric');

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <StatusBar translucent barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" />
        {!loggedIn && <AuthenticationFlow />}
        {loggedIn && <DashboardRoutes />}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation
