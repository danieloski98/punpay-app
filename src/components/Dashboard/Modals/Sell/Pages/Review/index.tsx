import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import {Text as CustomText, PrimaryButton } from '../../../../../General'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewSellPage = ({ change }: IProps) => {
    const theme = useTheme<Theme>()
  return (
    <View style={Style.parent}>
      <CustomText variant="bodylight">SELL CRYPTO</CustomText>
      <CustomText variant="subheader" mt="m">Review Transaction</CustomText>

      <View style={{ marginTop: 20, paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText variant="header" style={{  }}>1.0</CustomText>
            <CustomText variant="bodylight" ml="s">BTC</CustomText>
        </View>
        <CustomText variant="bodylight" textAlign="center">(NGN82,000,000.OO)</CustomText>
      </View>

      <View style={{ flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Bank Account</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>MICHEAL JOHN DOE</CustomText>
            <CustomText variant="bodylight" style={{ fontSize: 16 }}>UNITED BANK FOR AFRICA</CustomText>
            <CustomText variant="bodylight" style={{ fontSize: 16 }}>20399094938</CustomText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>TransactionFee</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>NGN8,300($10.23)</CustomText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginBottom: 20 }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Current Rate</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>NGN745/$</CustomText>
        </View>
      </View>

    <PrimaryButton text='Confirm Sell' action={() => change(3)} />

    </View>
  )
}

export default ReviewSellPage