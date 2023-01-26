import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import { Ionicons } from '@expo/vector-icons'
import USDT from '../../../../../../res/svg-output/Usdt';

interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
}

const AwaitingPaymentPage = ({ next }: IProps) => {
  const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Awaiting Payment</CustomText>
      <CustomText variant="body">Send payment to the account below</CustomText>

      <View style={[Style.accountContainer, { borderBottomColor: theme.textInput.backgroundColor }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>PUNPAY-ACCOUNT</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} />
        </View>

        <CustomText variant="body" mt="s">121232244</CustomText>
        <CustomText variant="body" mt="s">WEMA BANK</CustomText>

      </View>

      <CustomText variant="body" mt="m">Amount</CustomText>
      <CustomText variant="subheader" mt="m">N140,000</CustomText>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>

        <View style={{ flex: 1 }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>You'll Recieve</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <USDT width={30} height={30} />
            <CustomText variant="subheader" mx="s" style={{ fontSize: 18 }}>200</CustomText>
            <CustomText variant="body">USDT</CustomText>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>You'll Recieve</CustomText>
          <CustomText variant="body">N710/$1</CustomText>
        </View>

      </View>

      <View style={{ padding: 10, backgroundColor: '#ff886049', borderRadius: 10, marginTop: 20 }}>
          <CustomText variant="bodylight">
          Please make sure you add the reference code in the transaction description  below to enable us track your transaction faster
          </CustomText>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Reference Code</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="body" mr="m">872837T7829299202202</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton text='I have made payment' action={() => next(3)} />
      </View>
    </View>
  )
}

export default AwaitingPaymentPage