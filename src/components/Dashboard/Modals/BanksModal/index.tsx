import { BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useCallback, useState, useRef } from 'react'
import theme, { Theme } from '../../../../style/theme'
import { Style } from '../Buy/style'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../state/Store'
import { useTheme } from '@shopify/restyle'
import CustomText from '../../../General/Text'
import { Button, View, Text, ActivityIndicator } from 'react-native'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { FormContainer, Input } from '../../../General'
import CustomInput from '../../../General/TextInput'
import { useQuery } from '@tanstack/react-query'
import Axios from '../../../../utils/api'
import BankChip from './BankChip'
import { IBank } from '../../../../models/bank'

interface IProps {
  onClose: () => void;
  onSelect: (item: Partial<IBank>) => void;
  ref: React.MutableRefObject<BottomSheetModalMethods>;
}

const BanksModal: React.ForwardRefExoticComponent<any> = React.forwardRef(({ onClose, onSelect }: IProps, ref) => {
  const darkmode = useSelector((state: RootState) => state.isDarkMode);
  const [value, setValue] = useState('');
  const snapPoint = React.useMemo(() => ['80%', '80%'], []);
  const theme = useTheme<Theme>();

  // query
  const { isLoading, error, data } = useQuery(['getBanks'], () => Axios.get('/bank'))

  React.useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, [])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);


  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
        <BottomSheetModal
          index={1}
          ref={ref as any}
          snapPoints={snapPoint}
          onDismiss={() => onClose()}
          backdropComponent={renderBackdrop}
          style={{...Style.parent }}
          backgroundStyle={{ backgroundColor: theme.colors.modalBg }}
          handleIndicatorStyle={{ width: 150, backgroundColor: darkmode ?'grey':'lightgrey' }}
        >
          <Input value={value} onChange={(e: any) => setValue(e)} placeholderTextColor={theme.colors.text} />
          <BottomSheetScrollView scrollEnabled horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, marginTop: 20 }}>
            {isLoading && (
              <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={theme.colors.primaryColor} />
              </View>
            )}
            {!isLoading && !error && data && (data.data.data as Array<IBank>).filter((item, index) => {
              if (value === '') {
                return item
              } 
              if (value !== '' && item.name.includes(value)) {
                return item;
              }
            }).map((item, index) => (
              <BankChip {...item} key={index} onSelect={onSelect} />
            ))}
          </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
})
export default BanksModal
