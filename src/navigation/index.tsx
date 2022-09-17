import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import theme, { darkTheme } from '../style/theme'
import AuthenticationNavigation from './Authentication';
import DashboardRoute from './Dashboard'

// redux 
import { useSelector } from 'react-redux'
import { RootState } from '../state/Store'


const App: React.FC = () => {
    const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
    const isLoggedIn = useSelector((state: RootState) => state.loggedIn);
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
            <NavigationContainer>
                {!isLoggedIn && (<AuthenticationNavigation />)}
                {isLoggedIn && (<DashboardRoute />)}
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default App;