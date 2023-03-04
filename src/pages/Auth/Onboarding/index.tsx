import React from 'react';
import { View, Dimensions, Image } from 'react-native'
import Box from '../../../components/General/Box'
import Text from '../../../components/General/Text'
import { Style } from './style'

const { width } = Dimensions.get('screen');

import Img from '../../../res/svg-output/CryptoWithdraw1'
import PrimaryButton from '../../../components/General/PrimaryButton';
import BorderButton from '../../../components/General/BorderButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Onboarding = ({ navigation }: IProps) => {
  return (
      <Box backgroundColor="mainBackground" flex={1} style={Style.parent}>
        <View style={Style.imgContainer}>
          <View style={{ paddingRight: 50}}>
          <Img width={width} height={width} />
          </View>
          <Text variant="header" marginTop="s" textAlign="left" style={Style.text} >Buy, Sell & Swap Crypto on the go</Text>
          <Text variant="bodylight" marginTop="s" textAlign="left" style={Style.text}>PunPay ensures you get the best rates and secure transactions</Text>
        </View>
        <View style={Style.btnContainer}>
          <View style={{ width: '48%', }}>
            <PrimaryButton text="Get Started" action={() => {navigation.navigate('signup')}} />
          </View>

          <View style={{ width: '48%', }}>
            <BorderButton text="Login" action={() => {navigation.navigate('login')}} />
          </View>
        </View>
      </Box>
  )
}

export default Onboarding;