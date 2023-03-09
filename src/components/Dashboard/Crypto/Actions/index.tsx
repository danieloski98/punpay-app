import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style} from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import {Box, Text as CustomText} from '../../../General'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../../state/Store'

// svgs
import ArrowDown from '../../../../res/svg-output/ArrowDown';
import ArrowUp from "../../../../res/svg-output/ArrowUp";
import Arrows from '../../../../res/svg-output/Arrows';
import Wallet from '../../../../res/svg-output/Wallet';
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface IProps {
    recieve: React.Dispatch<React.SetStateAction<boolean>>;
    swap: React.Dispatch<React.SetStateAction<boolean>>;
    buy: React.Dispatch<React.SetStateAction<boolean>>;
    sell: React.Dispatch<React.SetStateAction<boolean>>;
}

const Actions = ({ recieve, swap, buy, sell }) => {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();
    const isDrakmode = useSelector((state: RootState) => state.isDarkMode);
    const coin = useSelector((state: RootState) => state.Coin);

    console.log(coin);

  return (
    <Box backgroundColor="mainBackground" style={{...Style.parent, zIndex: -3, borderBottomColor: theme.textInput.backgroundColor, }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center', marginTop: 0 }}>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => recieve(true)}
                style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <ArrowDown width={25} height={25} style={{ marginLeft: 7 }} />
            </Pressable>
            <CustomText variant="body">Recieve</CustomText>
        </View>

        <View style={{ alignItems: 'center' }}>
            <Pressable 
                onPress={() => sell(true)}
                style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <ArrowUp width={25} height={25} style={{ marginLeft: 7 }} />
            </Pressable>
            <CustomText variant="body">Sell</CustomText>
        </View>

        <Pressable 
            onPress={() => buy(true)}
            style={{ alignItems: 'center' }}>
            <View style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                <Arrows width={20} height={30} />
            </View>
            <CustomText variant="body">Buy</CustomText>
        </Pressable>

        {coin !== 'Tether' && (
            <Pressable 
            onPress={() => swap(true)}
            style={{ alignItems: 'center' }}>
                <View style={{...Style.actionIconContainer, backgroundColor: isDrakmode ? theme.textInput.backgroundColor:'white', shadowColor: 'black' }}>
                    <Wallet width={25} height={25} />
                </View>
                <CustomText variant="body">Swap</CustomText>
            </Pressable>
        )}

      </View>
    </Box>
  )
}

export default Actions;