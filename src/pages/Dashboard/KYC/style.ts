import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    conatiner: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
     },
     header: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        
    }
});