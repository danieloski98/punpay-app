import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
import AuthenticationFlow from './Authentication'
import { useSelector } from 'react-redux'
import { RootState } from '../state/Store'
import { StatusBar } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import theme, { darkTheme } from '../style/theme'
import DashboardRoutes from './Dashboard'

const Navigation = () => {
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
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
