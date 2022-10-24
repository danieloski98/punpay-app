import { View, Text, Pressable, TextInput } from 'react-native'
import { Style } from './style'
import React from 'react'
import CustomText from '../../../../../generalComponents/Text'
import BorderButton from '../../../../../generalComponents/BorderButton'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import PrimaryButton from '../../../../../generalComponents/PrimaryButton'

interface IProps {
    changeStep: React.Dispatch<React.SetStateAction<number>>;
}

const VerificationPage: React.FC<IProps> = ({ changeStep}) => {
    const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <Pressable onPress={() => changeStep(prev => prev - 1)} style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="chevron-left" size={20} color={theme.colors.text} />
        <CustomText variant="bodylight" ml="s">Go Back</CustomText>
      </Pressable>

      <CustomText variant="subheader" textAlign="center" mt="m" style={{ fontSize: 20 }}>CONFIRM TRANSACTION</CustomText>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>OTP Sent To Email</CustomText>
        <View style={{ width: '100%', backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10 }}>
            <TextInput keyboardType="number-pad" style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
            <View style={{ width: '30%', height: '100%' }}>
                <BorderButton text='Send OTP' action={() => {}}  />
            </View>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>PIN</CustomText>
        <View style={{ width: '100%', height: 80, backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10 }}>
            <TextInput placeholder='Enter PIN' secureTextEntry keyboardType="number-pad" style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Continue' action={() => changeStep(3)}  />
      </View>
    </View>
  )
}

export default VerificationPage