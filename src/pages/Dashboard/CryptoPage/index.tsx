import {
  View,
  Text,
  ScrollView,
  Platform,
  Dimensions,
  Pressable,
  ActivityIndicator
} from "react-native";
import React from "react";
import CryptoPageHeader from "../../../components/Dashboard/Crypto/Header";
import {Box, Text as CustomText, PrimaryButton } from "../../../components/General";
import Actions from "../../../components/Dashboard/Crypto/Actions";
import { Style } from "./style";
import CryptoTab from "../../../components/Dashboard/Crypto/Tab";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import StatsTab from "../../../components/Dashboard/Crypto/Stats";
import TransactionHistory from "../../../components/Dashboard/Crypto/Transactions";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RecieveModal from "../../../components/Dashboard/Modals/Recieve";
import Swap from '../../../components/Dashboard/Modals/Swap'
import BuyPage from '../../../components/Dashboard/Modals/Buy'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SellPage from "../../../components/Dashboard/Modals/Sell";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Store";
import { useQuery } from "@tanstack/react-query";
import Axios from "../../../utils/api";
import { Transaction } from "../../../models/transaction";
import TransactionDetails from "../../../components/Dashboard/Modals/TransactionDetails";

const os = Platform.OS;
export const { width: SIZE } = Dimensions.get("window");
const timeline = ["24h", "7d", "2w", "1m", "6m", "1y"];

export default function CryptoPage({ route }) {
  const [time, setTime] = React.useState("24h");
  const [tab, setTab] = React.useState(2);
  const coin = useSelector((state: RootState) => state.Coin);
  const [transaction, setTransaction] = React.useState({} as Transaction);
  const theme = useTheme<Theme>();
  const { type } = route.params;

  const open = React.useCallback((trans: Transaction) => {
    setTransaction(trans);
    setShowModal(true);
  }, [transaction]);


  // MODAL STATES
  const [showRecieve, setShowRecieve] = React.useState(false);
  const [showSwap, setShowSwap] = React.useState(false);
  const [showBuy, setShowBuy] = React.useState(false);
  const [showSell, setShowSell] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
 


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box backgroundColor="mainBackground" style={{ flex: 1, zIndex: 2 }}>
        <CryptoPageHeader coinName={type} />
        <Actions recieve={setShowRecieve} swap={setShowSwap} buy={setShowBuy} sell={setShowSell} />
        <CryptoTab tab={tab} setTab={setTab} />
        <View style={Style.scrollContainer}>
          {/* {tab === 1 && <StatsTab />} */}
          {tab === 2 && <TransactionHistory type={type}  open={open}/>}
        </View>
        {/* MODALS */}
        {showRecieve && <RecieveModal close={setShowRecieve} coin={coin} />}
        {showSwap && <Swap close={setShowSwap} coin={coin} />}
        {showBuy && <BuyPage close={setShowBuy} coin={coin} />}
        {showSell && <SellPage close={setShowSell} coin={coin} />}
        {showModal && <TransactionDetails transaction={transaction} close={setShowModal} />}
        {/* END MODALS */}
      </Box>
    </GestureHandlerRootView>
  );
}
