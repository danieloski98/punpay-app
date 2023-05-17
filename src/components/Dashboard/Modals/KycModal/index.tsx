import { Alert, Image, NativeEventEmitter, NativeModules } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { Box, PrimaryButton } from '../../../General';
import CustomText from '../../../General/Text';
import { MetaMapRNSdk} from 'react-native-metamap-sdk';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/Store';

interface IProps {
    close: () => void;
}

const KycModal = ({ close }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const user = useSelector((state: RootState) => state.User);


    React.useEffect(() => {
        bottomsheetRef.current.present();
    }, []);

    React.useEffect(() => {
        const MetaMapVerifyResult = new NativeEventEmitter(NativeModules.MetaMapRNSdk)
        MetaMapVerifyResult.addListener('verificationSuccess', (data) => {
            console.log(data);
            Alert.alert('Alert', 'You document has been uploaded successfully, This usually take about 1 - 2 business days');
            close();
        })
        MetaMapVerifyResult.addListener('verificationCanceled', (data) => Alert.alert('Alert', 'You can always verify your identity again'))

        return () => {
            MetaMapVerifyResult.removeAllListeners('verificationSuccess');
            MetaMapVerifyResult.removeAllListeners('verificationCanceled');
        }
        
    })

    const handleMetaMapClickButton = () => {
        //set 3 params clientId (cant be null), flowId, metadata
     MetaMapRNSdk.showFlow("642be3a4547081001c4eb417", "642be3a4547081001c4eb416", { lastName: user.lastName, firstName: user.firstName, email: user.email, userId: user.id });
  }

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