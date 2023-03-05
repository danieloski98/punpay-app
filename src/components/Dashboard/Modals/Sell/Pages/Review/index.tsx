import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import { State } from '../../state'
import { currencyFormat } from '../../../../../../utils/currencyconverter'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  state: State
}

const ReviewSellPage = ({ change, state }: IProps) => {
    const theme = useTheme<Theme>()
    const coin = useSelector((state: RootState) => state.Coin);
    const bank = useSelector((state: RootState) => state.Bank);
  return (
    <View style={Style.parent}>
      <CustomText variant="bodylight">SELL CRYPTO</CustomText>
      <CustomText variant="subheader" mt="m">Review Transaction</CustomText>

      <View style={{ marginTop: 20, paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText variant="header" style={{  }}>{state.transactionAmount}</CustomText>
            <CustomText variant="bodylight" ml="s">{coin}</CustomText>
        </View>
        <CustomText variant="bodylight" textAlign="center">(NGN{currencyFormat(state.payoutAmount as number)})</CustomText>
      </View>

      <View style={{ flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Bank Account</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>{bank.accountName}</CustomText>
            <CustomText variant="bodylight" style={{ fontSize: 16 }}>{bank.name}</CustomText>
            <CustomText variant="bodylight" style={{ fontSize: 16 }}>{bank.accountNumber}</CustomText>
        </View>
      </View>

      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>TransactionFee</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>NGN8,300($10.23)</CustomText>
        </View>
      </View> */}

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginBottom: 20 }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Current Rate</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>NGN{state.rate}/$</CustomText>
        </View>
      </View>

    <PrimaryButton text='Confirm Sell' action={() => change(3)} />

    </View>
  )
}

export default ReviewSellPage