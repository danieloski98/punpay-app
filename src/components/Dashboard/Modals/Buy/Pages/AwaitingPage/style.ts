import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        fontSize: 20,
    },
    inputCointainer: {
        width: '100%',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    network: {
        width: '100%',
        alignItems: 'center',
    },
    netwrokContainer: {
        width: '50%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    accountContainer: {
        paddingVertical: 20,
        borderBottomWidth: 2,
    }
});