import { View, Share, ActivityIndicator } from "react-native";
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
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../utils/api'

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
  const { getIcon, getShortName, getName, getNetwork } = useIcons()
  const { isLoading, isError, data } = useQuery(['get_wallet'], () => Axios.get(`/user/wallet/${getShortName(coin as any)}`), {
    refetchOnMount: true
  })
  // console.log(data.data.data.deposit_address);

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
        message: data.data.data.deposit_address,
        title: `${getName(coin as any)} Address`
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
                {!isLoading && !isError && (
                  <CustomText variant="xs" style={{ flex: 1 }}>
                      {data.data.data.deposit_address}
                  </CustomText>
                )}
                {
                  isLoading && (
                    <Box justifyContent='center' alignItems='center' width='100%'>
                      <ActivityIndicator color={theme.colors.primaryColor} size='small' />
                    </Box>
                  )
                }
               <Box width={50} alignItems='flex-end'>
               <Ionicons name="copy-outline" size={30} color={ darkmode ? 'white':theme.colors.primaryColor} style={{ width: 30 }} />
               </Box>
            </View>

            <View style={{ ...Style.addressCointainer, borderBottomColor: theme.textInput.backgroundColor }}>
                <CustomText variant="bodylight">
                    Network
                </CustomText>
                <CustomText variant="subheader" fontSize={18}>
                    {getNetwork(coin as any)}
                </CustomText>
            </View>

            {!isLoading && !isError && (
              <View style={Style.qrContainer}>
                <QRCode value={data.data.data.deposit_address} size={130} color="black" getRef={(c) => setC(c)}  />
              </View>
            )}

            <PrimaryButton text="Share Address" action={getData} />
          </BottomSheetScrollView>

      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default RecieveModal;
