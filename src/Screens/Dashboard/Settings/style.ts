import { StyleSheet } from 'react-native'
export const Style = StyleSheet.create({
    header: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 20
    },
    imgc: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
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