import { Alert, Image, NativeEventEmitter, NativeModules } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { Box, PrimaryButton } from '../../../General';
import CustomText from '../../../General/Text';
import { MetaMapRNSdk} from 'react-native-metamap-sdk';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/Store';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import { showMessage } from 'react-native-flash-message';
import CameraScreen from '../../Verrification/CameraScreen';
import { CameraCapturedPicture } from 'expo-camera';

interface IProps {
    close: () => void;
    action: (data: CameraCapturedPicture) => void;
}

const InputNinModal = ({ close, action }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const user = useSelector((state: RootState) => state.User);
    const navigation = useNavigation<any>();

    const theme = useTheme<Theme>();


    React.useEffect(() => {
        bottomsheetRef.current.present();
    }, []);


  return (
    <ModalWrapper
        onClose={close}
        ref={bottomsheetRef}
        snapPoints={['90%']}
    >
       
        <CameraScreen action={action} />

    </ModalWrapper>
  )
}

export default InputNinModal;