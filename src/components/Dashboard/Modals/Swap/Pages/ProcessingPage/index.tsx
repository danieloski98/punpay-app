import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { Style } from './style'
import CustomText from '../../../../../generalComponents/Text'
import Hour from '../../../../../../res/svgs/hour.svg';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../../../style/theme';
import PrimaryButton from '../../../../../generalComponents/PrimaryButton';

const ProcessingPage = () => {
    const theme = useTheme<Theme>()
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <CustomText variant="subheader" style={{ fontSize: 20 }}>Transaction Processing</CustomText>
      <CustomText variant="bodylight">Your transaction is been processed</CustomText>

      <View style={{ width: '100%', height: 250 }}>
        <Image source={require('../../../../../../res/svgs/hourp.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain"  />
      </View>

      <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Hash</CustomText>
        <CustomText variant="bodylight" style={{ fontSize: 16 }}>
        0xb4bc263278d3f77a652a8d73a6bfd8ec0ba1a63923bbb4f38147fb8a943da26d
        </CustomText>
      </View>

      <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Recipient</CustomText>
        <CustomText variant="bodylight" style={{ fontSize: 16 }}>
        0xb4bc263278d3f77a652a8d73
        </CustomText>
      </View>

      <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
        <CustomText variant="bodylight" style={{ fontSize: 16 }}>
        NGN8,600 ($10)
        </CustomText>
      </View>

      <View>
        <PrimaryButton text="Done" action={() => {}} />
      </View>
    </View>
  )
}

export default ProcessingPage