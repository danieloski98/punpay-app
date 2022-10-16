import React from 'react';
import { Pressable, View } from 'react-native';
import Box from '../../../generalComponents/Box'
import CustomText from '../../../generalComponents/Text';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
// import { Container } from './styles';

interface IProps {
    coin: string;
    type: number;
}

const CryptoCard: React.FC<IProps> = ({ coin, type }) => {
  const navigation = useNavigation<any>();

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
    <Box width="100%" height={100} backgroundColor="mainBackground">
      <Pressable 
      onPress={() => navigation.navigate('transactiontype', {
        title: `${switchType()} CRYPTO`,
      })}
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:"center", flex:1 }}>

        <Box marginTop="m" flexDirection="row" alignItems="center">
            <Box width={60} height={60} borderRadius={30} style={{ backgroundColor: 'orange' }} />
            <CustomText marginLeft="m">{coin}</CustomText>
        </Box>

        <Feather name="chevron-right" size={30} />

      </Pressable>
    </Box>
  )
}

export default CryptoCard;