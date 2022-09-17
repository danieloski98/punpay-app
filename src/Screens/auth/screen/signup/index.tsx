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

export default function Signup({ navigation }: IProps) {
  const [len, setLen] = React.useState(false);
  const [alpha, setAlpha] = React.useState(false);
  const [sym, setSym] = React.useState(false);
  const [text, setText] = React.useState('');
  const [showPass, setShowPass] =  React.useState(false);

  React.useEffect(() => {
    const aplTextReg = /[a-z,A-Z,0-9]/g
    const symReg = /[#,@,$,%,^,&,*]/g

    if (text.length >= 8) {
      setLen(true);
    } else { 
      setLen(false);
    }

    if (text.match(aplTextReg)) {
      setAlpha(true);
    } else { 
      setAlpha(false);
    }

    if (text.match(symReg)) {
      setSym(true);
    } else { 
      setSym(false);
    }
  }, [text]); 

  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

      <View style={{...Style.text, paddingHorizontal: 20 }}>
        <CustomText variant="subheader">Create Account</CustomText>
        <CustomText variant="bodylight">Getting started is easy</CustomText>
      </View>

      <ScrollView bounces style={{ flex: 1, marginBottom: 0, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
      
      <View style={Style.box}>
        <CustomText variant="body">First Name</CustomText>
        <CustomInput props={{ keyboardType: 'email-address' }} leftElement={<Feather name="user" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">Last Name</CustomText>
        <CustomInput props={{ keyboardType: 'email-address' }} leftElement={<Feather name="user" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">Email</CustomText>
        <CustomInput props={{ keyboardType: 'email-address' }} leftElement={<Feather name="mail" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">Password</CustomText>
        <CustomInput props={{ keyboardType: 'email-address', secureTextEntry: showPass, onChangeText: (e) => setText(e) }} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass(prev => !prev)} name={showPass ? "eye":"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <View style={Style.checkbox}>
          <Checkbox value={alpha} color={theme.colors.primaryColor}  />
          <CustomText variant="bodylight" marginLeft="s">Use alphabets & numbers</CustomText>
        </View>

        <View style={Style.checkbox}>
          <Checkbox value={len} color={theme.colors.primaryColor}  />
          <CustomText variant="bodylight" marginLeft="s">At least 8 characters</CustomText>
        </View>

        <View style={Style.checkbox}>
          <Checkbox value={sym} color={theme.colors.primaryColor}  />
          <CustomText variant="bodylight" marginLeft="s">Use a special character e.g @,#,% etc</CustomText>
        </View>
      </View>

      <View style={Style.btnC}>
        <PrimaryButton text="Submit" action={() => navigation.navigate('verifyemail')} />
      </View>

      <View style={Style.textBox}>
        <CustomText variant="bodylight" textAlign="center" onPress={() => navigation.navigate('login')}>
          Already have an account ?
          <CustomText variant="body" textDecorationLine="underline" marginLeft="s">Login</CustomText>
        </CustomText>
      </View>

      </ScrollView>
     
    </Box>
  )
}