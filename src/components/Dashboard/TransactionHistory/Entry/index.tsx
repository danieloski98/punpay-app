import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import {Box, Text as CustomText} from '../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import { Transaction } from '../../../../models/transaction'

interface IProps {
    transaction: Transaction;
    open: (trans: Transaction) => void;
}

export default function TransactionEntry({ transaction, open }: IProps) {
    const theme = useTheme<Theme>()

    const icon = () => {
        switch(transaction.transactionType) {
            case 0: {
                return <Feather  name="database" size={20} color={theme.colors.text} />
            }
            case 1: {
                return <Feather  name="arrow-up" size={20} color={theme.colors.text} />
            }
            case 2: {
                return <Feather  name="shopping-cart" size={20} color={theme.colors.text} />
            }
            case 3: {
                return <Feather  name="refresh-cw" size={20} color={theme.colors.text} />
            }
            case 4: {
                return <Feather  name="send" size={20} color={theme.colors.text} />
            }
        }
    }

    const title = () => {
        switch(transaction.transactionType) {
            case 0: {
                return 'Deposit'
            }
            case 1: {
                return 'Sell'
            }
            case 2: {
                return 'Buy'
            }
            case 3: {
                return 'Swap'
            }
            case 4: {
                return 'Withdraw'
            }
        }
    }

  return (
    <Pressable onPress={() => open(transaction)} style={Style.parent}>
      <View style={Style.left}>
        <View style={{ width: 40 , height: 40, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
            {icon()}
        </View>
        <View style={{ marginLeft: 10}}>
            <CustomText variant="body">{title()}</CustomText>
            <CustomText variant="xs">{new Date(transaction.createdAt).toDateString()}</CustomText>
        </View>
      </View>
      <View style={Style.right}>
        {transaction.transactionType !== 4 && transaction.transactionType !== 0 && <CustomText variant="body">{transaction.payoutAmount} {transaction.payoutCurrency}</CustomText>}
        {transaction.transactionType === 4 || transaction.transactionType === 0 && <CustomText variant="body">{transaction.transactionAmount} {transaction.transactionCurrency}</CustomText>}
      </View>
    </Pressable>
  )
}