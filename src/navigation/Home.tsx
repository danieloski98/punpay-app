import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../Screens/Dashboard/Home';
import KYC from '../Screens/Dashboard/KYC';
import CryptoPage from '../Screens/Dashboard/CryptoPage';
import TransactionType from '../Screens/Dashboard/TransactionType';

const { Navigator, Screen } = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="index" component={Home} />
        <Screen name="kyc" component={KYC} />
        <Screen name="crypto" component={CryptoPage} />
        <Screen name="transactiontype" component={TransactionType} />
    </Navigator>
  )
}