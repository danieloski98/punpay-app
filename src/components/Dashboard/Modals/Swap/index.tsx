import React from 'react'
import AmountPage from './Pages/AmountPage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useTheme } from '@shopify/restyle';
import { Theme } from "../../../../style/theme";
import { Style } from "./style";

// SVGS
import VerificationPage from './Pages/VerificationPage';
import ProcessingPage from './Pages/ProcessingPage';

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>
}

const Swap: React.FC<IProps> = ({ close }) => {
    const [stage, setStage] = React.useState(1)
    const snapPoint = React.useMemo(() => ['80%'], []);
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const theme = useTheme<Theme>();
    const darkmode = useSelector((state: RootState) => state.isDarkMode);

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const switchPages = React.useCallback(() => {
        switch(stage) {
            case 1: {
                return <AmountPage next={setStage} />
            }
            case 2: {
              return <VerificationPage changeStep={() => setStage(3)} goBack={() => setStage(prev => prev -1)} />
            }
            case 3: {
              return <ProcessingPage />
            }
        }
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
                {switchPages()}
            </BottomSheetScrollView>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default Swap