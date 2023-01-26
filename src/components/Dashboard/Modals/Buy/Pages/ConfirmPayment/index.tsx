import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import { Ionicons } from '@expo/vector-icons'
import USDT from '../../../../../../res/svg-output/Usdt';
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { Feather } from '@expo/vector-icons'

const ConfirmPaymentPage = () => {
  const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Confirm Payment</CustomText>
      <CustomText variant="body">We are confirming the payment you made. This will take a few minutes</CustomText>

      <View style={[Style.accountContainer, { borderBottomColor: theme.textInput.backgroundColor }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>PUNPAY-ACCOUNT</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} />
        </View>

        <CustomText variant="body" mt="s">121232244</CustomText>
        <CustomText variant="body" mt="s">WEMA BANK</CustomText>

      </View>

      <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="check" size={20} color="white" />
            </View>
            <CustomText variant="bodylight" ml="m">Payment Processing</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: theme.textInput.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Feather name="check" size={20} color="white" /> */}
            </View>
            <CustomText variant="bodylight" ml="m">Payment Recieved</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: theme.textInput.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Feather name="check" size={20} color="white" /> */}
            </View>
            <CustomText variant="bodylight" ml="m">Crypto Payout Sent</CustomText>
        </View>
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


      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Reference Code</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="body" mr="m">872837T7829299202202</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton text='Contact Support' action={() => {}} />
      </View>
    </View>
  )
}

export default ConfirmPaymentPage