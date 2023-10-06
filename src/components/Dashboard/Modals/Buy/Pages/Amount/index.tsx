import { View, TextInput } from 'react-native'
import React, { useCallback } from 'react'
import { Style } from './style'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import useIcons from '../../../../../../hooks/useIcons'
import { IBank } from '../../../../../../models/bank'
import { useBuyState } from '../../State'
import * as Crypto from 'expo-random';
import uuid from 'react-native-uuid';
import { currencyFormat } from '../../../../../../utils/currencyconverter'
const randomNumber = require('random-number');


/**
 * ACCOUNT DUMMY DATA
 */

interface IProps {
  coin: string;
}

const AmountPage = ({ coin }: IProps) => {
  const { setAll, ngn, rate, usd, transactionAmount, setAmount, setNgn } = useBuyState((state) => state);
    const theme = useTheme<Theme>()
    const { getShortName, getNetwork } = useIcons();

    React.useEffect(() => {
      const value = handleCalculation();
      setAll({ payoutAmount: value });
    }, [transactionAmount]);

    const handleAmountChange = (text: string) => {
      setAmount(text);
    };
  
    
    const handleCalculation = () => {
      const usdValue = parseInt(transactionAmount) / parseInt(rate.toString());
      return Intl.NumberFormat('en', { maximumSignificantDigits: 2 }).format((usdValue / parseFloat(usd)));
    }

    const handlePress = () => {
        const options = {
          min: 100,
          max: 999,
          integer: true,
        };
        const code1 = randomNumber(options).toString() as number;
        const code2 = randomNumber(options).toString() as number;
        // setAmount(ngn);
        setAll({
          payoutCurrency: getShortName(coin as any),
          transactionCurrency: 'ngn',
          referenceCode: `${code1}-${code2}`,
          stage: 2,
        });
    };

    // const handleconversion = useCallback(() => {
    //   if (coin === 'Tether' || coin === 'BUSD') {
    //     return rate * parseFloat(amount);
    //   }
    //   const usd = parseFloat(coinUSDValue) * parseFloat(amount);
    //   return usd * rate < 1 ? 0: (usd * rate);
    // }, [coin, coinUSDValue, amount, rate]);


  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Buy {getShortName(coin as any)?.toUpperCase()}</CustomText>
      <CustomText variant="bodylight">Enter the amount of {getShortName(coin as any)} you want to buy</CustomText>

      <View style={Style.inputCointainer}>
        <TextInput value={transactionAmount} keyboardType='phone-pad' 
        onChangeText={(e) => handleAmountChange(e)}
        style={[Style.input, {  fontSize: 35, fontFamily: theme.textVariants.subheader.fontFamily, color: theme.colors.text }]} />
        <CustomText variant="bodylight" ml="s">{'NGN'}</CustomText>
      </View>

      <View style={Style.network}>
        <View style={{ ...Style.netwrokContainer, backgroundColor: theme.textInput.backgroundColor }}>
            <CustomText variant="body">{getNetwork(coin as any)}</CustomText>
        </View>
      </View>

      <CustomText variant="bodylight" textAlign="center" mt="m">{handleCalculation()} {getShortName(coin as any)}</CustomText>
      <CustomText variant="bodylight" textAlign="center" mt="m">(RATE - NGN{rate}/$)</CustomText>

      <View style={{ marginTop: 40 }}>
        <PrimaryButton text='Continue' checkNetwork action={() =>  handlePress() } />
      </View>
    </View>
  )
}

export default AmountPage