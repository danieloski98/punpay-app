import { View, Text, ScrollView, Platform, Dimensions, Pressable } from 'react-native'
import React from 'react'
import CryptoPageHeader from '../../../components/Dashboard/Crypto/Header'
import Box from '../../../components/generalComponents/Box'
import Actions from '../../../components/Dashboard/Crypto/Actions'
import { Style } from './style'
import CryptoTab from '../../../components/Dashboard/Crypto/Tab'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import StatsTab from '../../../components/Dashboard/Crypto/Stats'
import TransactionHistory from '../../../components/Dashboard/Crypto/Transactions'

const os = Platform.OS;
export const {width: SIZE} = Dimensions.get('window');
const timeline = ['24h', '7d', '2w', '1m', '6m', '1y'];

export default function CryptoPage() {
  const [time, setTime] = React.useState('24h');
  const [tab, setTab] = React.useState(1);
  const theme = useTheme<Theme>();




  return (
    <Box backgroundColor="mainBackground" style={{ flex: 1 }}>
      <CryptoPageHeader />
      <Actions />
      <CryptoTab tab={tab} setTab={setTab} />
      <View style={Style.scrollContainer}>
        { tab === 1 && <StatsTab /> }
        { tab === 2 && <TransactionHistory />}
      </View>
    </Box>
  )
}