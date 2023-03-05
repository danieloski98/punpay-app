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
import * as Clipboard from 'expo-clipboard'
import {useToast} from 'react-native-toast-notifications'



interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    coin: string;
}

const RecieveModal = ({ close, coin }: IProps) => {
  
  const theme = useTheme<Theme>();
  const [darkmode] = useAtom(DarkModeAtom);
  const [address, setAddress] = React.useState('');
  const [c, setC] = React.useState<any>(null);
  const { getIcon, getShortName, getName, getNetwork } = useIcons()
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const toast = useToast();

  console.log(coin);
  const { isLoading, isError } = useQuery(['get_wallet'], () => Axios.get(`/user/wallet/${getShortName(coin as any)}`), {
    refetchOnMount: true,
    refetchInterval: 100,
    onSuccess: (data) => {
      console.log(data.data);
      setAddress(data.data.data.deposit_address);
    }
  })

  const copyAddress = React.useCallback(async() => {
    if (!isLoading) {
      await Clipboard.setStringAsync(address);
      toast.show(`${coin} Address copied`);
    } else {
      toast.show('Address loding');
    }
  }, [])

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  });



  const getData = React.useCallback(() => {
    if (!isLoading && address !== '') {
      Share.share({
        message: address,
        title: `${getName(coin as any)} Address`
    }).then()
    }
  }, [coin, address]);
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
                {!isLoading && !isError && address !== '' && (
                  <CustomText variant="xs" selectable selectionColor={theme.colors.primaryColor} style={{ flex: 1 }}>
                      {address}
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
               {!isLoading && address !== '' && <Ionicons name="copy-outline" onPress={copyAddress} size={30} color={theme.colors.primaryColor} style={{ width: 30 }} />}
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

            {!isLoading && !isError && address !== '' && (
              <View style={Style.qrContainer}>
                <QRCode value={address} size={130} color="black" getRef={(c) => setC(c)}  />
              </View>
            )}

            <PrimaryButton text="Share Address" action={getData} isLoading={isLoading} />
   </ModalWrapper>
  );
};

export default RecieveModal;
