import { View, Pressable, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { Style} from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import {Box, Text as CustomText} from '../../../General'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import ActionCard, { IProps as ActionProps} from './ActionCard'
import { openURL } from 'expo-linking'

// svgs
import ArrowDown from '../../../../res/svg-output/ArrowDown';
import ArrowUp from "../../../../res/svg-output/ArrowUp";
import Arrows from '../../../../res/svg-output/Arrows';
import Wallet from '../../../../res/svg-output/Wallet';
import useBalance from '../../../../hooks/useBalance'
import { currencyFormat } from '../../../../utils/currencyconverter'
import useGetRate from '../../../../hooks/useGetRate'
import useOpenWhatsapp from '../../../../hooks/useOpenWhatsapp'

const PortfolioActions: Array<ActionProps> = [
  {
    title: 'Deposit',
    icon: <ArrowDown width={25} height={30} style={{ marginLeft: 7, marginTop: 5 }} />,
    type: 'Deposit',
  },
  {
    title: 'Withdraw',
    icon: <ArrowUp width={25} height={30} style={{ marginLeft: 7, marginTop: 5 }} />,
    type: 'Withdraw',
  },
  {
    title: 'Buy',
    icon: <Arrows width={25} height={30} style={{ marginLeft: 5, marginTop: 1 }} />,
    type: 'Buy',
  },
  {
    title: 'Swap',
    icon: <Wallet width={25} height={25} />,
    type: 'Swap',
  },
  {
    title: 'Giftcards',
    icon: <Image source={require('../../../../res/gift.png')} resizeMode='contain' style={{ width: '60%', height: '60%'}} />,
    type: 'Giftcards',
    action: () => openURL('https://wa.me/message/LX3XCNXKYMVVK1'),
  }
];

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
      if (currency === 2 && !RateLoading) {
        const cal = data?.data.data.balance / rate.data.rate;
        setUsd(cal);
      }
    }, [currency])


  return (
    <View style={{...Style.parent }}>
      <Box width='100%' alignItems='center'>
          <Pressable onPress={open} style={{...Style.switchbutton, borderColor: theme.colors.text }}>
            <CustomText variant='xs' >{currency === 1 ? 'NGN':'USD'}</CustomText>
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
         {show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{ fontSize: 25 }}>{currency === 1 ? 'NGN':'$'}{currency === 1? currencyFormat(data?.data.data.balance):currencyFormat(usd)}</CustomText>}
         {!show && <CustomText variant="subheader" textAlign="center" textTransform="uppercase" style={{ marginTop: 5, fontSize: 25 }}>****</CustomText>}
         <Feather name={show ? 'eye-off':'eye'} size={20} color={theme.colors.text} onPress={() => setShow(prev => !prev)} style={{ marginLeft: 10, marginTop: 3 }} />
       </Box>
      )}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingHorizontal: 10, paddingTop: 10, alignItems: 'center', marginTop: 10, backgroundColor: theme.colors.modalBg, }}>

          {PortfolioActions.map((item, index) => (
            <ActionCard {...item} key={index} />
          ))}
      
      </View>
    </View>
  )
}