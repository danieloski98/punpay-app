import { View, Text, Platform, ActivityIndicator } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'

// svg
import Bitcoin from '../../../../res/svg-output/Bitcoin';
import {Box, Text as CustomText} from '../../../General'
import theme, { Theme } from '../../../../style/theme';
import { useTheme } from '@shopify/restyle';
import { useNavigation } from '@react-navigation/native';
import useIcons from '../../../../hooks/useIcons'

const os = Platform.OS;

const CryptoPageHeader = ({ coinName }) => {
    const theme = useTheme<Theme>();
    const navigation = useNavigation();
    const { getIcon, getShortName } = useIcons();
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
        <CustomText variant="subheader" style={{ fontSize: 18, textAlign: 'left' }}>0.000{getShortName(coinName)}</CustomText>
        {/* <ActivityIndicator size="small" color={theme.colors.primaryColor} /> */}
      </View>
    </Box>
  )
}

export default CryptoPageHeader