import { View, Pressable } from "react-native";
import React from "react";
import { Style } from "./style";
import { Box, Text as CustomText, PrimaryButton } from "../../../components/General";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../style/theme";
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { DarkModeAtom } from '../../../state/states'

// svgs
import UserO from "../../../res/svg-output/Usero";
import CardEdit from "../../../res/svg-output/CardEdit";
import Keyboard from "../../../res/svg-output/Keyboard";
import Identify from "../../../res/svg-output/Identity";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Store";
import { useAtom } from "jotai";
import VerificationModal from "../../../components/Dashboard/Modals/VerificationModal";

export default function KYC() {
  const theme = useTheme<Theme>();
  // const modalRef = React.useRef<BottomSheetModal>(null);
  // const snapPoints = React.useMemo(() => ["80%", "80%"], []);
  // const [darkmode,] = useAtom(DarkModeAtom)
  const [openModal, setOpenModal] = React.useState(false);
  const [type, setType] = React.useState('');

  const open = React.useCallback((type: string) => {
    setType(type);
    setOpenModal(true);
  }, [type]);


  return (
    <Box backgroundColor="mainBackground" style={Style.parent}>

      <CustomText variant="subheader">Verify Document</CustomText>
      <CustomText variant="bodylight" mt="m">
        Financial compliance laws require us to verify your identity in order
        for you to use our services
      </CustomText>

      <View style={{ height: 40 }}></View>

      <Pressable
        onPress={() => open('nin')}
        style={{
          ...Style.conatiner,
          backgroundColor: theme.textInput.backgroundColor,
        }}
      >
        <UserO width={25} height={25} />
        <CustomText variant="bodylight" ml="m">
          NIN
        </CustomText>
      </Pressable>

      <Pressable
        onPress={() => open('drivers-lincence')}
        style={{
          ...Style.conatiner,
          backgroundColor: theme.textInput.backgroundColor,
          marginTop: 20,
        }}
      >
        <CardEdit width={25} height={25} />
        <CustomText variant="bodylight" ml="m">
          Drivers Lincence
        </CustomText>
      </Pressable>

      <Pressable
        onPress={() => open('passport')}
        style={{
          ...Style.conatiner,
          backgroundColor: theme.textInput.backgroundColor,
          marginTop: 20,
        }}
      >
        <Keyboard width={25} height={25} />
        <CustomText variant="bodylight" ml="m">
          Passport
        </CustomText>
      </Pressable>

      {openModal && <VerificationModal type={type} close={setOpenModal} />}

    </Box>
  );
}
