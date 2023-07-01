import { View, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native'
import { Style } from './style'
import React from 'react'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import Bank from '../../../../../../res/svg-output/Bank'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import useIcons, { Coin } from '../../../../../../hooks/useIcons'
import useGetRate from '../../../../../../hooks/useGetRate';
import { useNavigation } from '@react-navigation/native'
import { Action } from '../../state'
import { currencyFormat } from '../../../../../../utils/currencyconverter'
import uuid from 'react-native-uuid';
import Axios from '../../../../../../utils/api'
import { useQuery } from '@tanstack/react-query'


interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<Action>,
  coinUSDValue: string;
}

const AmountPage = ({ change, dispatch, coinUSDValue }: IProps) => {
    const [ha, setHa] = React.useState(false);
    const [amount, setAmount] = React.useState('0');
    const theme = useTheme<Theme>();
    const coin = useSelector((state: RootState) => state.Coin);
    const bank = useSelector((state: RootState) => state.Bank);
    const user = useSelector((state: RootState) => state.User);
    const {getShortName} = useIcons();
    const navigation= useNavigation<any>();
    // get rate
    const { isLoading, data } = useGetRate({ currency: getShortName(coin as any), transactionType: 'buy' })

        // get the users coin details
        const { isLoading: CoinDetailsLoading , data: coinData, isError } = useQuery(['getCoinSend'], () => Axios.get(`/user/wallet/${getShortName(coin as any)}`), {
          refetchOnMount: true,
          onSuccess: (data) => {
            console.log(data.data)
          },
          onError: (error) => {
            Alert.alert('An error occured');
          }
        })

        const { isLoading: feeLoading , data: feeData, isError: feeHasError } = useQuery(['getWithdrawalFeesSend'], () => Axios.get(`/transaction/withdrawal-fee/${getShortName(coin as any)}?quidax=${true}`), {
          refetchOnMount: true,
          onSuccess: (data) => {
            console.log(data.data.data)
          },
          onError: (error) => {
            Alert.alert('An error occured');
          }
        })


    const handleconversion = React.useCallback(() => {
      if (coin === 'Tether' || coin === 'BUSD') {
        return data.data.rate * parseFloat(amount);
      }
      const usd = parseFloat(coinUSDValue) * parseFloat(amount);
      return usd * data.data.rate < 1 ? 0: (usd * data.data.rate);
    }, [coin, coinUSDValue, amount, data])

    const handlePress = React.useCallback(() => {
      dispatch({ type: 'transaction_amount', payload: parseFloat(amount) });
      dispatch({ type: 'transaction_currency', payload: getShortName(coin as Coin) })
      dispatch({ type: 'payout_amount', payload: handleconversion() })
      dispatch({ type: 'payout_currency', payload: 'ngn' })
      dispatch({ type: 'rate', payload: data.data.rate })
      const ref =  uuid.v4()
      dispatch({ type: 'reference', payload: ref });
      change(2);
    }, [amount, coin, data])


  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Sell {getShortName(coin as any)} For FIAT</CustomText>
      <CustomText variant="bodylight">Get paid into your bank account for selling crypto</CustomText>

      {!user.KYCVerified && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your account is currently limited so you cannot trade above 0.003BTC. Verify your account to remove limits</CustomText>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 18 }}>Enter Amount</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' value={amount} onChangeText={(e) => setAmount(e)} style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <CustomText variant="subheader" style={{ fontSize: 16 }}>{getShortName(coin as any)}</CustomText>
        </View>

        <View style={{ height: 30 }}>
         {CoinDetailsLoading && <ActivityIndicator color={theme.colors.primaryColor} size='small' />}
         {!CoinDetailsLoading && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
             <CustomText variant='xs'>Balance {coinData.data.data.balance}<CustomText variant='xs' fontWeight='600'>{coin}</CustomText></CustomText>
             <CustomText onPress={() => setAmount(coinData.data.data.balance)}>use max</CustomText>
          </View>
         )}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CustomText variant="body" style={{ fontSize: 18 }}>You'll recieve </CustomText>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>NGN{currencyFormat(handleconversion())}</CustomText>
        </View>
      </View>

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ marginTop: 10 }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>Current Rate</CustomText>
          {!isLoading && <CustomText variant="body" style={{ fontSize: 18 }}>NGN{data.data.rate}/$1</CustomText>}
          {isLoading && <ActivityIndicator size="small" color={theme.colors.primaryColor} />}
        </View>

        <View style={{ marginTop: 10 }}>
          <CustomText variant="subheader" style={{ fontSize: 18 }}>Transaction Fee</CustomText>
          {!feeLoading && <CustomText variant="body" style={{ fontSize: 18 }}>{feeData.data.data.fee} {getShortName(coin as any)}</CustomText>}
          {feeLoading && <ActivityIndicator size="small" color={theme.colors.primaryColor} />}
        </View>
      </View>

      {bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank Account</CustomText>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Bank width={70} height={70} />

                <View style={{ paddingLeft: 20}}>
                    <CustomText variant="subheader" style={{ fontSize: 16 }}>{bank.accountName}</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.name}</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.accountNumber}</CustomText>
                </View>

               {/* <View style={{ height: '100%'}}>
                <CustomText variant="subheader" style={{ fontSize: 16, color: theme.colors.primaryColor }} ml="s">UNLINK</CustomText>
               </View> */}
            </View>
        </View>
      )}

      {!ha && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your crypto will be sent to PunPay and after we confirm receipt of your payment. You’ll receive the payment straight to your bank account</CustomText>
        </View>
      )}

      {!bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank</CustomText>

            <Pressable onPress={() => navigation.navigate('link-bank')} style={{ ...Style.linkBtn, height: theme.button.height, backgroundColor: theme.textInput.backgroundColor }}>
                <CustomText variant="subheader" style={{ fontSize: 18, color: theme.colors.primaryColor }}>Link</CustomText>
            </Pressable>
        </View>
      )}
    {bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <PrimaryButton text='Continue' action={handlePress} />
        </View>
    )}
    </View>
  )
}

export default AmountPage