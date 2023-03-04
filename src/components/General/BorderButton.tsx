import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../style/theme'
import Text from './Text'

interface IProps {
    text: string;
    action: Function;
    height?: number|string;
    radius?: number;
    isLoading?: boolean;
}

export default function PrimaryButton({ text, action, height, radius = 10, isLoading = false }: IProps) {
    const theme = useTheme<Theme>();
    const { height:btnH } = theme.button;
    const { primaryColor } = theme.colors;
  return (
    <Pressable onPress={() => action()} style={{...Style.parent, height: height ? height:btnH, borderColor: primaryColor, borderRadius: radius, }}>
        {!isLoading && <Text variant="body" style={{ color: primaryColor }}>{text}</Text>}
        {isLoading && <ActivityIndicator size="small" color={theme.colors.primaryColor} />}
    </Pressable>
  )
}

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
});