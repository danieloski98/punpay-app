import { View, Text } from 'react-native'
import React from 'react'
import Box from '../../../components/generalComponents/Box'
import { Feather } from '@expo/vector-icons'
import CustomText from '../../../components/generalComponents/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CryptoCard from '../../../components/Dashboard/TransactionType/CryptoCard'
import { RouteProp } from '@react-navigation/native'

interface IProps {
  route: RouteProp<any>;
  navigation: any;
}

const TransactionType: React.FC<IProps> = ({ route, navigation}) => {
  const { type } = route.params as { type: string };
  const theme = useTheme<Theme>();
  return (
    <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

      <View style={{ width: '100%', height: 150, paddingVertical: 40, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
          <Feather name="chevron-left" size={20} color={theme.colors.text} onPress={() => navigation.goBack()} />
          <CustomText>{type} Crypto</CustomText>
        </View>
      </View>

      {/* Search bar */}
        <View style={{ width: '100%', height: theme.textInput.height, flexDirection: 'row', borderRadius: theme.textInput.height, backgroundColor: theme.textInput.backgroundColor, paddingVertical:10, paddingHorizontal: 20, alignItems: 'center', marginBottom: 30 }}>
          <TextInput style={{ flex: 1, color: theme.colors.text }} placeholder="search" />
          <Feather name="search" size={20} color={theme.colors.text} />
        </View>

      <CustomText variant="bodylight">Please select a currency to get started</CustomText>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 60}}>
          <CryptoCard coin="Bitcoin" type={1} />
          <CryptoCard coin="Ethereum" type={1} />
          <CryptoCard coin="Tether" type={1} />
          <CryptoCard coin="Ripple" type={1} />
          <CryptoCard coin="BUSD" type={1} />
          <CryptoCard coin="DOGE" type={1} />
          <CryptoCard coin="BNB" type={1} />
        </ScrollView>
      </View>

    </Box>
  )
}

export default TransactionType;