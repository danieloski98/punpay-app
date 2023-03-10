import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { Box } from '../../../General';
import CustomText from '../../../General/Text';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import { Feather } from '@expo/vector-icons'

interface IProps {
    close: () => void;
    change: React.Dispatch<React.SetStateAction<number>>;
    currency: number;
}

const CurrencyModal = ({ close, change, currency }: IProps) => {
    const theme = useTheme<Theme>();
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);

    React.useEffect(() => {
        bottomsheetRef.current.present();
    }, []);
  return (
   <ModalWrapper
    ref={bottomsheetRef}
    onClose={close}
    snapPoints={['20%']}
   >

    <Box>
        <Pressable
            onPress={() => change(1)}
        >
            <Box flexDirection='row' alignItems='center' p='s'mt='m' style={{ borderRadius: 10 }} >
                <Image source={require('../../../../res/nigeria.png')} resizeMode='contain' style={{ width: 30, height: 30}} />
                <CustomText variant='body' ml='s'>NGN</CustomText>
               {currency === 1 &&  <Feather name="check" size={20} color={theme.colors.text} style={{ marginLeft: 20}} />}
            </Box>
        </Pressable>

        <Box height={1} style={{ backgroundColor: theme.textInput.backgroundColor }} />

        <Pressable
             onPress={() => change(2)}
        >
            <Box flexDirection='row' alignItems='center' p='s' style={{ borderRadius: 10 }} >
            <Image source={require('../../../../res/usa.png')} resizeMode='contain' style={{ width: 30, height: 30}} />
                <CustomText variant='body' ml='s'>USD</CustomText>
                {currency === 2 &&  <Feather name="check" size={20} color={theme.colors.text} style={{ marginLeft: 20}} />}
            </Box>
        </Pressable>
    </Box>

   </ModalWrapper>
  )
}

export default CurrencyModal