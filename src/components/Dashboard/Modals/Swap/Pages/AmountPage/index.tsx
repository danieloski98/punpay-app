import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import Bitcoin from '../../../../../../res/svg-output/Bitcoin'
import Ex from '../../../../../../res/svg-output/Ex'
import USDT from '../../../../../../res/svg-output/Usdt'
import { Feather, FontAwesome } from '@expo/vector-icons'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import useIcons, { Coin } from '../../../../../../hooks/useIcons'
import { Action, State } from '../../state'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../../../utils/api'

interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
  coin: string;
  dispatch:  React.Dispatch<Action>;
  usd: string;
  state: State;
}

const AmountPage = ({ next, coin, dispatch, usd, state }: IProps) => {
  const [amount, setAmount] = React.useState(state.transactionAmount.toString() || '0');
  const theme = useTheme<Theme>();
  const { getIcon, getShortName } = useIcons();
  const [swapPercentage, setSwapPercentage] = React.useState(0);

  // get swap perrcentage
  const { isLoading } = useQuery(['getSwapPercentage'], () => Axios.get('/rate/swap-rate'), {
    onSuccess: (data) => {
      setSwapPercentage(data.data.data.percentage);
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

      // get the users coin details
      const { isLoading: CoinDetailsLoading , data, isError } = useQuery(['getCoin'], () => Axios.get(`/user/wallet/${getShortName(coin as any)}`), {
        refetchOnMount: true,
        onSuccess: (data) => {
        },
        onError: (error) => {
          Alert.alert('An error occured');
        }
      })

  const handleconversion = React.useCallback(() => {
    const usdV = parseFloat(usd) * parseFloat(amount);
    return usdV;
  }, [amount, usd]);

  const hanldePercentage = React.useCallback(() => {
    const percenter = (handleconversion()/100) * swapPercentage;
    return percenter
  }, [amount, usd]);

  const handlePress = React.useCallback(() => {
    dispatch({ type: 'transaction_currency', payload: getShortName(coin as Coin) });
    dispatch({ type: 'transaction_amount', payload:  parseFloat(amount) });
    dispatch({ type: 'payout_amount', payload: handleconversion() });
    next(2);
  }, [state, amount, coin])

  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Swap Crypto</CustomText>
      <CustomText variant="bodylight">Convert Crypto Seamlessly</CustomText>

      <View style={Style.amountContainer}>
        <CustomText>Amount</CustomText>
        <View style={{ ...Style.selectContainer, borderBottomColor: theme.textInput.backgroundColor }}>

          <View style={Style.inputContainer}>
            <TextInput defaultValue="0.0" value={amount} onChangeText={(e) => setAmount(e)} style={{ flex: 1, fontSize: theme.textVariants.subheader.fontSize, fontWeight: '500', color: theme.colors.text }} keyboardType="number-pad" />
            <CustomText variant="body">{getShortName(coin as any)}</CustomText>
          </View>

          <View style={Style.dropDownContainer}>
            {getIcon(coin, 20)}
            <CustomText variant="bodylight" mx='m'>{getShortName(coin as any)}</CustomText>
            {/* <Feather name="chevron-down" size={15} color={theme.colors.text} /> */}
          </View>

        </View>
        <View style={{ height: 30 }}>
         {CoinDetailsLoading && <ActivityIndicator color={theme.colors.primaryColor} size='small' />}
         {!CoinDetailsLoading && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
             <CustomText variant='xs'>Balance {data.data.data.balance}<CustomText variant='xs' fontWeight='600'>{coin}</CustomText></CustomText>
             <CustomText onPress={() => setAmount(data.data.data.balance)}>use max</CustomText>
          </View>
         )}
        </View>
      </View>

      <View style={{ height: 100, justifyContent: 'center' }}>
        <Ex width={40} height={40} />
      </View>

      <View style={{...Style.amountContainer, marginTop: 0 }}>
        <CustomText>Amount</CustomText>
        <View style={{ ...Style.selectContainer, borderBottomColor: theme.textInput.backgroundColor }}>

          <View style={Style.inputContainer}>
            <CustomText variant="subheader" style={{ flex: 1, flexWrap: 'wrap' }}>
            {handleconversion().toFixed(2)}
            </CustomText>
            <CustomText variant="body">USDT</CustomText>
          </View>

          <View style={Style.dropDownContainer}>
            {getIcon('Tether', 20)}
            <CustomText variant="bodylight" mx='m'>{getShortName('Tether')}</CustomText>
            {/* <Feather name="chevron-down" size={15} color={theme.colors.text} /> */}
          </View>

        </View>
       
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
          <CustomText variant="bodylight" ml="s">{hanldePercentage().toFixed(2)}usdt</CustomText>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>What you will recieve</CustomText>
          <CustomText variant="bodylight" ml="s">{(handleconversion() - hanldePercentage()).toFixed(2 )}usdt</CustomText>
        </View>
      </View>

      {/* <View style={{ padding: 15, borderRadius: 20, backgroundColor: '#ff886049', marginTop: 20 }}>
        <CustomText variant="bodylight">Swap is only available for USDT BEP20</CustomText>
      </View> */}

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Swap' action={handlePress} />
      </View>
    </View>
  )
}

export default AmountPage