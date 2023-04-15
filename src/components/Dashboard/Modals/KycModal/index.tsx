import { Image, NativeEventEmitter, NativeModules } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { Box, PrimaryButton } from '../../../General';
import CustomText from '../../../General/Text';
import { useNavigation } from '@react-navigation/native';
import { MetaMapRNSdk} from 'react-native-metamap-sdk';

interface IProps {
    close: () => void;
}

const KycModal = ({ close }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const navigation = useNavigation<any>();

    React.useEffect(() => {
        bottomsheetRef.current.present();
    }, []);

    React.useEffect(() => {
        const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk)
        MetaMapVerifyResult.addListener('verificationSuccess', (data) => console.log(data))
        MetaMapVerifyResult.addListener('verificationCanceled', (data) => console.log(data))
        
    })

    const handleMetaMapClickButton = () => {

        //set 3 params clientId (cant be null), flowId, metadata
     var yourMetadata = { param1: "value1", param2: "value2" }
     console.log(MetaMapRNSdk);
     MetaMapRNSdk.showFlow("642be3a4547081001c4eb417", "642be3a4547081001c4eb416", { name: 'daniel' });
  }

    const handlePress = React.useCallback(() => {
        navigation.navigate('kyc');
        close();
    }, [])
  return (
    <ModalWrapper
        onClose={close}
        ref={bottomsheetRef}
        snapPoints={['45%']}
    >
        <Box width='100%' alignItems='center' mt='m'>
            <Image source={require('../../../../res/id-card.png')} style={{ width: 100, height: 100 }} resizeMode='contain' />
        </Box>

        <CustomText textAlign='center' variant='body' mt='l'>
            KYC not verified
        </CustomText>

        <CustomText  textAlign='center' variant='bodylight' mt='s' mb='l'>
            You have to verify your identity, so you would be granted full access to our platform
        </CustomText>

        <PrimaryButton text='Verify KYC' action={handleMetaMapClickButton} />

    </ModalWrapper>
  )
}

export default KycModal