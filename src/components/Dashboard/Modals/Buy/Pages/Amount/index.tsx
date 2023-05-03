import { View, TextInput } from 'react-native'
import React, { useCallback } from 'react'
import { Style } from './style'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import useIcons from '../../../../../../hooks/useIcons'
import { IBank } from '../../../../../../models/bank'
import { Action, State } from '../../State'
import * as Crypto from 'expo-random';
import uuid from 'react-native-uuid';
import { currencyFormat } from '../../../../../../utils/currencyconverter'
const randomNumber = require('random-number');


/**
 * ACCOUNT DUMMY DATA
 */

interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
  coin: string;
  dispatch: React.Dispatch<Action>,
  rate: number;
  coinUSDValue: string;
}

const AmountPage = ({ next, coin, dispatch, rate, coinUSDValue }: IProps) => {
  const [amount, setAmount] = React.useState('0');
    const theme = useTheme<Theme>()
    const { getShortName, getNetwork } = useIcons()

    const handlePress = React.useCallback(() => {
      dispatch({ type: 'transaction_amount', payload:  parseFloat(amount) });
      dispatch({ type: 'payout_currency', payload: getShortName(coin as any) });
      dispatch({ type: 'transaction_currency', payload: 'ngn' });
      dispatch({ type: 'payout_amount', payload: parseFloat(handleCalculation() )})
      const ref =  uuid.v4()
      const options = {
        min: 100,
        max: 999,
        integer: true,
      };
      const code1 = randomNumber(options).toString() as number;
      const code2 = randomNumber(options).toString() as number;
      dispatch({ type: 'reference', payload: `${code1}-${code2}` });
      next(2);
    }, [amount]);

    const handleconversion = useCallback(() => {
      if (coin === 'Tether' || coin === 'BUSD') {
        return rate * parseFloat(amount);
      }
      const usd = parseFloat(coinUSDValue) * parseFloat(amount);
      return usd * rate < 1 ? 0: (usd * rate);
    }, [coin, coinUSDValue, amount, rate])


    const handleCalculation = React.useCallback(() => {

      const usdValue = parseFloat(amount) / parseFloat(rate.toString());
      return currencyFormat(usdValue / parseFloat(coinUSDValue))
    }, [amount, coinUSDValue, rate])
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Buy {getShortName(coin as any).toUpperCase()}</CustomText>
      <CustomText variant="bodylight">Enter the amount of {getShortName(coin as any)} you want to buy</CustomText>

      <View style={Style.inputCointainer}>
        <TextInput  value={amount} keyboardType='phone-pad' 
        onChangeText={(e) => setAmount(e)}
        style={[Style.input, {  fontSize: 55, fontFamily: theme.textVariants.subheader.fontFamily, fontWeight: theme.textVariants.subheader.fontWeight as any, color: theme.colors.text }]} />
        <CustomText variant="bodylight" ml="s">{'NGN'}</CustomText>
      </View>

      <View style={Style.network}>
        <View style={{ ...Style.netwrokContainer, backgroundColor: theme.textInput.backgroundColor }}>
            <CustomText variant="body">{getNetwork(coin as any)}</CustomText>
        </View>
      </View>

      <CustomText variant="bodylight" textAlign="center" mt="m">{handleCalculation()}{getShortName(coin as any)}</CustomText>
      <CustomText variant="bodylight" textAlign="center" mt="m">(RATE - {rate}/$)</CustomText>

      <View style={{ marginTop: 40 }}>
        <PrimaryButton text='Continue' action={handlePress} />
      </View>
    </View>
  )
}

export default AmountPage