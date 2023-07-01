import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import { State } from '../../state'
import { currencyFormat } from '../../../../../../utils/currencyconverter'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../../../utils/api'
import useIcons from '../../../../../../hooks/useIcons'
import { showMessage } from 'react-native-flash-message'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  state: State
}

const ReviewSellPage = ({ change, state }: IProps) => {
    const theme = useTheme<Theme>()
    const coin = useSelector((state: RootState) => state.Coin);
    const bank = useSelector((state: RootState) => state.Bank);
    const {getShortName} = useIcons();


    const { isLoading: feeLoading , data: feeData, isError: feeHasError } = useQuery(['getWithdrawalFeesSend'], () => Axios.get(`/transaction/withdrawal-fee/${getShortName(coin as any)}?quidax=${true}`), {
      refetchOnMount: true,
      onSuccess: (data) => {
        console.log(data.data.data)
      },
      onError: (error) => {
        Alert.alert('An error occured');
      }
    });

    const handlePress = React.useCallback(() => {
      if (feeLoading) {
        showMessage({
          message: 'Fetching Transaction Fee..',
          description: `We are fetching the transaction fee`,
          floating: false,
          autoHide: true,
          duration: 6,
          type: 'info',
        })
        return;
      } else {
        change(3)
      }
    }, [feeLoading])
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

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginBottom: 0 }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Current Rate</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>NGN{state.rate}/$</CustomText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginBottom: 20 }}>
        <View>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
        </View>

        <View style={{ marginLeft: 20 }}>
            {!feeLoading && <CustomText variant="body" mt="m" style={{ fontSize: 18 }}>{feeData.data.data.fee} {getShortName(coin as any)}</CustomText>}
            {feeLoading && <CustomText variant="body" mt="m" style={{ fontSize: 18 }}>Loaidng Transaction Fee</CustomText>}
        </View>
      </View>

      

    <PrimaryButton text='Confirm Sell' action={handlePress} />

    </View>
  )
}

export default ReviewSellPage