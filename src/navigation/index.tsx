import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
import AuthenticationFlow from './Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../state/Store'
import { StatusBar } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import theme, { darkTheme } from '../style/theme'
import DashboardRoutes from './Dashboard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DARKMODE, LOGGEDINSTATES } from '../enums/init.enum'

const Navigation = () => {
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
  const dispatch = useDispatch<Dispatch>()
  React.useEffect(() => {
    (async function() {
      const mode = await AsyncStorage.getItem(DARKMODE.DARKMODE);
      const loggedIn = await AsyncStorage.getItem(LOGGEDINSTATES.LOGGEDIN);
      if (loggedIn !== null && loggedIn === 'true') {
        console.log(loggedIn);
        dispatch.loggedIn.login();
      }
      dispatch.isDarkMode.change(mode !== null && mode === 'true' ? true:false, '');
    })()
  }, [])
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
