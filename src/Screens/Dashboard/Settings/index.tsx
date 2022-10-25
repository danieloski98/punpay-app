import { View, Text, Pressable, Switch } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Style } from './style'
import Box from '../../../components/generalComponents/Box'
import CustomText from '../../../components/generalComponents/Text'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'

export default function Settings({ navigation }: any) {
  const [check, setCheck] = React.useState(false);

  const dispatch = useDispatch<Dispatch>();
  const darkMode = useSelector((state: RootState) => state.isDarkMode);


  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

      <Pressable style={Style.header} onPress={() => {navigation.goBack()}}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <CustomText variant="body" marginLeft="s">Back</CustomText>
      </Pressable>

      <View style={Style.imgc}>
        <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'lightgreen'}}></View>
        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
          <CustomText variant="body">Micheal John</CustomText>
          <CustomText variant="bodylight">michael@punpay.io</CustomText>
        </View>
      </View>

      <View style={{ width: '100%', padding: 10, borderRadius: 10, backgroundColor: '#ff88605c'}}>
        <CustomText variant="bodylight">For additional security. In order to change your name and email address contact us at help@punpay.io</CustomText>
      </View>

      <View style={{ flex: 1, paddingBottom: 0 }}>

      <ScrollView style={{ flex: 1, marginTop: 20, marginBottom: 0 }} showsVerticalScrollIndicator={false}>
        
        <Pressable onPress={() => navigation.navigate('link-bank')} style={{ width: '100%', height: theme.button.height, backgroundColor: '#F4F4FB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <CustomText variant="body" style={{ color: '#5149F7' }}>LINK</CustomText>
        </Pressable>

        <View style={{ marginTop: 40 }}>
          <CustomText variant="body">Account Settings</CustomText>

          <Box backgroundColor="mainBackground" style={{...Style.elevatedBtn, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
            <CustomText variant="bodylight">Enable DarkMode</CustomText>
            <Switch onChange={() => {dispatch.isDarkMode.change()}} value={darkMode} />
          </Box>
        </View>

        <View style={{ marginTop: 40 }}>
          <CustomText variant="body">Account Security</CustomText>

          <Box backgroundColor="mainBackground" style={{...Style.elevatedBtn, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
            <CustomText variant="bodylight">Enable Biometrics</CustomText>
            <Switch onChange={() => setCheck(prev => !prev)} value={check} />
          </Box>

          <Pressable onPress={() => {navigation.navigate('changepassword')}} style={{...Style.elevatedBtn, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
            <CustomText variant="bodylight">Change Password</CustomText>
            <Feather name="chevron-right" size={25} color={theme.colors.text}  />
          </Pressable>

          <Pressable  onPress={() => {navigation.navigate('changepin')}} style={{...Style.elevatedBtn, backgroundColor: theme.textInput.backgroundColor, marginTop: 20, marginBottom: 100 }}>
            <CustomText variant="bodylight">Change PIN</CustomText>
            <Feather name="chevron-right" size={25} color={theme.colors.text} />
          </Pressable>
          
        </View>

      </ScrollView>

      </View>
    </Box>
  )
}