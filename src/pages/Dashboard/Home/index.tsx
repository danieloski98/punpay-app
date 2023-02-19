import { View, Text, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Box, Text as CustomText } from '../../../components/General'
import HomeNavbar from '../../../components/Dashboard/Home/Navbar'
import { Feather } from '@expo/vector-icons'
import Portfolio from '../../../components/Dashboard/Home/PortFolio'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView } from 'react-native-gesture-handler'
import CoinTypeChip from '../../../components/Dashboard/Home/CoinType'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import Compaliance from '../../../components/Dashboard/Compliance'
import useWallets from '../../../hooks/useWallets';
import { Wallet } from '../../../models/wallet'
import useVerifyToken from '../../../hooks/useVerifyToken'

const { height } = Dimensions.get('screen');

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB', 'LTC'];

export default function Home({ navigation }) {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const user = useSelector((state: RootState) => state.User);
  const theme = useTheme<Theme>();
  const { isLoading, isError, data, refetch } = useWallets();

  console.log(data);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <HomeNavbar />
      <View style={{ width: '100%', height: 30, backgroundColor: '#FFC37D', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Feather name="alert-triangle" size={15} />
        <CustomText variant="xs" color="blackText" marginLeft="s">Account is limited</CustomText>
      </View>

      <View style={{ backgroundColor: theme.textInput.backgroundColor, flex: 1 }}>
        {/* portfolio section */}
        <View style={{ width: '100%', height: (height / 100) * 25 }}>
          <Portfolio />
        </View>

        <Box backgroundColor="mainBackground" style={{ width: '100%', height: (height / 100) * 60, backgroundColor: isDarkMode ? 'black' : 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

          <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', paddingBottom: 100 }}>

            {/* {!user.KYCVerified && <Compaliance />} */}


            <View style={{ paddingHorizontal: 40, paddingVertical: 20,  }}>
              {
                !isLoading && !isError && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, }}>
                    <CustomText variant="body">PORTFOLIO</CustomText>
                    {/* <Feather name="search" size={25} color={theme.colors.text} /> */}
                  </View>
                )
              }

              {/* Portfolio chip */}
              {
                isLoading && (
                  <Box justifyContent='center' alignItems='center' pt='l'>
                    <ActivityIndicator color={theme.colors.primaryColor} size="large" />
                  </Box>
                )
              }

              {!isLoading && !isError && (data?.data.data as Array<Wallet>).sort((a, b) => {
                if (a.currency >  b.currency) {
                  return 1
                }
                if (a.currency <  b.currency) {
                  return -1
                }
                return 0
              }).map((item, index) => (
                <CoinTypeChip {...item} key={index.toString()} />
              ))}

            </View>

          </ScrollView>
        </Box>

      </View>




    </Box>
  )
}