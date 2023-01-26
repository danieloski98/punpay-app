import { View, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../style/theme'
import Text from './Text'

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

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
});