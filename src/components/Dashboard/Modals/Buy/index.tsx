import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import AmountPage from './Pages/Amount';
import AwaitingPaymentPage from './Pages/AwaitingPage';
import ConfirmPaymentPage from './Pages/ConfirmPayment';
import ModalWrapper from '../../../General/ModalWrapper';


interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  coin: string;
}

const BuyPage = ({ close, coin }: IProps) => {
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
        return <AwaitingPaymentPage next={setStage} />
      }
      case 3: {
        return <ConfirmPaymentPage />
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

export default BuyPage