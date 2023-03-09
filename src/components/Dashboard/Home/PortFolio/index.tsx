import { View, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Style} from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import {Box, Text as CustomText} from '../../../General'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

// svgs
import ArrowDown from '../../../../res/svg-output/ArrowDown';
import ArrowUp from "../../../../res/svg-output/ArrowUp";
import Arrows from '../../../../res/svg-output/Arrows';
import Wallet from '../../../../res/svg-output/Wallet';
import useBalance from '../../../../hooks/useBalance'
import { currencyFormat } from '../../../../utils/currencyconverter'

export default function Portfolio() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    const [show, setShow] = React.useState(false);
    const { isLoading, isError, data,refetch } = useBalance();

  return (
    <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor }}>
      <CustomText variant="bodylight" textAlign="center" textTransform="uppercase">Portfolio Balance</CustomText>
      {isLoading && (
        <Box justifyContent='center' alignItems='center' pt='m'>
            <ActivityIndicator color={theme.colors.primaryColor} size='large' />
        </Box>
      )}
      {!isLoading && isError && (
        <CustomText variant="body" mt="m" textAlign="center" textTransform="uppercase" style={{color: 'red'}} onPress={async () => await refetch() }>Error while loading balance</CustomText>
      )}
      {!isLoading && !isError && (
       <Box mt='l' flexDirection='row' justifyContent='center' mr='m'>
         {show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{ flex: 0.9 }}>NGN{currencyFormat(data?.data.data.balance)}</CustomText>}
         {!show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{ flex: 0.9 }}>****</CustomText>}
         <Feather name={show ? 'eye-off':'eye'} size={25} color={theme.colors.text} onPress={() => setShow(prev => !prev)} style={{ flex: 0.1}} />
       </Box>
      )}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 20 }}>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', {
                    type: 'Deposit'
                })}
                style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <ArrowDown width={25} height={30} style={{ marginLeft: 7, marginTop: 5 }} />
            </Pressable>
            <CustomText variant="body">Deposit</CustomText>
        </View>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', { type: 'Withdraw'})}
                style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <ArrowUp width={25} height={30} style={{ marginLeft: 7, marginTop: 5 }} />
            </Pressable>
            <CustomText variant="body">Withdraw</CustomText>
        </View>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Buy'})}
            style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Arrows width={25} height={30} style={{ marginLeft: 5, marginTop: 1 }} />
            </View>
            <CustomText variant="body">Buy</CustomText>
        </Pressable>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Swap'})}
            style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Wallet width={25} height={25} />
            </View>
            <CustomText variant="body">Swap</CustomText>
        </Pressable>

      </View>
    </View>
  )
}