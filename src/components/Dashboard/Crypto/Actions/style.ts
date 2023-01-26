import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  parent: {
    width: "100%",
    height: "15%",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
});
