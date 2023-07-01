import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../utils/api'
import CustomText from '../../../General/Text'


export default function HomeNavbar() {
    const navigation = useNavigation<any>();
    const theme = useTheme<Theme>();
    const [count, setCount] = React.useState(0)

    const { isLoading, error, data } = useQuery(['getNotifications'], () => Axios.get('/notification/user'), {
      // refetchInterval: 1000,
      onSuccess: (data) => {
        setCount(data.data.data.length);
        console.log(data.data);
      }
    });

  return (
    <View style={{...Style.parent, backgroundColor: theme.colors.modalBg, paddingBottom: 10,}}>
      <Feather name="menu" size={25} color={theme.colors.text} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) } />
      <View style={Style.rightSide}>
        <Feather name="settings" size={25} color={theme.colors.text} onPress={() => navigation.navigate('settings')} />
       <View style={{
        position: 'relative'
       }}>
        <View style={{ flexDirection: 'row', width: 50 }}>
          <Ionicons name="notifications" size={25} color={theme.colors.text} style={{ marginLeft: 20}} onPress={() => navigation.navigate('notification')} />
          {!isLoading && count > 0 && (
            <View style={{ position: 'absolute', padding: 4, borderRadius: 100, right: -2, top: -10, bottom: 1 }}>
              <CustomText variant='body'>{count > 10 ? '9+': count}</CustomText>
            </View>
          )}
        </View>
       </View>
      </View>
    </View>
  )
}