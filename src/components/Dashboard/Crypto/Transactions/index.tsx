import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomText from '../../../generalComponents/Text'
import Box from '../../../generalComponents/Box'
import SadFace from '../../../../res/svgs/sadf.svg'
import TransactionEntry from '../../TransactionHistory/Entry'

const items = [1];
const TransactionHistory = () => {
  return (
    <View style={{ width: '100%', }}>
      {items.length < 1 && (
        <View style={{ width: '100%', alignItems:'center' }}>
            <CustomText variant="body">NO TRANSACTIONS YET</CustomText>
            <SadFace width={279} height={203} />
            <CustomText variant="body">Looks like you haven’t made any transactions yet</CustomText>
        </View>
      )}
      {items.length > 0 && (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}>
            <TransactionEntry type="BUY" />
            <TransactionEntry type="BUY" />
            <TransactionEntry type="SELL" />
            <TransactionEntry type="BUY" />

            <TransactionEntry type="SELL" />
            <TransactionEntry type="SWAP" />
            <TransactionEntry type="SELL" />
            <TransactionEntry type="SELL" />
            <TransactionEntry type="SWAP" />
        </ScrollView>
      )}
    </View>
  )
}

export default TransactionHistory