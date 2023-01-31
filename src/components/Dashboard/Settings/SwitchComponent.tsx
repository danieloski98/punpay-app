import React from "react";
import { Box } from "../../General";
import CustomText from "../../General/Text";
import { Pressable, StyleSheet, Switch } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  type: "LINK" | "SWITCH";
  title: string;
  onChange?: () => void;
  link?: string;
  isChecked?: boolean;
}
const ElevatedComponent: React.FC<IProps> = ({
  type,
  title,
  isChecked,
  link,
  onChange,
}) => {
  const navigation = useNavigation<any>();

  const theme = useTheme<Theme>();
  if (type === "SWITCH") {
    return (
      <Box
        backgroundColor="mainBackground"
        style={{
          ...Style.elevatedBtn,
          backgroundColor: theme.textInput.backgroundColor,
          marginTop: 20,
        }}
      >
        <CustomText variant="bodylight">{title}</CustomText>
        <Switch onChange={onChange} value={isChecked} thumbColor={theme.colors.primaryColor} ios_backgroundColor={theme.colors.mainBackground} trackColor={{ true: 'lightgrey', false: 'lightgrey' }} />
      </Box>
    );
  }
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(link);
      }}
      style={{
        ...Style.elevatedBtn,
        backgroundColor: theme.textInput.backgroundColor,
        marginTop: 20,
      }}
    >
      <CustomText variant="bodylight">{title}</CustomText>
      <Feather name="chevron-right" size={25} color={theme.colors.text} />
    </Pressable>
  );
};

const Style = StyleSheet.create({
  elevatedBtn: {
    height: 60,
    borderRadius: 60,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
export default ElevatedComponent;
