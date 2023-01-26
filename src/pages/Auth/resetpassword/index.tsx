import { View, Text } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, TextInput as CustomInput, PrimaryButton } from '../../../components/General'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Unlock from '../../../res/svg-output/SuccessfullyUnlock'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function ResetPassword({ navigation }: IProps) {
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
        <CustomText variant="subheader">Set New Password</CustomText>
        <CustomText variant="bodylight">Enter your email address to get a code to reset your password</CustomText>
      </View>

      <ScrollView bounces style={{ flex: 1, marginBottom: 0, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
      
      <View style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }}>
        <Unlock width={200} height={200} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">New Password</CustomText>
        <CustomInput name="newPassword" keyboardType='email-address' secureTextEntry={showPass} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass(prev => !prev)} name={showPass ? "eye":"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
      </View>

      <View style={Style.box}>
        <CustomText variant="body">Confirm Password</CustomText>
        <CustomInput name='confirmPassword' keyboardType='email-address' secureTextEntry={showPass} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass(prev => !prev)} name={showPass ? "eye":"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
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
        <PrimaryButton text="Set Password" action={() => navigation.navigate('pin')} />
      </View>

      </ScrollView>
     
    </Box>
  )
}