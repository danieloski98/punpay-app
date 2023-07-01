import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../style/theme'
import Text from './Text'
import useNetwork from '../../hooks/useNetwork'
import { showMessage } from 'react-native-flash-message'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/Store'

interface IProps {
    text: string;
    action: Function;
    height?: number|string;
    radius?: number;
    isLoading?: boolean;
    checkNetwork?: boolean;

}

export default function PrimaryButton({ text, action, height, radius = 10, isLoading = false, checkNetwork = false }: IProps) {
    const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
    const { isConnected } = useNetwork();
    const theme = useTheme<Theme>();
    const { height:btnH } = theme.button;
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
    <Pressable onPress={onPress} style={{...Style.parent, height: height ? height:btnH, borderColor: isDarkMode ? 'white' : primaryColor, borderRadius: radius, }}>
        {!isLoading && <Text variant="body" style={{ color: isDarkMode ? 'white': primaryColor }}>{text}</Text>}
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