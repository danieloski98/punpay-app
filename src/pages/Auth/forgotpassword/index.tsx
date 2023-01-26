import { View, Text } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, PrimaryButton, TextInput } from '../../../components/General'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function ForgotPassword({ navigation }: IProps) {
  const [text, setText] = React.useState('');
  const [showPass, setShowPass] =  React.useState(false);

  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

      <View style={{...Style.text, paddingHorizontal: 20 }}>
        <CustomText variant="subheader">Forgot Password</CustomText>
        <CustomText variant="bodylight">Enter your email address to get a code to reset your password</CustomText>
      </View>

      <ScrollView bounces style={{ flex: 1, marginBottom: 50, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ marginBottom: 50 }}>

      <View style={Style.box}>
        <TextInput name="email" label='Email' keyboardType='email-address' leftElement={<Feather name="mail" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.btnC}>
        <PrimaryButton text="Continue" action={() => navigation.navigate('resetcode')} />
      </View>

      </ScrollView>
     
    </Box>
  )
}