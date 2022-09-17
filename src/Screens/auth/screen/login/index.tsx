import { View, Text } from 'react-native'
import React from 'react'
import Box from '../../../../components/generalComponents/Box'
import CustomText from '../../../../components/generalComponents/Text'
import { Style } from './style'
import CustomInput from '../../../../components/generalComponents/TextInput'
import { Feather } from '@expo/vector-icons'
import PrimaryButton from '../../../../components/generalComponents/PrimaryButton'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function Login({ navigation }: IProps) {
  const [text, setText] = React.useState('');
  const [showPass, setShowPass] =  React.useState(false);

  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

      <View style={{...Style.text, paddingHorizontal: 20 }}>
        <CustomText variant="subheader">Login</CustomText>
        <CustomText variant="bodylight">Enter your login details to continue</CustomText>
      </View>

      <ScrollView bounces style={{ flex: 1, marginBottom: 50, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ marginBottom: 50 }}>

      <View style={Style.box}>
        <CustomText variant="body">Email</CustomText>
        <CustomInput props={{ keyboardType: 'email-address' }} leftElement={<Feather name="mail" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">Password</CustomText>
        <CustomInput props={{ keyboardType: 'email-address', secureTextEntry: showPass, onChangeText: (e) => setText(e) }} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass(prev => !prev)} name={showPass ? "eye":"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <CustomText variant="bodylight" textAlign="right" marginTop="m" onPress={() => navigation.navigate('forgotpassword')}>Forgot Password ?</CustomText>

      <View style={Style.btnC}>
        <PrimaryButton text="Submit" action={() => {}} />
      </View>

      <View style={Style.textBox}>
        <CustomText variant="bodylight" textAlign="center" onPress={() => navigation.navigate('signup')}>
          Don't have an account ?
          <CustomText variant="body" textDecorationLine="underline" marginLeft="s">Sign up</CustomText>
        </CustomText>
      </View>

      </ScrollView>
     
    </Box>
  )
}