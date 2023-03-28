import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import useIcons from '../../../../../../hooks/useIcons'
import { State } from '../../State'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../../../../utils/api'
import { currencyFormat } from '../../../../../../utils/currencyconverter'
import * as Clipboard from 'expo-clipboard';
import { useToast } from 'react-native-toast-notifications'


interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
  state: State
}

const AwaitingPaymentPage = ({ next, state }: IProps) => {
  const theme = useTheme<Theme>()
  const toast = useToast();
  const coin = useSelector((state: RootState) => state.Coin);
  const { getIcon, getShortName } = useIcons();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => Axios.put(`/transaction/${state.transactionId}`),
    onSuccess: () => {
      Alert.alert('Transaction status updated');
      next(4)
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  const handlePress = React.useCallback(() => {
    mutate();
  }, [state]);

  const copyAccount = async () => {
    await Clipboard.setStringAsync(`BankName-${state.bank?.name}, AccountNumber-${state.bank?.accountName} AccoutName:-${state.bank?.accountNumber}`);
    toast.show('Account Details copied!', {
      type: 'success',
      icon: <Ionicons name='add' size={10} />
    });
  }

  const copyReference = async () => {
    await Clipboard.setStringAsync(state.referenceCode);
    toast.show('Reference code copied!', {
      type: 'success',
      icon: <Ionicons name='add' size={10} />
    });
  }

  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Awaiting Payment</CustomText>
      <CustomText variant="body">Send payment to the account below</CustomText>

      <View style={[Style.accountContainer, { borderBottomColor: theme.textInput.backgroundColor }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>{state.bank?.accountName || ''}</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} onPress={copyAccount} />
        </View>

        <CustomText variant="body" mt="s">{state.bank?.accountNumber || ''}</CustomText>
        <CustomText variant="body" mt="s">{state.bank?.name || ''}</CustomText>

      </View>

      <CustomText variant="body" mt="m">Amount</CustomText>
      <CustomText variant="subheader" mt="m">N{currencyFormat(state.transactionAmount)}</CustomText>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>

        <View style={{ flex: 1 }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>You'll Recieve</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {getIcon(coin, 20)}
            <CustomText variant="subheader" mx="s" style={{ fontSize: 18 }}>{state.payoutAmount}</CustomText>
            <CustomText variant="body">{getShortName(coin as any)}</CustomText>
          </View>
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
          <CustomText variant="body" mr="m">{state.referenceCode}</CustomText>
          <Ionicons name="copy-outline" size={30} color={theme.colors.text} onPress={copyReference} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <PrimaryButton text='I have made payment' action={handlePress} isLoading={isLoading} />
      </View>
    </View>
  )
}

export default AwaitingPaymentPage