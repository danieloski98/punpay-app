import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style } from './style'
import Box from '../../../components/generalComponents/Box'
import CustomText from '../../../components/generalComponents/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import { Feather } from '@expo/vector-icons'
import CustomInput from '../../../components/generalComponents/TextInput'
import Checkbox from 'expo-checkbox'
import PrimaryButton from '../../../components/generalComponents/PrimaryButton'


export default function ChangePassword({ navigation }: any) {
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

  const dispatch = useDispatch<Dispatch>();
  const darkMode = useSelector((state: RootState) => state.isDarkMode);

  const theme = useTheme<Theme>();
  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

      <Pressable style={Style.header} onPress={() => {navigation.goBack()}}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <CustomText variant="body" marginLeft="s">Back</CustomText>
      </Pressable>

      <View>
        <View style={Style.box}>
          <CustomText variant="body" marginBottom="s">Old Password</CustomText>
          <CustomInput  props={{ keyboardType: 'email-address' }} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather  name={"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={Style.box}>
          <CustomText variant="body" marginBottom="s">New Password</CustomText>
          <CustomInput  props={{ keyboardType: 'email-address' }} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather  name={"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
        </View>
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

      <View style={{ marginTop: 20 }}>
        <View style={Style.box}>
          <CustomText variant="body" marginBottom="s">Confirm Password</CustomText>
          <CustomInput  props={{ keyboardType: 'email-address' }} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather  name={"eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
        </View>
      </View>

      <View style={Style.btnC}>
        <PrimaryButton text="Update Password" action={() => navigation.navigate('verifyemail')} />
      </View>

    </Box>
  )
}