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
import useGetRate from '../../../../hooks/useGetRate'

interface IProps {
  open: () => void;
  currency: number;
}

export default function Portfolio({ open, currency }: IProps) {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    const [usd, setUsd] = React.useState(0);
    const [show, setShow] = React.useState(false);
    const { isLoading, isError, data,refetch } = useBalance();
    const { isLoading: RateLoading, data: rate } = useGetRate({ transactionType: 'buy' });

    React.useEffect(() => {
      if (currency === 2) {
        const cal = data?.data.data.balance / rate.data.rate;
        setUsd(cal);
      }
    }, [currency])

    console.log(`This is from portfolio ${rate.data.rate}`);
    console.log(rate);




  return (
    <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor }}>
      <Box width='100%' alignItems='center'>
          <Pressable onPress={open} style={{...Style.switchbutton, borderColor: theme.colors.text }}>
            <CustomText variant='xs'>{currency === 1 ? 'NGN':'USD'}</CustomText>
            <Feather name='chevron-down' size={15} color={theme.colors.text} style={{ marginTop: 2, marginLeft: 5 }} />
          </Pressable>
      </Box>
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
       <Box mt='m' flexDirection='row' justifyContent='center'>
         {show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{ flex: 0 }}>{currency === 1 ? 'NGN':'$'}{currency === 1? currencyFormat(data?.data.data.balance):currencyFormat(usd)}</CustomText>}
         {!show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{  }}>****</CustomText>}
         <Feather name={show ? 'eye-off':'eye'} size={20} color={theme.colors.text} onPress={() => setShow(prev => !prev)} style={{ marginLeft: 10, marginTop: 3 }} />
       </Box>
      )}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 10 }}>

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