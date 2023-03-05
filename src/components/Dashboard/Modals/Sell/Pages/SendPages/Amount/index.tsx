import { View, TextInput, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../../style/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import {Text as CustomText, PrimaryButton } from '../../../../../../General'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../../state/Store'
import useIcons, { Coin } from '../../../../../../../hooks/useIcons'
import { Action } from '../../../state'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<Action>;
}

const SendAmountPage = ({ change, dispatch }: IProps) => {
    const theme = useTheme<Theme>()
    const coin = useSelector((state: RootState) => state.Coin);
    const [amount, setAmount] = React.useState('0');
    const [address, setAddress] = React.useState('');
    const { getShortName, getNetwork } = useIcons();

    const handlePress = React.useCallback(() => {
      if (address === '') {
        Alert.alert('Warning', 'You must enter an address');
        return;
      }
      if (amount === '0' || amount === '') {
        Alert.alert('Warning', 'You must enter an amount greater than 0');
        return;
      }
      dispatch({ type: 'transaction_currency', payload: getShortName(coin as Coin) });
      dispatch({ type: 'transaction_amount', payload: parseFloat(amount) })
      dispatch({ type: 'wallet', payload: address });
      change(2);
    }, [address, amount])



  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Send {coin}</CustomText>
      <CustomText variant="bodylight">Transfer coins to another wallet</CustomText>

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 15 }}>Enter Amount</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' value={amount} onChangeText={(e) => setAmount(e)} style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <CustomText variant="subheader" style={{ fontSize: 16 }}>{getShortName(coin as any)}</CustomText>
        </View>
        
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 15 }}>Recipient Address</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='' value={address} onChangeText={(e) => setAddress(e)} style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            {/* <Ionicons name="scan-outline" size={25} color={theme.colors.text} /> */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CustomText variant="body" style={{ fontSize: 15 }}>NETWORK - </CustomText>
            <CustomText variant="subheader" style={{ fontSize: 14 }}>{getNetwork(coin as Coin)}</CustomText>
        </View>
      </View>

      <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Please insure the address is correct and is on the <CustomText variant='body'>{getNetwork(coin as Coin)}</CustomText> Netwrok, to avoid losing your funds.</CustomText>
      </View>

      <View style={{ marginTop: 40 }}>
        <PrimaryButton text='Continue' action={handlePress} />
      </View>

    </View>
  )
}

export default SendAmountPage