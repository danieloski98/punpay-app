import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../Screens/Dashboard/Home';
import KYC from '../Screens/Dashboard/KYC';
import Settings from '../Screens/Dashboard/Settings';
import TransactionHistory from '../Screens/Dashboard/TransactionHistory';
import TransactionType from '../Screens/Dashboard/TransactionType';
import CryptoPage from '../Screens/Dashboard/CryptoPage';
import SideBar from '../components/Dashboard/Sidebar';
import ChangePassword from '../Screens/Dashboard/ChangePassword';
import ChangePin from '../Screens/Dashboard/ChangePin';

const { Navigator, Screen, Group } = createDrawerNavigator();

export default function DashboardNavigation() {
  return (
    <Navigator drawerContent={({navigation, state}) => <SideBar navigation={navigation} />} screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', borderBottomRightRadius: 10 } }}>
        <Screen name="home" component={Home}/>
        <Screen name="kyc" component={KYC} />
        <Screen name="settings" component={Settings} />
        <Screen name="history" component={TransactionHistory} />
        <Screen name="transactiontype" component={TransactionType} />
        <Screen name="Crypto" component={CryptoPage} />
        <Screen name="changepassword" component={ChangePassword} />
        <Screen name="changepin" component={ChangePin} />
        {/* <Group></Group> */}
    </Navigator>
  )
}