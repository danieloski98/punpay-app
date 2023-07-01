import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import { Ionicons } from '@expo/vector-icons'
import USDT from '../../../../../../res/svg-output/Usdt';
import { Text as CustomText, PrimaryButton } from '../../../../../General'
import { Feather } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import useIcons from '../../../../../../hooks/useIcons'
import { RootState } from '../../../../../../state/Store'
import { State, useBuyState } from '../../State'
import * as Clipboard from 'expo-clipboard';
import { useToast } from "react-native-toast-notifications";
import { currencyFormat } from '../../../../../../utils/currencyconverter'
import Axios from '../../../../../../utils/api'
import { useQuery } from '@tanstack/react-query'
import { openURL } from 'expo-linking'
const randomNumber = require('random-number');


interface IProps {
}

const ConfirmPaymentPage = () => {
  const toast = useToast();
  const transaction = useBuyState((state) => state);

  const { data, isLoading } = useQuery(['getTrans'], () => Axios.get(`/transaction/single/user/${transaction.transactionId}`), {
    refetchInterval: 2000,
    onError: (error: any) => {
      Alert.alert('Error', error)
    },
    onSuccess: (data: any) => {
      if (data.data.data.status >= 1) {
        
      }
    
    }
  })
  const copyAccount = async () => {
    await Clipboard.setStringAsync(`BankName-${transaction.bank?.name}, AccountNumber-${transaction.bank?.accountName} AccoutName:-${transaction.bank?.accountNumber}`);
    toast.show('Account Details copied!', {
      type: 'success',
      icon: <Ionicons name='add' size={10} />
    });
  }

  const copyReference = async () => {
    await Clipboard.setStringAsync(transaction.referenceCode);
    toast.show('Reference code copied!', {
      type: 'success',
      icon: <Ionicons name='add' size={10} />
    });
  }
  const theme = useTheme<Theme>()
  const coin = useSelector((state: RootState) => state.Coin);
  const { getIcon, getShortName } = useIcons()
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Processing Payment</CustomText>
      <CustomText variant="body">We are confirming the payment you made. This will take a few minutes</CustomText>

      <View style={[Style.accountContainer, { borderBottomColor: theme.textInput.backgroundColor }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>{transaction.bank?.accountName || ''}</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} onPress={copyAccount} />
        </View>

        <CustomText variant="body" mt="s">{transaction.bank?.accountNumber || ''}</CustomText>
        <CustomText variant="body" mt="s">{transaction.bank?.name || ''}</CustomText>

      </View>

      <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor: !isLoading && data.data?.data.status >= 1 ? theme.colors.primaryColor:theme.textInput.backgroundColor , justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="check" size={20} color='white' />
          </View>
          <CustomText variant="bodylight" ml="m">Payment Processing</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor:  !isLoading && data.data?.data.status >= 2 ? theme.colors.primaryColor:theme.textInput.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="check" size={20} color="white" />
          </View>
          <CustomText variant="bodylight" ml="m">Payment Recieved</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor:  !isLoading && data.data?.data.status >= 3 ? theme.colors.primaryColor:theme.textInput.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="check" size={20} color="white" />
          </View>
          <CustomText variant="bodylight" ml="m">Crypto Payout Sent</CustomText>
        </View>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View style={{ width: 30, height: 30, borderRadius: 25, backgroundColor:  !isLoading && data.data?.data.status >= 2 ? theme.colors.primaryColor:theme.textInput.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="check" size={20} color="white" />
          </View>
          <CustomText variant="bodylight" ml="m">Crypto Payout Sent</CustomText>
        </View> */}
      </View>

      <CustomText variant="body" mt="m">Amount</CustomText>
      <CustomText variant="subheader" mt="m">N{currencyFormat(parseInt(transaction.transactionAmount))}</CustomText>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>

        <View style={{ flex: 1 }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>You'll Recieve</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {getIcon(coin, 20)}
            <CustomText variant="subheader" mx="s" style={{ fontSize: 18 }}>{transaction.payoutAmount}</CustomText>
            <CustomText variant="body">{getShortName(coin as any)}</CustomText>
          </View>
        </View>

        {/* <View style={{ flex: 1 }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>You'll Recieve</CustomText>
          <CustomText variant="body">N710/$1</CustomText>
        </View> */}

      </View>


      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Reference Code</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="body" mr="m">{transaction.referenceCode}</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} onPress={copyReference} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton text='Contact Support' action={async() => await openURL('https://wa.me/message/LX3XCNXKYMVVK1')} />
      </View>
    </View>
  )
}

export default ConfirmPaymentPage