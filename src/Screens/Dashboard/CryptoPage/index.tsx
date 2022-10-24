import {
  View,
  Text,
  ScrollView,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import CryptoPageHeader from "../../../components/Dashboard/Crypto/Header";
import Box from "../../../components/generalComponents/Box";
import Actions from "../../../components/Dashboard/Crypto/Actions";
import { Style } from "./style";
import CryptoTab from "../../../components/Dashboard/Crypto/Tab";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import StatsTab from "../../../components/Dashboard/Crypto/Stats";
import TransactionHistory from "../../../components/Dashboard/Crypto/Transactions";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RecieveModal from "../../../components/Dashboard/Modals/Recieve";
import Swap from '../../../components/Dashboard/Modals/Swap'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const os = Platform.OS;
export const { width: SIZE } = Dimensions.get("window");
const timeline = ["24h", "7d", "2w", "1m", "6m", "1y"];

export default function CryptoPage() {
  const [time, setTime] = React.useState("24h");
  const [tab, setTab] = React.useState(2);
  const theme = useTheme<Theme>();

  // MODAL STATES
  const [showRecieve, setShowRecieve] = React.useState(false);
  const [showSwap, setShowSwap] = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box backgroundColor="mainBackground" style={{ flex: 1, zIndex: 2 }}>
        <CryptoPageHeader />
        <Actions recieve={setShowRecieve} swap={setShowSwap} />
        <CryptoTab tab={tab} setTab={setTab} />
        <View style={Style.scrollContainer}>
          {tab === 1 && <StatsTab />}
          {tab === 2 && <TransactionHistory />}
        </View>
        {/* MODALS */}
        {showRecieve && <RecieveModal close={setShowRecieve} />}
        {showSwap && <Swap close={setShowSwap} />}
        {/* END MODALS */}
      </Box>
    </GestureHandlerRootView>
  );
}
