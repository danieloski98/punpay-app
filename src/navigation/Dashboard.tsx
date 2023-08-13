import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SideBar from '../components/Dashboard/Sidebar';
import Home from './Home';
import Settings from '../pages/Dashboard/Settings';
import ChangePassword from '../pages/Dashboard/ChangePassword';
import ChangePin from '../pages/Dashboard/ChangePin';
import TransactionHistory from '../pages/Dashboard/TransactionHistory';
import NextOfKin from '../pages/Dashboard/NextOfKin'
import AboutApp from '../pages/Dashboard/About';
import EditDetail from '../pages/Dashboard/Edit';


const {Navigator, Screen} = createDrawerNavigator();
const DashboardRoutes = () => {
  return (
   <Navigator drawerContent={({navigation}) => <SideBar navigation={navigation} />} screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'transparent', borderBottomRightRadius: 10 } }}>
        <Screen name="home" component={Home} />
        <Screen name="settings" component={Settings} />
        <Screen name="history" component={TransactionHistory} />
        <Screen name="changepassword" component={ChangePassword} />
        <Screen name="changepin" component={ChangePin} />
        <Screen name='nextofkin' component={NextOfKin} />
        <Screen name='edit' component={EditDetail} />
       <Screen name='about' component={AboutApp}  />
   </Navigator>
  )
}

export default DashboardRoutes
