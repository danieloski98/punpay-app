import { View, Text, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { Box, Text as CustomText } from '../../../components/General'
import HomeNavbar from '../../../components/Dashboard/Home/Navbar'
import { Feather } from '@expo/vector-icons'
import Portfolio from '../../../components/Dashboard/Home/PortFolio'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView } from 'react-native-gesture-handler'
import CoinTypeChip from '../../../components/Dashboard/Home/CoinType'
// svgs
import An from '../../../res/svg-output/An'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import Compaliance from '../../../components/Dashboard/Compliance'

const { height } = Dimensions.get('screen');

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB'];

export default function Home({ navigation }) {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const user = useSelector((state: RootState) => state.User);
  const theme = useTheme<Theme>();

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

            {!user.KYCVerified && <Compaliance />}


            <View style={{ paddingHorizontal: 40, paddingVertical: 20, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60, }}>
                <CustomText variant="body">PORTFOLIO</CustomText>
                <Feather name="search" size={25} color={theme.colors.text} />
              </View>

              {/* Portfolio chip */}

              {COINS.map((item, index) => (
                <CoinTypeChip coinName={item} key={index.toString()} />
              ))}

            </View>

          </ScrollView>
        </Box>

      </View>




    </Box>
  )
}