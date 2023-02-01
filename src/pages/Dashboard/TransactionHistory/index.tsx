import { View, Text, Pressable } from 'react-native'
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


export default function TransactionHistory({ navigation }: any) {
  const theme = useTheme<Theme>()

  console.log(navigation);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <View style={Style.header}>

        <Pressable onPress={() => navigation.goBack()} style={Style.backC}>
          <Feather name="chevron-left" size={25} color={theme.colors.text} />
          <CustomText>Transaction History</CustomText>
        </Pressable>

        <Box flex={0.5} flexDirection="row" justifyContent="space-between" alignItems="center" style={{ height: '50%', backgroundColor: 'transparent' }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
            <BTC width={20} height={20} scale={3.5} />
          </View>
            <CustomText variant="xs">BTC</CustomText>
          <Feather name="chevron-down" size={25} color={theme.colors.text} />
        </Box>

      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <FilterBar />
      </View>
    
      <View style={{ flex: 1, marginTop: 20 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, marginTop: 0 }}>
          <TransactionEntry type="BUY" />
          {/* <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" />
          <TransactionEntry type="BUY" />
          <TransactionEntry type="SELL" />
          <TransactionEntry type="SWAP" /> */}
        </ScrollView>
      </View>
    </Box>
  )
}