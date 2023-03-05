import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
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
import { Box } from '../components/General'
import { useMutation, useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'


const Navigation = () => {
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
  const { isLoading, isError, data, status } = useVerifyToken()
  const dispatch = useDispatch<Dispatch>()

  React.useEffect(() => {
    (async function() {
      if (!isLoading && !isError) {
        const mode = await AsyncStorage.getItem(DARKMODE.DARKMODE);
      const loggedIn = await AsyncStorage.getItem(LOGGEDINSTATES.LOGGEDIN);
      const bio = await AsyncStorage.getItem('biometric');
      if (bio === 'true') {
        dispatch.isBiometricEnabled.on();
      } else {
        dispatch.isBiometricEnabled.off();
      }
      if (loggedIn !== null && loggedIn === 'true') {
        console.log(loggedIn);
        const usr = await AsyncStorage.getItem('user');
        if (usr !== null) {
          dispatch.User.update(JSON.parse(usr));
          dispatch.loggedIn.login();
        }   
      }
      SplashScreen.hideAsync();
      if (mode !== null && mode === 'true') {
        dispatch.isDarkMode.on();
      } else {
        dispatch.isDarkMode.off();
      }
      } else {
        dispatch.loggedIn.logout();
      }
    })()
  }, [isLoading, isError])
  if (isLoading) {
    return (
      <Box style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
        <ActivityIndicator size='large' />
      </Box>
    );
  }
  // if (isError && status === 'error') {
  //   SplashScreen.hideAsync();
  //   dispatch.loggedIn.logout();
  // } 
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <StatusBar translucent barStyle={darkMode ? 'light-content':'dark-content'} backgroundColor="transparent"  />
       {!loggedIn &&  <AuthenticationFlow />}
       {loggedIn && <DashboardRoutes />}
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default Navigation
