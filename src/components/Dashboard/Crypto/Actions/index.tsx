import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style} from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import CustomText from '../../../generalComponents/Text'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../../state/Store'

// svgs
import ArrowDown from '../../../../res/svgs/arrow-down.svg';
import ArrowUp from "../../../../res/svgs/arrow-up.svg";
import Arrows from '../../../../res/svgs/arrows.svg';
import Wallet from '../../../../res/svgs/wallet.svg';
import Box from '../../../generalComponents/Box'

export default function Actions() {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    const isDrakmode = useSelector((state: RootState) => state.isDarkMode);

  return (
    <Box backgroundColor="mainBackground" style={{...Style.parent, zIndex: 1, borderBottomColor: theme.textInput.backgroundColor }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 0 }}>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', {
                    type: 'Recieve'
                })}
                style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <ArrowDown width={25} height={25} />
            </Pressable>
            <CustomText variant="body">Recieve</CustomText>
        </View>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => navigation.navigate('transactiontype', { type: 'Send'})}
                style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <ArrowUp width={25} height={25} />
            </Pressable>
            <CustomText variant="body">Sell</CustomText>
        </View>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Buy'})}
            style={{ alignItems: 'center' }}>
            <View style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <Arrows width={25} height={25} />
            </View>
            <CustomText variant="body">Buy</CustomText>
        </Pressable>

        <Pressable 
            onPress={() => navigation.navigate('transactiontype', { type: 'Swap'})}
            style={{ alignItems: 'center' }}>
            <View style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <Wallet width={25} height={25} />
            </View>
            <CustomText variant="body">Swap</CustomText>
        </Pressable>

      </View>
    </Box>
  )
}