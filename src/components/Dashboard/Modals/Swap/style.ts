import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
    parent: {
        flex: 1,
        padding: 20,
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
      writeupContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#ff886038',
        borderRadius: 10,
        marginTop: 20,
      },
      iconContainer: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      addressCointainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
      },
      qrContainer: {
        width: '100%',
        height: 160,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
      }
});