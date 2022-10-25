import { View, Text, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../../../generalComponents/Text'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import { useNavigation } from '@react-navigation/native'

// svgs
import Bitcoin from '../../../../res/svgs/Bitcoin.svg'
import Bnd from '../../../../res/svgs/bnd.svg'
import Eth from '../../../../res/svgs/eth.svg'
import Xrp from '../../../../res/svgs/xrp.svg'

interface IProps {
    coinName: string;
}

const CoinTypeChip: React.FC<IProps> = ({ coinName }) => {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>();


  return (
    <Pressable onPress={() => navigation.navigate('crypto', { type: coinName })} style={{ flexDirection: 'row', height: 80, alignItems: 'center', width: '100%',  borderBottomColor: theme.textInput.backgroundColor, borderBottomWidth: 2 }}>

    <View style={{ flexDirection: 'row', flex: 1 }}>
     <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: theme.colors.primaryColor }}>
      <Eth width={50} height={50} />
     </View>

     <View style={{ marginLeft: 10 }}>
       <CustomText variant="body">{coinName}</CustomText>
       <CustomText variant="xs">$0.00</CustomText>
     </View>
    </View>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
       <Feather name="chevron-right" size={25} color={theme.colors.text} />
    </View>

   </Pressable>
  )
}

export default CoinTypeChip