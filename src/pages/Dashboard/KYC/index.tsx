import { View, Pressable } from "react-native";
import React from "react";
import { Style } from "./style";
import {Box, Text as CustomText, PrimaryButton } from "../../../components/General";
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

export default function KYC() {
  const theme = useTheme<Theme>();
  const modalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["80%", "80%"], []);
  const [darkmode,] = useAtom(DarkModeAtom)

  const open = React.useCallback(() => {
    modalRef.current?.present();
  }, []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    // bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const renderBackdrop = React.useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <Box backgroundColor="mainBackground" style={Style.parent}>

      <CustomText variant="subheader">Verify Document</CustomText>
      <CustomText variant="bodylight" mt="m">
        Financial compliance laws require us to verify your identity in order
        for you to use our services
      </CustomText>

      <View style={{ height: 40 }}></View>

      <Pressable
        onPress={() => open()}
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
        onPress={() => open()}
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
        onPress={() => open()}
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

      <BottomSheetModalProvider>
        <BottomSheetModal
           ref={modalRef}
           snapPoints={snapPoints}
           onChange={handleSheetChanges}
           onDismiss={() => {}}
           style={{ flex: 1 }}
           backdropComponent={renderBackdrop}
           backgroundStyle={{ backgroundColor: theme.colors.modalBg }}
           handleIndicatorStyle={{ width: 150, backgroundColor: darkmode ?'grey':'lightgrey' }}
        >
          <BottomSheetView style={{ paddingTop: 80, paddingHorizontal: 20 }}>
            <CustomText variant="subheader">Identity Verified Successfully</CustomText>

            <View style={{ alignItems: 'center'}}>
              <Identify width={300} height={300} />
            </View>

            <CustomText variant="bodylight" mb="l">Your Identity is now fully verified. All limits have been lifted from your account.</CustomText>

            <PrimaryButton text="Back to dashboard" action={() => {}} />

          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Box>
  );
}
