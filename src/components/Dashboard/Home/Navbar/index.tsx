import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'


export default function HomeNavbar() {
    const navigation = useNavigation<any>();
    const theme = useTheme<Theme>()

  return (
    <View style={{...Style.parent, backgroundColor: theme.colors.primaryColor }}>
      <Feather name="menu" size={25} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) } />
      <View style={Style.rightSide}>
        <Feather name="settings" size={25} color='white' onPress={() => navigation.navigate('settings')} />
       <View style={{
        position: 'relative'
       }}>
        <Ionicons name="notifications" size={25} color='white' style={{ marginLeft: 20}} onPress={() => navigation.navigate('notification')} />
       </View>
      </View>
    </View>
  )
}