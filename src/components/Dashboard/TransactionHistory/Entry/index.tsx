import { View, Text } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import CustomText from '../../../generalComponents/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'

interface IProps {
    type: 'BUY' | 'SELL' | 'SWAP';
}

export default function TransactionEntry({ type }: IProps) {
    const theme = useTheme<Theme>()

    const icon = () => {
        switch(type) {
            case 'BUY': {
                return <Feather  name="plus" size={20} color={theme.colors.text} />
            }
            case 'SELL': {
                return <Feather  name="arrow-right" size={20} color={theme.colors.text} />
            }
            case 'SWAP': {
                return <Feather  name="refresh-ccw" size={20} color={theme.colors.text} />
            }
        }
    }

    const title = () => {
        switch(type) {
            case 'BUY': {
                return 'Recieved'
            }
            case 'SELL': {
                return 'Sent'
            }
            case 'SWAP': {
                return 'Swap'
            }
        }
    }

  return (
    <View style={Style.parent}>
      <View style={Style.left}>
        <View style={{ width: 40 , height: 40, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
            {icon()}
        </View>
        <View style={{ marginLeft: 10}}>
            <CustomText variant="body">{title()}</CustomText>
            <CustomText variant="xs">Apr 20, 1:33 PM</CustomText>
        </View>
      </View>
      <View style={Style.right}>
        <CustomText variant="body">0.092 BTC</CustomText>
      </View>
    </View>
  )
}