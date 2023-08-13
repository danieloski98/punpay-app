import { Image, Pressable, Text, View, Alert } from "react-native";
import React from "react";
import { Box, Text as CustomText } from "../../../General";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../../style/theme";
import { useNavigation } from "@react-navigation/native";
import useIcons, { coinType } from "../../../../hooks/useIcons";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../state/Store";
import { Wallet } from "../../../../models/wallet";
import { currencyFormat } from "../../../../utils/currencyconverter";
import useCoin from "../../../../hooks/useCoin";
import { useQuery } from "@tanstack/react-query";
import STAT from "../../../../utils/stats";
import { IStat } from "../../../../models/Stat";

interface IProps {
 countryCurrency: number;
}

const CoinTypeChip = ({ currency, converted_balance, balance, countryCurrency }: IProps & Wallet) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch>();
  const [usd, setUsd] = React.useState('0');
  const { getIcon, getName } = useIcons();
  const { getApiName } = useCoin(getName(currency as coinType));


  const { isLoading: coinDataLoading, data: coinData, isError } = useQuery([`getCoinDetails-${currency}`], () => STAT.get(`/coins/${getApiName()}`), {
    refetchOnMount: true,
    notifyOnChangeProps: 'all',
    onSuccess: (data) => {
      const res = data.data as IStat
      setUsd(res.market_data.current_price.usd);
    },
    onError: () => {
      Alert.alert('Error', `Couldn\'t get ${currency} usd value`);
    }
});

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
            <CustomText variant="body">{getName(currency as any) === 'Tether' ? 'USDT': getName(currency as any)} {balance}</CustomText>
            {countryCurrency === 1 && (<CustomText variant="xs">NGN {currencyFormat(parseFloat(converted_balance))}</CustomText>)}
            {countryCurrency === 2 && (<CustomText variant="xs">USD {currencyFormat(parseFloat(balance)  * parseFloat(usd))}</CustomText>)}
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
