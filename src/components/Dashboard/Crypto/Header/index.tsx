import { View, Text, Platform, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'

// svg
import {Box, Text as CustomText} from '../../../General'
import theme, { Theme } from '../../../../style/theme';
import { useTheme } from '@shopify/restyle';
import { useNavigation } from '@react-navigation/native';
import useIcons from '../../../../hooks/useIcons'
import Axios from '../../../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { currencyFormat } from '../../../../utils/currencyconverter'

const CryptoPageHeader = ({ coinName }) => {
    const theme = useTheme<Theme>();
    const navigation = useNavigation();
    const { getIcon, getShortName } = useIcons();

    // get the users coin details
  const { isLoading, data, isError } = useQuery(['getCoin'], () => Axios.get(`/user/wallet/${getShortName(coinName)}`), {
    refetchOnMount: true,
    onSuccess: (data) => {
      console.log(data.data)
    },
    onError: (error) => {
      Alert.alert('An error occured');
      navigation.goBack();
    }
  })

  return (
    <Box style={Style.container} backgroundColor="mainBackground">
        {/* LEFT HEADER SECTION */}
      <View style={Style.left}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} onPress={() => navigation.goBack()} />
        <View style={Style.imgCircle}>
            {getIcon(coinName, '70%')}
        </View>
        <View>
            <CustomText variant="subheader" style={{ fontWeight: 'bold', fontSize: 18 }}>{coinName}</CustomText>
            {/* <CustomText variant="bodylight" style={{ fontWeight: '400', color: theme.colors.text }}>BTC</CustomText> */}
        </View>
      </View>
      <View style={Style.right}>
        <CustomText style={{ color: theme.colors.text }}>YOUR BALANCE</CustomText>
       {!isLoading && !isError &&  <CustomText variant="subheader" style={{ fontSize: 18, textAlign: 'left' }}>{data.data.data.balance}{getShortName(coinName)}</CustomText>}
       {isLoading && <ActivityIndicator size="small" color={theme.colors.primaryColor} />}
        {/* <ActivityIndicator size="small" color={theme.colors.primaryColor} /> */}
        {!isLoading && !isError &&  <CustomText variant="body" style={{ fontSize: 18, textAlign: 'left' }}>{currencyFormat(parseFloat(data.data.data.converted_balance))}NGN</CustomText>}
      </View>
    </Box>
  )
}

export default CryptoPageHeader