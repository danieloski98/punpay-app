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
import { Wallet } from "../../../../models/wallet";
import { currencyFormat } from "../../../../utils/currencyconverter";

interface IProps {
 
}

const CoinTypeChip = ({ currency, converted_balance, balance }: IProps & Wallet) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch>()
  const { getIcon, getName } = useIcons();
  console.log(currency);

  const navigate = () => {
    dispatch({ type: 'Coin/update', payload: getName(currency as any)});
    navigation.navigate("crypto", { type: getName(currency as any) });
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
            {getIcon(getName(currency as any))}
          </View>

          <View style={{ marginLeft: 10 }}>
            <CustomText variant="body">{getName(currency as any)} {balance}</CustomText>
            <CustomText variant="xs">NGN {currencyFormat(parseFloat(converted_balance))}</CustomText>
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
