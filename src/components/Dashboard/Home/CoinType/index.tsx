import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { Box, Text as CustomText } from "../../../General";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../../style/theme";
import { useNavigation } from "@react-navigation/native";
import useIcons from "../../../../hooks/useIcons";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../state/Store";

interface IProps {
  coinName: string;
}

const CoinTypeChip = ({ coinName }: IProps) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch>()
  const { getIcon } = useIcons();

  const navigate = () => {
    dispatch({ type: 'Coin/update', payload: coinName});
    navigation.navigate("crypto", { type: coinName });
  }

  return (
    <>
      <Pressable
        onPress={navigate}
        style={{
          flexDirection: "row",
          height: 80,
          alignItems: "center",
          width: "100%",
          borderBottomColor: theme.textInput.backgroundColor,
          borderBottomWidth: 2,
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "transparent",
            }}
          >
            {getIcon(coinName)}
          </View>

          <View style={{ marginLeft: 10 }}>
            <CustomText variant="body">{coinName}</CustomText>
            <CustomText variant="xs">$0.00</CustomText>
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <Feather name="chevron-right" size={25} color={theme.colors.text} />
        </View>
      </Pressable>
    </>
  );
};

export default CoinTypeChip;
