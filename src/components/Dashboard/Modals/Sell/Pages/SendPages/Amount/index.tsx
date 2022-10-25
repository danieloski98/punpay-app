import { View, TextInput } from 'react-native'
import React from 'react'
import { Style } from './style'
import CustomText from '../../../../../../generalComponents/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../../style/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import PrimaryButton from '../../../../../../generalComponents/PrimaryButton'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
}

const SendAmountPage: React.FC<IProps> = ({ change }) => {
    const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Send BTC</CustomText>
      <CustomText variant="bodylight">Transfer coins to another wallet</CustomText>

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 15 }}>Enter Amount</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <CustomText variant="subheader" style={{ fontSize: 16 }}>BTC</CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CustomText variant="body" style={{ fontSize: 15 }}>They'll recieve </CustomText>
            <CustomText variant="subheader" style={{ fontSize: 14 }} mt="s">NGN0.00</CustomText>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 15 }}>Recipient Address</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <Ionicons name="scan-outline" size={25} color={theme.colors.text} />
        </View>
      </View>

      <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Please insure the address is correct to avoid losing your funds</CustomText>
      </View>

      <View style={{ marginTop: 40 }}>
        <PrimaryButton text='Continue' action={() => change(2)} />
      </View>

    </View>
  )
}

export default SendAmountPage