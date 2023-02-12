import { View, Text, Pressable, TextInput } from 'react-native'
import { Style } from './style'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import {Text as CustomText, PrimaryButton, BorderButton } from '../../../../../General'

interface IProps {
    changeStep: () => void;
    goBack: () => void;
}

const VerificationPage = ({ changeStep, goBack}: IProps) => {
    const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <Pressable onPress={() => goBack() } style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="chevron-left" size={20} color={theme.colors.text} />
        <CustomText variant="bodylight" ml="s">Go Back</CustomText>
      </Pressable>

      <CustomText variant="subheader" textAlign="center" mt="m" style={{ fontSize: 20 }}>CONFIRM TRANSACTION</CustomText>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>OTP Sent To Email</CustomText>
        <View style={{ width: '100%', backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10, height: 55 }}>
            <TextInput keyboardType="number-pad" placeholderTextColor={theme.colors.text} style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
            <View style={{ width: '30%', height: '100%' }}>
                <BorderButton text='Send OTP' action={() => {}} height='100%'  />
            </View>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>PIN</CustomText>
        <View style={{ width: '100%', height: 55, backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10 }}>
            <TextInput placeholder='Enter PIN' secureTextEntry keyboardType="number-pad" placeholderTextColor={theme.colors.text} style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Continue' action={() => changeStep()}  />
      </View>
    </View>
  )
}

export default VerificationPage