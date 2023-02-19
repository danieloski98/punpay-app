import React from 'react'
import AmountPage from './Pages/AmountPage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'


// SVGS
import VerificationPage from './Pages/VerificationPage';
import ProcessingPage from './Pages/ProcessingPage';
import ModalWrapper from '../../../General/ModalWrapper';


interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  coin: string;
}

const Swap = ({ close, coin }: IProps) => {
  const [stage, setStage] = React.useState(1)
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    bottomsheetRef.current?.present();
  });

  const switchPages = React.useCallback(() => {
    switch (stage) {
      case 1: {
        return <AmountPage next={setStage} coin={coin} />
      }
      case 2: {
        return <VerificationPage changeStep={() => setStage(3)} goBack={() => setStage(prev => prev - 1)} />
      }
      case 3: {
        return <ProcessingPage />
      }
    }
  }, [stage]);


  return (
    <ModalWrapper
      ref={bottomsheetRef}
      onClose={() => close(false)}
    >
      {switchPages()}
    </ModalWrapper>
  )
}

export default Swap