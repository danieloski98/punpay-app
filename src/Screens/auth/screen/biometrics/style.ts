import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    first: {
        width: '100%',
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    second: {
        width: '100%',
        height: '15%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imgBox: {
        height: '45%',
        width: '100%',
    },
    last: {
        height: '25%',
    },
    elevatedBtn: {
        height: 60,
        borderRadius: 60,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {width: 0, height: 0},
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});