import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import useIcons, { COINS, COINSs } from '../../../../hooks/useIcons';
import CustomText from '../../../General/Text';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    select: (coin: string) => void;
  }

const CoinTypeModal = ({ close, select }: IProps) => {
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    const { getIcon } = useIcons();
    const theme = useTheme<Theme>();

    const selectcoin = React.useCallback((coin: string) => {
        select(coin);
        close(false);
    }, [])

  React.useEffect(() => {
    bottomSheetRef.current?.present();
  });
  return (
    <ModalWrapper 
        ref={bottomSheetRef}
        onClose={() => close(false)}
    >
       {COINSs.sort().map((item, index) => (
        <Pressable onPress={() => selectcoin(item)} key={index} style={{ flexDirection: 'row', alignItems: 'center', height: 70, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
            {getIcon(item, 40)}
            <CustomText variant='bodylight' ml='m'>{item === 'Tether' ? 'USDT':item}</CustomText>
        </Pressable>
       ))}
    </ModalWrapper>
  )
}

export default CoinTypeModal