import { StyleSheet } from 'react-native'
export const Style = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
        zIndex: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      contentContainer: {
        flex: 1,
      },
     conatiner: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
     },
     conatiner2: {
      flexDirection: 'column',
      borderRadius: 10,
      padding: 10,
   }
});