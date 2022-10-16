import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    container: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: 'grey',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        paddingTop: 20,
        elevation: 3,
        zIndex: 10,
    },
    imgCircle: {
        width: 42,
        height: 42,
        borderRadius: 22,
        borderWidth: 1.5, 
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
    right: {
        height: '100%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});