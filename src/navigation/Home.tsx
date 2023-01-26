import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../pages/Dashboard/Home'

const { Navigator, Screen } = createNativeStackNavigator()

const Home = () => {
  return (
   <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='index' component={HomePage} />
   </Navigator>
  )
}

export default Home
