import { View, Pressable } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Text from '../Text'

interface IProps {
    text: string;
    action: Function;
}

export default function PrimaryButton({ text, action }: IProps) {
    const theme = useTheme<Theme>();
    const { height } = theme.button;
    const { primaryColor } = theme.colors;
  return (
    <Pressable onPress={() => action()} style={{...Style.parent, height, borderColor: primaryColor }}>
        <Text variant="body" style={{ color: primaryColor }}>{text}</Text>
    </Pressable>
  )
}