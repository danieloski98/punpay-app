import { View, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import theme, { Theme } from '../../style/theme'
import Text from './Text'
import { useFormikContext } from 'formik'

interface IProps {
    text: string;
    isLoading?: boolean;
}

export default function Submit({ text, isLoading }: IProps) {
    const theme = useTheme<Theme>();
    // const { height } = theme.button;
    const { primaryColor } = theme.colors;
    const { handleSubmit } = useFormikContext();
  return (
    <Pressable testID='primaryButton' onPress={() => handleSubmit()} style={{...Style.parent, height: 55, backgroundColor: primaryColor }}>
        {!isLoading && <Text variant="body" style={{...Style.text}}>{text}</Text>}
        {isLoading && <ActivityIndicator color="white" size="large" />} 
    </Pressable>
  )
}

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        color: 'white',
    }
});