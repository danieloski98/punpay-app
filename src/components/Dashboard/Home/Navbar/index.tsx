import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import { useNavigation, DrawerActions } from '@react-navigation/native'

export default function HomeNavbar() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    // console.log(navigation);

  return (
    <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor }}>
      <Feather name="menu" size={25} color={theme.colors.text} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) } />
      <View style={Style.rightSide}>
        <Feather name="settings" size={25} color={theme.colors.text} onPress={() => navigation.navigate('settings')} />
        <Feather name="maximize" size={25} color={theme.colors.text} style={{ marginLeft: 20}} />
      </View>
    </View>
  )
}