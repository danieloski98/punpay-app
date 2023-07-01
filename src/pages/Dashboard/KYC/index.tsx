import { View, Pressable, ActivityIndicator, Image } from "react-native";
import React from "react";
import { Style } from "./style";
import { Box, Text as CustomText, PrimaryButton } from "../../../components/General";
import { useTheme } from "@shopify/restyle";
import theme, { Theme } from "../../../style/theme";
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { DarkModeAtom } from '../../../state/states'
import { Feather } from '@expo/vector-icons'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/Store";
import { Alert, NativeEventEmitter, NativeModules } from 'react-native'
import { VerificationModel } from "../../../models/verification";
// import { MetaMapRNSdk } from 'react-native-metamap-sdk';





export default function KYC({ navigation }: { navigation: any }) {
  const user = useSelector((state: RootState) => state.User);
  const darkMode = useSelector((state: RootState) => state.isDarkMode);
  const [verificationUploaded, setVerificationUpload] = React.useState(false);

  const queryClient = useQueryClient();


  // get verification
  const { isLoading, data, isError, refetch } = useQuery(['getVerification'], () => Axios.get('/verification'), {
    onSuccess: (data) => {
      setVerificationUpload(true);
    },
    onError: (error: any) => {
      setVerificationUpload(false);
    }
  });

  // const handleMetaMapClickButton = () => {

  if (!isLoading && isError) {
    return (
      <Box flex={1}>
        <CustomText variant='subheader'>Error occured</CustomText>
        <CustomText variant='body' textAlign='center' marginTop='s'>An error occured while trying to get your verification Details, please try again</CustomText>

        <PrimaryButton action={() => refetch()} text="Retry" checkNetwork isLoading={isLoading} />
      </Box>
    )
  }

  return (
    <Box backgroundColor="mainBackground" style={Style.parent}>

     

      <Pressable style={Style.header} onPress={() => { navigation.navigate('index') }}>

        <Feather name="chevron-left" size={25} color={darkMode ? theme.colors.whiteText : theme.colors.blackText} />
        <CustomText variant="body" marginLeft="s" style={{ marginBottom: 4 }}>Back</CustomText>
      </Pressable>

      {/* IMAGES FOR VERIFICATION */}

      {
        !isLoading && !verificationUploaded && !user.KYCVerified && (
          <Box alignItems='center'>
            <Image source={ darkMode ? require('../../../../assets/verificationl.png'): require('../../../../assets/verification.png')} style={{ width: 70, height: 70 }}/>
          </Box>
            )
      }

{
        !isLoading && verificationUploaded && !user.KYCVerified && (
          <Box alignItems='center'>
            <Image source={ darkMode ? require('../../../../assets/verificationl.png'): require('../../../../assets/verification.png')} style={{ width: 70, height: 70 }} />
          </Box>
            )
      }

      { !isLoading && verificationUploaded && user.KYCVerified && (
        <Box alignItems='center'>
          <Image source={ darkMode ? require('../../../../assets/acceptedl.png'): require('../../../../assets/accepted.png')} style={{ width: 70, height: 70 }} />
        </Box>
      )}

      {
        isLoading && (
          <Box justifyContent='center' alignItems='center'>
            <ActivityIndicator size='large' color={darkMode ? 'white': theme.colors.primaryColor} />
          </Box>
        )
      }

      {
        !isLoading && !verificationUploaded && (
          <Box style={{ backgroundColor:  'transparent' }} mt='m'>
            <CustomText variant='bodylight'>You have not uploaded you verification document yet. Please upload it to continue.</CustomText>
            <Pressable onPress={() => navigation.navigate('verification')} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
              <CustomText variant="bodylight" textAlign='center' style={{ color: 'black', width: '100%' }}>Verify KYC to be able to withdraw</CustomText>
            </Pressable>
          </Box>
        )
      }

    {
        !isLoading && verificationUploaded && (
          <Box style={{ backgroundColor:  'transparent' }} mt='m'>
            <CustomText variant='body'>Your document is currently undergoing review, you will be alert when it has been approved.</CustomText>
            <View style={{ ...Style.conatiner, backgroundColor: theme.colors.primaryColor, marginTop: 20, justifyContent: 'space-between' }}>
              <CustomText variant="bodylight" ml="m" textAlign='center'> STATUS</CustomText>
              <CustomText variant="bodylight" ml="m" textAlign='center'>{(data.data.data as VerificationModel).status}</CustomText>
            </View>
          </Box>
        )
      }

    {/* {
        !isLoading && verificationUploaded && user.KYCVerified && (
          <Box style={{ backgroundColor: 'transparent' }} mt='m'>
            <CustomText variant='body'>Your KYC document has been approved. You can withdraw your funds now.</CustomText>
            <View style={{ ...Style.conatiner, backgroundColor:theme.colors.primaryColor, marginTop: 20, justifyContent: 'space-between' }}>
              <CustomText variant="bodylight" ml="m" textAlign='center'> STATUS</CustomText>
              <CustomText variant="bodylight" ml="m" textAlign='center'> {(data.data.data as VerificationModel).status}</CustomText>
            </View>
          </Box>
        )
      } */}

    </Box>
  );
}