import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../pages/Dashboard/Home'
import LinkBank from '../pages/Dashboard/LinkBank'
import Notifications from '../pages/Dashboard/Notifications'
import KYC from '../pages/Dashboard/KYC';
import TransactionType from '../pages/Dashboard/TransactionType'
import CryptoPage from '../pages/Dashboard/CryptoPage'
import Pin from '../pages/Auth/Pin';


const { Navigator, Screen } = createNativeStackNavigator()

const Home = () => {
  return (
   <Navigator screenOptions={{ headerShown: false }} initialRouteName='pin'>
        <Screen name='index' component={HomePage} />
        <Screen name="link-bank" component={LinkBank} />
        <Screen name="notification" component={Notifications} />
        <Screen name="kyc" component={KYC} />
        <Screen name="transactiontype" component={TransactionType} />
        <Screen name="crypto" component={CryptoPage} />
        <Screen name="pin" component={Pin} options={{ presentation: 'modal' }} />
   </Navigator>
  )
}

export default Home
