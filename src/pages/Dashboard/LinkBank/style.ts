import { StyleSheet } from "react-native";
export const Style = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  backContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  disclaimerBox: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ff886049',
    marginTop: 30,
  },
  textInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
