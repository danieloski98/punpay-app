import { backgroundColor } from '@shopify/restyle';
import { StyleSheet } from 'react-native'
export const Style = StyleSheet.create({
    header:{
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingBottom: 60,
        paddingHorizontal: 20
    },
    input: {
        width: 20,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
    }
});