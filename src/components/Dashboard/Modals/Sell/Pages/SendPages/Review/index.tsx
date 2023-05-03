import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../../style/theme'
import {Text as CustomText, PrimaryButton } from '../../../../../../General'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../../state/Store'
import useIcons from '../../../../../../../hooks/useIcons'
import { State } from '../../../state'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../../../../utils/api'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  state: State;
}

const ReviewSendPage = ({ change, state }: IProps) => {
    const theme = useTheme<Theme>()
    const coin = useSelector((state: RootState) => state.Coin);
    const { getShortName } = useIcons()

    // get transaction fee 
    const { data, refetch , isError, isLoading } = useQuery(['getFees', coin], () => Axios.get(`/transaction/withdrawal-fee/${getShortName(coin as any)}`), {
      retry: 4,
      onError: (error: any) => {
        Alert.alert('Error', error);
      }
    });

    const handlePress = React.useCallback(() => {
      if (isLoading || isError ) {
        Alert.alert('Error', 'Fee loading');
      } else {
        change(3)
      }
    }, [data, isLoading, isError]);
  return (
    <View style={Style.parent}>
      <CustomText variant="bodylight">SEND CRYPTO</CustomText>
      <CustomText variant="subheader" mt="m">Review Transaction</CustomText>

      <View style={{ marginTop: 20, paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <CustomText variant="header" style={{  }}>{state.transactionAmount}</CustomText>
            <CustomText variant="bodylight" ml="s">{getShortName(coin as any)}</CustomText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flex: 1 }}>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>Recipient Address</CustomText>
        </View>

        <View style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap', flex: 1}}>
            <CustomText variant="bodylight" mt="m" style={{ fontSize: 16 }}>{state.wallet}</CustomText>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <View style={{ flex: 1 }}>
            <CustomText variant="subheader" mt="m" style={{ fontSize: 16 }}>TransactionFee</CustomText>
        </View>

        <View style={{ marginLeft: 20, flexWrap: 'wrap', flex: 1 }}>
            {isLoading &&  <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>Loading</CustomText>}
            {!isLoading && !isError && <CustomText variant="body" mt="m" style={{ fontSize: 16 }}>{data.data.data.fee} {coin}</CustomText>}
            {!isLoading && isError && <CustomText variant="body" mt="m" style={{ fontSize: 16 }} onPress={() => refetch()}>refresh withdrawal fee</CustomText>}
        </View>
      </View>


    <PrimaryButton text='Confirm Send' action={handlePress} />

    </View>
  )
}

export default ReviewSendPage