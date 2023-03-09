import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { Box } from '../../../General';
import CustomText from '../../../General/Text';

interface IProps {
    close: () => void;
    change: React.Dispatch<React.SetStateAction<number>>;
}

const CurrencyModal = ({ close, change }: IProps) => {
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);

    React.useEffect(() => {
        bottomsheetRef.current.present();
    }, [])
  return (
   <ModalWrapper
    ref={bottomsheetRef}
    onClose={close}
    snapPoints={['30%']}
   >

    <Box>
        <Pressable
            onPress={() => change(1)}
        >
            <Box backgroundColor='cardPrimaryBackground' p='s'mt='m' style={{ borderRadius: 10 }} >
                <CustomText variant='subheader' textAlign='center'>NGN</CustomText>
            </Box>
        </Pressable>

        <Pressable
             onPress={() => change(2)}
        >
            <Box backgroundColor='mainBackground' p='s' mt='m' style={{ borderRadius: 10 }} >
                <CustomText variant='subheader' textAlign='center'>USD</CustomText>
            </Box>
        </Pressable>
    </Box>

   </ModalWrapper>
  )
}

export default CurrencyModal