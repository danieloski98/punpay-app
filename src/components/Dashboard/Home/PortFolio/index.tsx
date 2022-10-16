import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style} from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import CustomText from '../../../generalComponents/Text'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// svgs
import ArrowDown from '../../../../res/svgs/arrow-down.svg';
import ArrowUp from "../../../../res/svgs/arrow-up.svg";
import Arrows from '../../../../res/svgs/arrows.svg';
import Wallet from '../../../../res/svgs/wallet.svg';

export default function Portfolio() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();

  return (
    <View style={{...Style.parent, backgroundColor: theme.textInput.backgroundColor }}>
      <CustomText variant="bodylight" textAlign="center" textTransform="uppercase">Portfolio Balance</CustomText>
      <CustomText variant="header" textAlign="center" textTransform="uppercase" marginTop="l" style={{ fontSize: 40 }}>$333,000</CustomText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 20 }}>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', {
                    type: 'Recieve'
                })}
                style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <ArrowDown width={25} height={25} />
            </Pressable>
            <CustomText variant="body">Recieve</CustomText>
        </View>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', { type: 'Send'})}
                style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <ArrowUp width={25} height={25} />
            </Pressable>
            <CustomText variant="body">Sell</CustomText>
        </View>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Buy'})}
            style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Arrows width={25} height={25} />
            </View>
            <CustomText variant="body">Buy</CustomText>
        </Pressable>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Swap'})}
            style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Wallet width={25} height={25} />
            </View>
            <CustomText variant="body">Swap</CustomText>
        </Pressable>

      </View>
    </View>
  )
}