import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        flex: 1,
    },
    imgContainer: {
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        width: '100%',
        paddingHorizontal: 20,
    },
    btnContainer: {
        flex: 0.2,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 40,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    indicators: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    }
});