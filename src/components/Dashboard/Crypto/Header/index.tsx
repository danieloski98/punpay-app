import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'

// svg
import Bitcoin from '../../../../res/svgs/Bitcoin.svg';
import CustomText from '../../../generalComponents/Text';
import theme, { Theme } from '../../../../style/theme';
import { useTheme } from '@shopify/restyle';
import Box from '../../../generalComponents/Box';

const os = Platform.OS;

const CryptoPageHeader = () => {
    const theme = useTheme<Theme>();
  return (
    <Box style={Style.container} backgroundColor="mainBackground">
        {/* LEFT HEADER SECTION */}
      <View style={Style.left}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <View style={Style.imgCircle}>
            <Bitcoin width={24} height={24} />
        </View>
        <View>
            <CustomText variant="subheader" style={{ fontWeight: 'bold', fontSize: 18 }}>Bitcoin</CustomText>
            <CustomText variant="bodylight" style={{ fontWeight: '400', color: theme.colors.text }}>BTC</CustomText>
        </View>
      </View>
      <View style={Style.right}>
        <CustomText style={{ color: theme.colors.text }}>YOUR BALANCE</CustomText>
        <CustomText variant="subheader" style={{ fontSize: 18, textAlign: 'left' }}>0.034BTC</CustomText>
      </View>
    </Box>
  )
}

export default CryptoPageHeader