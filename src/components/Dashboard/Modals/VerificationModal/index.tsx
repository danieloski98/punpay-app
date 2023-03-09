import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { PrimaryButton } from '../../../General';
import CustomText from '../../../General/Text';
import Identify from "../../../../res/svg-output/Identity";
import Nin from './Pages/Nin';
import Driverslincence from './Pages/Driverslincence';
import Passport from './Pages/Passport';

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

const VerificationModal = ({ close, type }: IProps) => {

    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    React.useEffect(() => {
        bottomSheetRef.current?.present();
    });

    const title: () => string = React.useCallback(() => {
        const obj = {
            nin: 'nin',
            'drivers-lincence': 'dirvers-lincence',
            passport: 'passport'
        }
        return obj[type];
    }, []);

    const screen = React.useCallback(() => {
        const obj = {
            nin: <Nin />,
            'drivers-lincence': <Driverslincence />,
            passport: <Passport />
        }
        return obj[type];
    }, []);

    return (
        <ModalWrapper
            ref={bottomSheetRef}
            onClose={() => close(false)}
        >
            <CustomText variant="body">Verify with your {title().toUpperCase()}</CustomText>
            {screen()}
        </ModalWrapper>
    )
}

export default VerificationModal