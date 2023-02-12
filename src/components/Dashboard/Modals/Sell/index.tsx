import React from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useTheme } from '@shopify/restyle';
import { Theme } from "../../../../style/theme";
import { Style } from "./style";
import { Box, Text as CustomText } from '../../../General'
import { View, Pressable } from 'react-native'

// svgs
import CardEdit from '../../../../res/svg-output/CardEdit'
import UserO from '../../../../res/svg-output/Usero'
import AmountPage from './Pages/Amount';
import ReviewSellPage from './Pages/Review';
import VerificationPage from '../Swap/Pages/VerificationPage';
import ProcessingPage from '../Swap/Pages/ProcessingPage';
import SendAmountPage from './Pages/SendPages/Amount';
import ReviewSendPage from './Pages/SendPages/Review';
import { useAtom } from 'jotai';
import { DarkModeAtom } from '../../../../state/states';
import useIcons from '../../../../hooks/useIcons';

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    coin: string;
}

const SellPage = ({ close, coin }: IProps) => {
    const [stage, setStage] = React.useState(1);
    const [step, setStep] = React.useState(1)
    const [sellStep, setSellStep] = React.useState(1);
    const [sendStep, setSendStep] = React.useState(1);
    const [initial, setInital] = React.useState(true);
    const snapPoint = React.useMemo(() => ['80%'], []);
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const theme = useTheme<Theme>();
    const [darkmode,] = useAtom(DarkModeAtom);

    const { getIcon } = useIcons()

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const switchPages = React.useCallback(() => {
        switch(sellStep) {
            case 1: {
                return <AmountPage change={setSellStep} />
            }
            case 2: {
                return <ReviewSellPage change={setSellStep} />
            }
            case 3: {
                return <VerificationPage changeStep={() => setSellStep(4)} goBack={() => setSellStep(prev => prev - 1)} />
            }
            case 4: {
                return <ProcessingPage />
            }
        }
    }, [sellStep]);

    const swicthSendPages = React.useCallback(() => {
      switch(sendStep) {
        case 1: {
          return <SendAmountPage change={setSendStep} />
        }
        case 2: {
          return <ReviewSendPage change={setSendStep} />
        }
        case 3: {
          return <VerificationPage changeStep={() => setSendStep(4)} goBack={() => setSendStep(prev => prev - 1)} />
      }
      case 4: {
          return <ProcessingPage />
      }
      }
    }, [sendStep]);


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

  const sellPages = React.useCallback(() => {
    
  }, []);

  const selectSell = React.useCallback((step: number) => {
    setInital(false);
    setStep(step);
  }, []);
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
              {initial && (
                 <>
                 <Box flexDirection='row' alignItems='center'>
                  <CustomText variant="subheader" mr='s' style={{ fontSize: 20 }}>Withdraw {coin}</CustomText>
                  {getIcon(coin, 25)}
                 </Box>
                 <CustomText>What do you want to do ?</CustomText>
 
                 <View style={{ height: 30 }} />
 
                 <Pressable onPress={() => selectSell(1)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor }}>
                     <UserO width={30} height={30} />
                     <CustomText variant="bodylight" ml="m">Sell for FIAT</CustomText>
                 </Pressable>
 
                 <Pressable onPress={() => selectSell(2)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                     <CardEdit width={30} height={30} />
                     <CustomText variant="bodylight" ml="m">Transfer to another wallet</CustomText>
                 </Pressable>
                </>
              )}
              {!initial && (
                <>
                    { step === 1 && switchPages()}
                    { step === 2 && swicthSendPages()}
                </>
              )}
            </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default SellPage