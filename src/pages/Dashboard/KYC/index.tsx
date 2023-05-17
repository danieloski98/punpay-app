import { View, Pressable } from "react-native";
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
import { MetaMapRNSdk } from 'react-native-metamap-sdk';





export default function KYC({ navigation }: { navigation: any }) {
  const user = useSelector((state: RootState) => state.User);
  const [verificationUploaded, setVerificationUpload] = React.useState(false);

  const queryClient = useQueryClient();

  React.useEffect(() => {
    const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk)
    MetaMapVerifyResult.addListener('verificationSuccess', () => {
      queryClient.invalidateQueries();
      navigation.navigate('index');
      Alert.alert('Alert', 'You document has been uploaded successfully, This usually take about 1 - 2 business days');
    })
    MetaMapVerifyResult.addListener('verificationCanceled', (data) => Alert.alert('Alert', 'You can always verify your identity again'))

    return () => {
      MetaMapVerifyResult.removeAllListeners('verificationSuccess');
      MetaMapVerifyResult.removeAllListeners('verificationCanceled');
    }

  })


  // get verification
  const { isLoading } = useQuery(['getVerification'], () => Axios.get('/verification'), {
    refetchInterval:  1000 * 60,
    refetchOnMount: true,
    onSuccess: (data) => {
      setVerificationUpload(true);
    },
    onError: (error: any) => {
      setVerificationUpload(false);
    }
  });

  const handleMetaMapClickButton = () => {
    //set 3 params clientId (cant be null), flowId, metadata

    MetaMapRNSdk.showFlow("642be3a4547081001c4eb417", "642be3a4547081001c4eb416", { lastName: user.lastName, firstName: user.firstName, email: user.email, userId: user.id });
  }


  return (
    <Box backgroundColor="mainBackground" style={Style.parent}>

      <Pressable style={Style.header} onPress={() => { navigation.navigate('index') }}>

        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <CustomText variant="body" marginLeft="s" style={{ marginBottom: 4 }}>Back</CustomText>
      </Pressable>

      {
        !isLoading && !verificationUploaded && (
          <Box backgroundColor='mainBackground'>
            <CustomText variant='body'>You have not uploaded you verification document yet. Please upload it to continue.</CustomText>
            <Pressable onPress={handleMetaMapClickButton} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
              <CustomText variant="bodylight" ml="m" textAlign='center'>Verify KYC to be able to withdraw</CustomText>
            </Pressable>
          </Box>
        )
      }

    {
        !isLoading && verificationUploaded && !user.KYCVerified && (
          <Box backgroundColor='mainBackground'>
            <CustomText variant='body'>Your document is currently undergoing review, you will be alert when it has been approved.</CustomText>
            <View style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20, justifyContent: 'space-between' }}>
              <CustomText variant="bodylight" ml="m" textAlign='center'> STATUS</CustomText>
              <CustomText variant="bodylight" ml="m" textAlign='center'> UNDER REVIEW</CustomText>
            </View>
          </Box>
        )
      }

    {
        !isLoading && verificationUploaded && user.KYCVerified && (
          <Box backgroundColor='mainBackground'>
            <CustomText variant='body'>Your KYC document has been approved. You can withdraw your funds now.</CustomText>
            <View style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20, justifyContent: 'space-between' }}>
              <CustomText variant="bodylight" ml="m" textAlign='center'> STATUS</CustomText>
              <CustomText variant="bodylight" ml="m" textAlign='center'> APPROVED</CustomText>
            </View>
          </Box>
        )
      }

    </Box>
  );
}