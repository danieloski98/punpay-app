import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CryptoCard from '../../../components/Dashboard/TransactionType/CryptoCard'
import { RouteProp } from '@react-navigation/native'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RecieveModal from '../../../components/Dashboard/Modals/Recieve'
import SellPage from '../../../components/Dashboard/Modals/Sell'
import Swap from '../../../components/Dashboard/Modals/Swap'
import BuyPage from '../../../components/Dashboard/Modals/Buy'
import {Box, Text as CustomText, PrimaryButton } from "../../../components/General";
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../state/Store'

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB', 'Litecoin' ];
const COINS_T = ['Bitcoin', 'Ethereum', 'BUSD', 'XRP', 'DOGE', 'BNB', 'Litecoin' ];
interface IProps {
  route: RouteProp<any>;
  navigation: any;
}

const TransactionType = ({ route, navigation }: IProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [coin, setCoin] = React.useState('');
  const [search, setSearch] = React.useState<string>('')
  const { type } = route.params as { type: string };
  const dispatch = useDispatch<Dispatch>();
  const theme = useTheme<Theme>();

  const switchPageType = () => {
    switch(type) {
      case 'Deposit': {
        return <RecieveModal close={setOpenModal} coin={coin} />
      }
      case 'Withdraw': {
        return <SellPage close={setOpenModal} coin={coin} />
      }
      case 'Swap': {
        return <Swap close={setOpenModal} coin={coin} />
      }
      case 'Buy': {
        return <BuyPage close={setOpenModal} coin={coin} />
      }
    }
  }

  const registerCoin = (co: string) => {
    setCoin(co);
    // console.log(co)
    dispatch({ type: 'Coin/update', payload: co });
    setOpenModal(true);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

        <View style={{ width: '100%', height: 150, paddingVertical: 40, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
            <Feather name="chevron-left" size={20} color={theme.colors.text} onPress={() => navigation.goBack()} />
            <CustomText>{type} Crypto</CustomText>
          </View>
        </View>

        {/* Search bar */}
        <View style={{ width: '100%', height: theme.textInput.height, flexDirection: 'row', borderRadius: theme.textInput.height, backgroundColor: theme.textInput.backgroundColor, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center', marginBottom: 30 }}>
          <TextInput value={search} onChangeText={(t) => setSearch(t)} style={{ flex: 1, color: theme.colors.text }} placeholder="search" placeholderTextColor={theme.colors.text} />
          <Feather name="search" size={20} color={theme.colors.text} />
        </View>

        <CustomText variant="bodylight">Please select a currency to get started</CustomText>

        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
            {type !== 'Swap' && COINS.sort().filter((item) => {
              if (search === '' ) {
                return item;
              } else if (item.toLowerCase().includes(search.toLowerCase())) {
                  return item;
              }
            }).map((item, index) => (
              <CryptoCard key={index.toString()} coin={item} type={1} setCoin={registerCoin} />
            ))}
            {type === 'Swap' && COINS_T.sort().filter((item) => {
               if (search === '' ) {
                return item;
              } else if (item.toLowerCase().includes(search.toLowerCase())) {
                  return item;
              }
            }).map((item, index) => (
              <CryptoCard key={index.toString()} coin={item} type={1} setCoin={registerCoin} />
            ))}
          </ScrollView>
        </View>
            {openModal && switchPageType()}
      </Box>
    </GestureHandlerRootView>
  )
}

export default TransactionType;