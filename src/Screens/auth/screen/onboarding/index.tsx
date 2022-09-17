import React from 'react';
import { View, Dimensions } from 'react-native'
import Box from '../../../../components/generalComponents/Box'
import Text from '../../../../components/generalComponents/Text'
import { Style } from './style'

const { width } = Dimensions.get('screen');

import Img from '../../../../res/svgs/crypto-withdraw1.svg'
import PrimaryButton from '../../../../components/generalComponents/PrimaryButton';
import BorderButton from '../../../../components/generalComponents/BorderButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Onboarding: React.FC<IProps> = ({ navigation }) => {
  return (
    <Box backgroundColor="mainBackground" flex={1} style={Style.parent}>
        <View style={Style.imgContainer}>
          <Img width={width} height={width} />
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