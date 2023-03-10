import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { getUnreadNotificationInboxCount } from 'native-notify';
import CustomText from '../../../General/Text'

export default function HomeNavbar() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    const [unreadNotificationCount, setUnreadNotificationCount] = React.useState(0);

    React.useEffect(() => {
      (async function() {
        let unreadCount = await getUnreadNotificationInboxCount(6405, 'JhIbh6BDeO8Z5mEBHU50Dh');
        console.log("unreadCount: ", unreadCount);
        setUnreadNotificationCount(unreadCount);
      })()
    }, [])

  return (
    <View style={{...Style.parent, backgroundColor: '#722f94' }}>
      <StatusBar barStyle='light-content' />
      <Feather name="menu" size={25} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) } />
      <View style={Style.rightSide}>
        <Feather name="settings" size={25} color='white' onPress={() => navigation.navigate('settings')} />
       <View style={{
        position: 'relative'
       }}>
        {unreadNotificationCount > 0 && <View style={{ position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: theme.colors.primaryColor, left: 35, bottom: 15, justifyContent: 'center', alignItems: 'center' }} >
          <CustomText variant='xs'>{unreadNotificationCount}</CustomText>
        </View>}
        <Ionicons name="notifications" size={25} color='white' style={{ marginLeft: 20}} onPress={() => navigation.navigate('notification')} />
       </View>
      </View>
    </View>
  )
}