import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'flex-end',
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