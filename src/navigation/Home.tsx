import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../pages/Dashboard/Home'
import LinkBank from '../pages/Dashboard/LinkBank'

const { Navigator, Screen } = createNativeStackNavigator()

const Home = () => {
  return (
   <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='index' component={HomePage} />
        <Screen name="link-bank" component={LinkBank} />
   </Navigator>
  )
}

export default Home
