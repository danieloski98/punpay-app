import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: 'red',
        paddingTop: 20,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});