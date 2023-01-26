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

const { height } = Dimensions.get('screen');

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB'];

export default function Home({ navigation }) {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode)
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
        <View style={{ width: '100%', height: (height / 100) * 25  }}>
          <Portfolio />
        </View>

        <Box backgroundColor="mainBackground" style={{ width: '100%', height: (height / 100) * 60,  backgroundColor: isDarkMode ? 'black':'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

          <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', paddingBottom: 100 }}>

          <View style={{ width: '100%', height: 140, paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>

            <View style={{ flexDirection: 'row', width: '80%' }}>
              <View style={{ width: 50, height: 50, borderRadius: 25 }}>
                <An width={50} height={50} />
              </View>
              <CustomText variant="bodylight" style={{ width: '100%', marginLeft: 10 }}>Financial compliance laws require us to verify your identity in order for you to use our services</CustomText>
            </View>

            <Pressable onPress={() => navigation.navigate('kyc')} style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
              <CustomText color="primaryColor">Get Started</CustomText>
              <Feather name="arrow-right" size={20} color={theme.colors.primaryColor} />
            </Pressable>

          </View>

          <View style={{ paddingHorizontal: 40, paddingVertical: 20, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60,}}>
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