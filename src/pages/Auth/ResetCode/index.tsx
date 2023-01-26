import { View, TextInput } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, PrimaryButton } from '../../../components/General'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function ResetCode({ navigation }: IProps) {
  

  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

      <View style={{...Style.text, paddingHorizontal: 20 }}>
        <CustomText variant="subheader">Enter reset code</CustomText>
        <CustomText variant="bodylight">We sent a 5 digit code to your email - Luigiajah@gmail.com</CustomText>
      </View>

      <ScrollView bounces style={{ flex: 1, marginBottom: 50, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ marginBottom: 50 }}>
      
      <View style={Style.box}>
        <TextInput style={{...Style.inbox, backgroundColor: theme.textInput.backgroundColor, color: theme.colors.text }} />
        <TextInput style={{...Style.inbox, backgroundColor: theme.textInput.backgroundColor, color: theme.colors.text }} />
        <TextInput style={{...Style.inbox, backgroundColor: theme.textInput.backgroundColor, color: theme.colors.text }} />
        <TextInput style={{...Style.inbox, backgroundColor: theme.textInput.backgroundColor, color: theme.colors.text }} />
        <TextInput style={{...Style.inbox, backgroundColor: theme.textInput.backgroundColor, color: theme.colors.text }} />
      </View>


      <View style={Style.btnC}>
        <PrimaryButton text="Continue" action={() => navigation.navigate('resetpassword')} />
      </View>

      <View style={Style.textBox}>
        <CustomText variant="bodylight" textAlign="center" onPress={() => navigation.navigate('login')}>
          Resend Code
        </CustomText>
      </View>

      </ScrollView>
     
    </Box>
  )
}