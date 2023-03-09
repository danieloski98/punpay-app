import { View, Text, Dimensions, Pressable, ActivityIndicator, RefreshControl, Alert, Image } from 'react-native'
import React from 'react'
import { Box, Text as CustomText } from '../../../components/General'
import HomeNavbar from '../../../components/Dashboard/Home/Navbar'
import { Feather } from '@expo/vector-icons'
import Portfolio from '../../../components/Dashboard/Home/PortFolio'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView } from 'react-native-gesture-handler'
import CoinTypeChip from '../../../components/Dashboard/Home/CoinType'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import Compaliance from '../../../components/Dashboard/Compliance'
import useWallets from '../../../hooks/useWallets';
import { Wallet } from '../../../models/wallet'
import useVerifyToken from '../../../hooks/useVerifyToken'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { IBank } from '../../../models/bank'
import useOpenWhatsapp from '../../../hooks/useOpenWhatsapp'

const { height } = Dimensions.get('screen');

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB', 'LTC'];

export default function Home({ navigation }) {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const user = useSelector((state: RootState) => state.User);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch<Dispatch>()
  const theme = useTheme<Theme>();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, refetch } = useWallets();
  const { openwhatsapp } = useOpenWhatsapp()
  const { isLoading: userLoading } = useQuery(['getUser'], () => Axios.get(`/user/profile/${user.id}`),{
    refetchOnMount: true,
    onSuccess: (data) => {
      dispatch({ type: 'User/update', payload: data.data.data })
        if (data.data.data.bank === null) {
          const obj: IBank = {
            accountName: '',
            accountNumber: '',
            bankId: '',
            code: '',
            createdAt: '',
            id: 0,
            isAdminAccount: false,
            isLinked: false,
            name: '',
            updatedAt: '',
            userId: ''
          }
          dispatch({ type: 'Bank/update', payload: obj })
        } else {
          dispatch({ type: 'Bank/update', payload: data.data.data.bank })
        }
    }
  })

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    queryClient.invalidateQueries()
    .then(() => {
      setLoading(false)
    });
  }, [])


  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <HomeNavbar />
      <Pressable
       onPress={() => navigation.navigate('kyc')}
       style={{ width: '100%', height: 30, backgroundColor: '#FFC37D', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Feather name="alert-triangle" size={15} />
        <CustomText variant="xs" color="blackText" marginLeft="s">Account is limited. Click to verify KYC</CustomText>
      </Pressable>

      <View style={{ backgroundColor: theme.textInput.backgroundColor, flex: 1 }}>
        {/* portfolio section */}
        <View style={{ width: '100%', height: (height / 100) * 25 }}>
          <Portfolio />
        </View>

        <Box backgroundColor="mainBackground" style={{ width: '100%', height: (height / 100) * 60, backgroundColor: isDarkMode ? 'black' : 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>

          <ScrollView 
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={loading} />}
          style={{ width: '100%' }} 
          contentContainerStyle={{ width: '100%', paddingBottom: 100 }}>

            {/* {!user.KYCVerified && <Compaliance />} */}


            <View style={{ paddingHorizontal: 40, paddingVertical: 20,  }}>
              {
                !isLoading && !isError && (
                  <Pressable onPress={openwhatsapp}>
                    <Box flexDirection='row' justifyContent='space-between' alignItems='center' height={60}>
                    <Box flexDirection='row'>
                      <Box width={20} height={20}>
                        <Image source={require('../../../res/gift.png')} resizeMode='contain' style={{ width: '100%', height: '100%'}} />
                      </Box>
                      <CustomText ml='s'>Sell Gift Cards</CustomText>
                    </Box>
                    <Feather name='chevron-right' size={25} color={theme.colors.text} />
                  </Box>
                  </Pressable>
                )
              }

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
                isLoading  && (
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