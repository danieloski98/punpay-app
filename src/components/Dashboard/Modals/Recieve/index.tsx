import { View, Share, ActivityIndicator } from "react-native";
import React from "react";
import { Style } from "./style";
import {
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {Box, Text as CustomText, PrimaryButton } from '../../../General'
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../../style/theme";
import { Ionicons } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg';
import { useAtom } from "jotai";
import { DarkModeAtom } from "../../../../state/states";
import useIcons from "../../../../hooks/useIcons";
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../utils/api'
import ModalWrapper from '../../../General/ModalWrapper'



interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    coin: string;
}

const RecieveModal = ({ close, coin }: IProps) => {
  
  const theme = useTheme<Theme>();
  const [darkmode] = useAtom(DarkModeAtom);
  const [c, setC] = React.useState<any>(null);
  const { getIcon, getShortName, getName, getNetwork } = useIcons()
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { isLoading, isError, data } = useQuery(['get_wallet'], () => Axios.get(`/user/wallet/${getShortName(coin as any)}`), {
    refetchOnMount: true,
    keepPreviousData: false,
    refetchInterval: 1000,
    staleTime: 100
  })

  React.useEffect(() => {
    console.log(getShortName(coin as any))
    bottomSheetRef.current?.present();
  });



  const getData = React.useCallback(() => {
    Share.share({
        message: data.data.data.deposit_address,
        title: `${getName(coin as any)} Address`
    }).then()
  }, []);
  return (
   <ModalWrapper
    ref={bottomSheetRef}
    onClose={() => close(false)}
   >
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
   </ModalWrapper>
  );
};

export default RecieveModal;
