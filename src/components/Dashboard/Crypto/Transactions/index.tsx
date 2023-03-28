import { View, Text, ScrollView, Alert, ActivityIndicator, RefreshControl, } from 'react-native'
import React from 'react'
import { Text as CustomText } from '../../../General'
import SadFace from '../../../../res/svg-output/Sadf'
import TransactionEntry from '../../TransactionHistory/Entry'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../utils/api'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import useIcons, { Coin } from '../../../../hooks/useIcons'
import { Transaction } from '../../../../models/transaction'
import TransactionDetails from '../../Modals/TransactionDetails'

interface IProps {
  type: string;
  open: (trans: Transaction) => void;
}

const items = [1];
const TransactionHistory = ({ type, open }: IProps) => {
  const theme = useTheme<Theme>();
  const { getShortName } = useIcons();
  const [data, setData] = React.useState([] as Array<Transaction>)
  const { isLoading, isError, refetch } = useQuery(['get Transactions'], () => Axios.get(`transaction/user/coin/${getShortName(type as Coin)}`), {
    onSuccess: (data) => {
      setData(data.data.data);
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  const onRefresh = React.useCallback(async () => {
    await refetch();
  }, []);
  return (
    <View style={{ width: '100%', }}>
      {/* {isLoading && (
        <View>
          <ActivityIndicator size='large' color={theme.colors.primaryColor} />
        </View>
      )} */}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        {!isLoading && data.length < 1 && (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <CustomText variant="body">NO TRANSACTIONS YET</CustomText>
            <SadFace width={279} height={203} />
            <CustomText variant="body">Looks like you haven’t made any {type} transactions yet</CustomText>
          </View>
        )}
        {!isLoading && data.length > 0 && data.map((item, index) => (
          <TransactionEntry transaction={item} key={index} open={open} />
        ))}
      </ScrollView>

      
    </View>
  )
}

export default TransactionHistory