import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 40,
    },
    amountContainer: {
        marginTop: 30,
    },
    selectContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',

        borderBottomWidth: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dropDownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    }
});