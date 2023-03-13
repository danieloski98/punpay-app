import { View, Text, Pressable, StatusBar, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Box, Text as CustomText } from '../../../components/General'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import BTC from '../../../res/svg-output/cryptoicons/Btc'
import FilterBar from '../../../components/Dashboard/TransactionHistory/FilterBar'
import { ScrollView } from 'react-native-gesture-handler'
import TransactionEntry from '../../../components/Dashboard/TransactionHistory/Entry'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import CoinTypeModal from '../../../components/Dashboard/Modals/CoinType/Index'
import useIcons from '../../../hooks/useIcons'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { Transaction } from '../../../models/transaction'
import TransactionDetails from '../../../components/Dashboard/Modals/TransactionDetails'


export default function TransactionHistory({ navigation }: any) {
  const [showModal, setShowModal] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [coin, setCoin] = React.useState('Bitcoin');
  const [type, setType] = React.useState(null);
  const [transaction, setTransaction] = React.useState({} as Transaction);
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const theme = useTheme<Theme>()
  const { getIcon, getShortName } = useIcons()

  const open = React.useCallback((trans: Transaction) => {
    setTransaction(trans)
    setShowDetails(true);
  }, [transaction]);

  // FETCH QUERY
  const { isLoading, isError, data } = useQuery(['getCoinTransactions', coin, type], () => Axios.get(`transaction/user/coin/${getShortName(coin as any)}?type=${type=== '' ? -1:type}`), {
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  const Select = React.useCallback((coin: string) => {
    setCoin(coin)
  }, [])

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <StatusBar translucent barStyle={darkMode ? 'light-content':'dark-content'} backgroundColor="transparent"  />
      <View style={Style.header}>

        <Pressable onPress={() => navigation.goBack()} style={Style.backC}>
          <Feather name="chevron-left" size={25} color={theme.colors.text} />
          <CustomText>Transaction History</CustomText>
        </Pressable>

        <Pressable onPress={() => setShowModal(true)} style={{ flex: 0.5 }}>
        <Box flex={0.5} flexDirection="row" justifyContent="space-between" alignItems="center" style={{ height: '50%', backgroundColor: 'transparent' }}>
          <View>
            {getIcon(coin, 20)}
          </View>
            <CustomText variant="xs" >{getShortName(coin as any)}</CustomText>
          <Feather name="chevron-down" size={20} color={theme.colors.text} />
        </Box>
        </Pressable>

      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <FilterBar setType={setType} />
      </View>
    
      <View style={{ flex: 1, marginTop: 20 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, marginTop: 0 }}>
          {isLoading && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <ActivityIndicator size='large' color={theme.colors.primaryColor} />
            </View>
          )}
          {!isLoading && !isError && (data.data.data as Array<Transaction>).map((item, index) => (
            <TransactionEntry transaction={item} open={open} key={index}  />
          ))}
          {!isLoading && !isError && (data.data.data as Array<Transaction>).length < 1 && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <CustomText>You haven’t made any {coin} transactions</CustomText>
            </View>
          )}
          {/* <TransactionEntry type="BUY" /> */}
        </ScrollView>
      </View>

      {showModal && <CoinTypeModal close={setShowModal} select={Select} />}
      {showDetails && <TransactionDetails transaction={transaction} close={setShowDetails} />}
    </Box>
  )
}