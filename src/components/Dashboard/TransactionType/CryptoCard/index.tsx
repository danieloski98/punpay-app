import React from 'react';
import { Pressable, View, Text } from 'react-native';
import {Box, Text as CustomText} from '../../../General'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Eth from '../../../../res/svg-output/Eth'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
// import { Container } from './styles';

interface IProps {
    coin: string;
    type: number;
    callback: () => void;
    setCoin: (coin: string) => void;
}

const CryptoCard = ({ coin, type, callback, setCoin }: IProps) => {
  const navigation = useNavigation<any>();
  const theme = useTheme<Theme>()

  const switchType = React.useCallback(() => {
    switch(type) {
      case 1: {
        return 'BUY';
      }
      case 2: {
        return 'SELL';
      }
      case 3: {
        return 'SWAP';
      }
      case 4: {
        return 'RECIEVE';
      }
    }
  }, [])
  return (
    // <Text>Hello There people</Text>
    <Box width="100%" height={100} backgroundColor="mainBackground">
      <Pressable 
      onPress={() => {setCoin(coin); callback();}}
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:"center", flex:1 }}>

        <Box flexDirection="row" alignItems="center">
            <Box width={60} height={60} marginTop="m" >
              <Eth width={60} height={60} />
            </Box>
            <CustomText marginLeft="m">{coin}</CustomText>
        </Box>

        <Feather name="chevron-right" size={30} color={theme.colors.text} />

      </Pressable>
    </Box>
  )
}

export default CryptoCard;