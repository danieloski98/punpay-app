import { View, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import theme, { Theme } from '../../style/theme'
import Text from './Text'
import useNetwork from '../../hooks/useNetwork'
import { showMessage } from 'react-native-flash-message'

interface IProps {
    text: string;
    action: Function;
    isLoading?: boolean;
    checkNetwork?: boolean;
}

export default function PrimaryButton({ text, action, isLoading, checkNetwork = false }: IProps) {
    const { isConnected } = useNetwork();
    const theme = useTheme<Theme>();
    // const { height } = theme.button;
    const { primaryColor } = theme.colors;

    const onPress = React.useCallback(() => {
        if (checkNetwork) {
            if (isConnected) {
                if (isLoading) return;
                action();
            } else {
                showMessage({
                    message: 'No Internet connection',
                    description: 'You are currently not connected to the internet',
                    animated: true,
                    statusBarHeight: 20,
                    backgroundColor: 'red',
                    floating: false,
                    duration: 1000,
                    autoHide: true,
                });
            }
        } else {
            if (isLoading) return;
            action();
        }
       
    }, [isConnected, isLoading, checkNetwork, action]);
  return (
    <Pressable testID='primaryButton' onPress={onPress} style={{...Style.parent, height: 55, backgroundColor: primaryColor }}>
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