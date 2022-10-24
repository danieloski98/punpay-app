import { View, Share } from "react-native";
import React from "react";
import { Style } from "./style";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetBackdrop
} from "@gorhom/bottom-sheet";
import CustomText from "../../../generalComponents/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../../style/theme";
import { Ionicons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg';
import PrimaryButton from '../../../generalComponents/PrimaryButton'


// SVGS
import Bitcoin from '../../../../res/svgs/Bitcoin.svg'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>
}

const RecieveModal: React.FC<IProps> = ({ close }) => {
  const theme = useTheme<Theme>();
  const darkmode = useSelector((state: RootState) => state.isDarkMode);
  const snapPoints = React.useMemo(() => ["80%"], []);
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [c, setC] = React.useState<any>(null);

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
            <View style={Style.writeupContainer}>
                <CustomText variant="bodylight">
                Only send Bitcoin to this Address, Sending any other coin will misplace your funds. Punpay cannot assist with recovering misplaced funds
                </CustomText>
            </View>

            <View style={Style.iconContainer}>
                <Bitcoin width={60} height={60} />
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
                    BEP
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
