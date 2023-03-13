import { View, Text, Pressable, Switch, Image, Alert, RefreshControl } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Style } from './style'
import { Box, Text as CustomText } from '../../../components/General'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { DarkModeAtom } from '../../../state/states'
import { atom, useAtom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGGEDINSTATES, DARKMODE } from '../../../enums/init.enum'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import ElevatedComponent from '../../../components/Dashboard/Settings/SwitchComponent'
import LinkBankButton from '../../../components/Dashboard/Settings/LinkBankButton'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../../../utils/api'

export default function Settings({ navigation }: any) {
  const [check, setCheck] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const user = useSelector((state: RootState) => state.User);
  const bio = useSelector((state: RootState) => state.isBiometricEnabled)
  const dispatch = useDispatch<Dispatch>();
  const queryClient = useQueryClient();

  const triggerDarkMode = async () => {
    dispatch({ type: 'isDarkMode/change' })
    await AsyncStorage.setItem(DARKMODE.DARKMODE, darkMode ? 'false':'true');
  }

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    queryClient.invalidateQueries()
    .then(() => {
      setLoading(false);
    });
  }, [])

  const triggerBiometrics = async () => {
    dispatch.isBiometricEnabled.change(null, null)
    
    await AsyncStorage.setItem('biometric', bio ? 'true':'false');
  }
  const theme = useTheme<Theme>();

  React.useEffect(() => {
    (async function(){
      const pin = await AsyncStorage.getItem('PIN');
      const biometeric = await AsyncStorage.getItem("biometric");
      if (biometeric !== null && biometeric === 'true') {
        setCheck(true);
      }
      if (pin === null || pin === 'false') {
        setCheck(false);
      } if(pin !== null) {
        setCheck(pin === 'true' ? true:false);
      }
    })()
  }, [])

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

      <Pressable style={Style.header} onPress={() => {navigation.navigate('index')}}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <CustomText variant="body" marginLeft="s" style={{ marginBottom: 4 }}>Back</CustomText>
      </Pressable>

      <View style={Style.imgc}>
        <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <Image source={{ uri: `https://api.dicebear.com/5.x/bottts/png?seed=${user.email}` }} style={{ width: '80%', height: '80%'}} />
        </View>
        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
          <CustomText variant="body">{user.firstName} {user.lastName}</CustomText>
          <CustomText variant="bodylight">{user.email}</CustomText>
        </View>
      </View>

      <View style={{ width: '100%', padding: 10, borderRadius: 10, backgroundColor: '#ff88605c'}}>
        <CustomText variant="bodylight">For additional security. In order to change your name and email address contact us at help@punpay.co</CustomText>
      </View>

      <View style={{ flex: 1, paddingBottom: 0 }}>

      <ScrollView 
      refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}
      style={{ flex: 1, marginTop: 20, marginBottom: 0 }} showsVerticalScrollIndicator={false}>
        
        <LinkBankButton />

        <View style={{ marginTop: 40 }}>
          <CustomText variant="body">Account Settings</CustomText>
          <ElevatedComponent title="Enable DarkMode" type="SWITCH" onChange={() => triggerDarkMode()} isChecked={darkMode} />
        </View>

        <View style={{ marginTop: 40 }}>
          <CustomText variant="body">Account Security</CustomText>

          {/* <ElevatedComponent title="Enable Biometrics" type="SWITCH" onChange={() => triggerBiometrics()} isChecked={bio} /> */}
          <ElevatedComponent title="Change Password" type="LINK" link='changepassword' />
          <ElevatedComponent title="Change PIN" type="LINK" link='changepin' />
          <ElevatedComponent title="Next Of Kin" type="LINK" link='nextofkin' />

          <Box marginTop='xl' />

        </View>

      </ScrollView>

      </View>
    </Box>
  )
}