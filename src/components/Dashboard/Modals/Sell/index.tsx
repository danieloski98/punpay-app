import React from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useTheme } from '@shopify/restyle';
import { Theme } from "../../../../style/theme";
import { Style } from "./style";
import CustomText from '../../../generalComponents/Text'
import { View, Pressable } from 'react-native'

// svgs
import CardEdit from '../../../../res/svgs/card-edit.svg'
import UserO from '../../../../res/svgs/usero.svg'

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>
}

const SellPage: React.FC<IProps> = ({ close }) => {
    const [stage, setStage] = React.useState(1)
    const snapPoint = React.useMemo(() => ['80%'], []);
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const theme = useTheme<Theme>();
    const darkmode = useSelector((state: RootState) => state.isDarkMode);

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const switchPages = React.useCallback(() => {
    }, [stage]);


  const renderBackdrop = React.useCallback(
    props => (
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
            ref={bottomsheetRef}
            snapPoints={snapPoint}
            onDismiss={() => close(false)}
            backdropComponent={renderBackdrop}
            style={{...Style.parent }}
            backgroundStyle={{ backgroundColor: theme.colors.modalBg }}
            handleIndicatorStyle={{ width: 150, backgroundColor: darkmode ?'grey':'lightgrey' }}
        >
            <BottomSheetScrollView scrollEnabled horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
               <>
                <CustomText variant="subheader" mt="m" style={{ fontSize: 20 }}>Sell Bitcoin</CustomText>
                <CustomText>What do you want to do ?</CustomText>

                <View style={{ height: 30 }} />

                <Pressable style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor }}>
                    <UserO width={30} height={30} />
                    <CustomText variant="bodylight" ml="m">Sell for FIAT</CustomText>
                </Pressable>

                <Pressable style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                    <CardEdit width={30} height={30} />
                    <CustomText variant="bodylight" ml="m">Transfer to another wallet</CustomText>
                </Pressable>
               </>
            </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default SellPage