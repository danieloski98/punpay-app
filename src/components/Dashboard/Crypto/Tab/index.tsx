import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Theme } from '../../../../style/theme'
import { useTheme } from '@shopify/restyle'

interface IProps {
  tab: number;
  setTab: Function;
}

const CryptoTab = ({ tab, setTab }: IProps) => {

    const theme = useTheme<Theme>()
  return (
    <View style={Style.container}>
     <View style={{...Style.tab, backgroundColor: theme.textInput.backgroundColor}}>
        <Pressable onPress={() => setTab(2)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: tab === 2? theme.colors.primaryColor: 'transparent', borderRadius: 10 }}>
            <Text style={{ color: tab === 2 ? 'white':'grey'}}>TRANSACTIONS</Text>
        </Pressable>

        <Pressable onPress={() => setTab(1)} style={{ flex: 1,  justifyContent: 'center', alignItems: 'center', backgroundColor: tab === 1? theme.colors.primaryColor: 'transparent', borderRadius: 10 }}>
            <Text style={{ color: tab === 1 ? 'white':'grey'}}>MARKET INFORMATION</Text>
        </Pressable>
     </View>
    </View>
  )
}

export default CryptoTab