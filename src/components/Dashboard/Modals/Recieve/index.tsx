import { View, Share } from "react-native";
import React from "react";
import { Style } from "./style";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop
} from "@gorhom/bottom-sheet";
import {Box, Text as CustomText, PrimaryButton } from '../../../General'
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../../style/theme";
import { Ionicons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg';


// SVGS
import Bitcoin from '../../../../res/svg-output/Bitcoin'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useAtom } from "jotai";
import { DarkModeAtom } from "../../../../state/states";
import useIcons from "../../../../hooks/useIcons";

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    coin: string;
}

const RecieveModal = ({ close, coin }: IProps) => {
  const theme = useTheme<Theme>();
  const [darkmode] = useAtom(DarkModeAtom);
  const snapPoints = React.useMemo(() => ["80%"], []);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [c, setC] = React.useState<any>(null);
  const { getIcon } = useIcons()

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  });


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


  const getData = React.useCallback(() => {
    Share.share({
        message: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
        title: 'Bitcoin Address'
    }).then()
  }, []);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={() => close(false)}
        style={{...Style.parent }}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.modalBg }}
        handleIndicatorStyle={{ width: 150, backgroundColor: darkmode ?'grey':'lightgrey' }}
      >
          <BottomSheetScrollView contentContainerStyle={Style.contentContainer}>

            <Box flexDirection='row' alignItems='center' justifyContent='center'>
                <CustomText variant='body'>Deposit { coin }</CustomText>
            </Box>
            <View style={Style.writeupContainer}>
                <CustomText variant="bodylight">
                Only send <CustomText fontWeight='bold' variant='body'>{ coin }</CustomText> to this Address, Sending any other coin will misplace your funds. Punpay cannot assist with recovering misplaced funds
                </CustomText>
            </View>

            <View style={Style.iconContainer}>
                {getIcon(coin, 50)}
            </View>

            <View style={{ ...Style.addressCointainer, borderBottomColor: theme.textInput.backgroundColor }}>
                <CustomText variant="bodylight">
                    3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
                </CustomText>
                <Ionicons name="copy-outline" size={30} color={ darkmode ? 'white':'grey'} />
            </View>

            <View style={{ ...Style.addressCointainer, borderBottomColor: theme.textInput.backgroundColor }}>
                <CustomText variant="bodylight">
                    Network
                </CustomText>
                <CustomText variant="subheader" fontSize={18}>
                    BEP20
                </CustomText>
            </View>

            <View style={Style.qrContainer}>
                <QRCode value="3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5" size={130} color="black" getRef={(c) => setC(c)}  />
            </View>

            <PrimaryButton text="Share Address" action={getData} />
          </BottomSheetScrollView>

      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default RecieveModal;
