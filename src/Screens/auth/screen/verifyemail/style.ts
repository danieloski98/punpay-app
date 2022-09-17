import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    text: {
        width: '100%',
        height: '40%',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    box: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inbox: {
        width: 56,
        height: 56,
        borderRadius: 5,
        textAlign: 'center'
    },
    btnC: {
        marginTop: 25,
    },
    textBox: {
        marginTop: 20,
        paddingBottom: 50
    },
    checkbox: {
        marginTop: 10,
        flexDirection: 'row',
    }
});