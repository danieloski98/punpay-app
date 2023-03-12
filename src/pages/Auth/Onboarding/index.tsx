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
import PagerView, { PagerViewOnPageScrollEvent, PagerViewOnPageSelectedEvent, PageScrollStateChangedNativeEvent } from 'react-native-pager-view';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../style/theme';


interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

const Onboarding = ({ navigation }: IProps) => {
  const [postion, setPostion] = React.useState(0);
  const theme = useTheme<Theme>();
  return (
      <Box backgroundColor="mainBackground" flex={1} style={Style.parent}>
        <View style={Style.imgContainer}>
          <View>
            <Image source={require('../../../res/logo2.png')} style={{ width: 80, height: 80 }} resizeMode='contain' />
          </View>
          <View style={{ paddingRight: 0, height: '60%', width: '100%' }}>

          <PagerView style={{ flex: 1, alignItems: 'center' }} orientation='horizontal' initialPage={0} transitionStyle='scroll' onPageScroll={(e:PagerViewOnPageScrollEvent) =>  setPostion(e.nativeEvent.position)}>
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
              <Image source={require('../../../res/phone1.png')} resizeMode='contain' style={{ width: '80%', height: '100%'}} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
              <Image source={require('../../../res/phone2.png')} resizeMode='contain' style={{ width: '80%', height: '100%'}} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
              <Image source={require('../../../res/phone3.png')} resizeMode='contain' style={{ width: '80%', height: '100%'}} />
            </View>
          </PagerView>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={[Style.indicators, { backgroundColor: postion === 0 ? theme.colors.primaryColor: 'lightgrey' }]}></View>
            <View style={[Style.indicators, { backgroundColor: postion === 1 ? theme.colors.primaryColor: 'lightgrey' }]}></View>
            <View style={[Style.indicators, { backgroundColor: postion === 2 ? theme.colors.primaryColor: 'lightgrey'}]}></View>
          </View>

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