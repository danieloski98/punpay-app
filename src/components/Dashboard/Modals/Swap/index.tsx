import React from 'react'
import AmountPage from './Pages/AmountPage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'


// SVGS
import VerificationPage from './Pages/VerificationPage';
import ProcessingPage from './Pages/ProcessingPage';
import ModalWrapper from '../../../General/ModalWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import Axios from '../../../../utils/api';
import { reducer, state as reducerState } from './state';
import { Alert } from 'react-native';
import { IStat } from '../../../../models/Stat';
import STAT from '../../../../utils/stats';
import { useNavigation } from '@react-navigation/native';
import { Coin } from '../../../../hooks/useIcons';
import useCoin from '../../../../hooks/useCoin';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/Store';


interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  coin: string;
}

const Swap = ({ close, coin }: IProps) => {
  const [stage, setStage] = React.useState(1)
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);
  const [usd, setUsd] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, reducerState);
  const { getApiName } = useCoin(coin as Coin);
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.User);


  // get the coin usd value from the coingecko api
  const { isLoading: coinDataLoading, data: coinData, isError } = useQuery(['getCoinDetails'], () => STAT.get(`/coins/${getApiName()}`), {
    refetchOnMount: true,
    notifyOnChangeProps: 'all',
    onSuccess: (data) => {
      const res = data.data as IStat
      setUsd(res.market_data.current_price.usd);
    },
    onError: () => {
      Alert.alert('Error', `Couldn\'t get ${coin} usd value`);
      bottomsheetRef.current?.close();
      navigation.goBack();
    }
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (data: any) => Axios.post('/transaction/swap', data),
    onError: (error: any) => {
      Alert.alert('Error', error);
    },
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      setStage(3);
    }
  })

  const createSwap = React.useCallback(() => {
    const obj = {
      userId: user.id,
      transactionCurrency: state.transactionCurrency,
      transactionAmount: state.transactionAmount,
      payoutCurrency: 'usdt',
      payoutAmount: state.payoutAmount,
    }
    mutate(obj);
  }, [state, coin])

  React.useEffect(() => {
    bottomsheetRef.current?.present();
  });


  const switchPages = React.useCallback(() => {
    switch (stage) {
      case 1: {
        return <AmountPage next={setStage} coin={coin} dispatch={dispatch} usd={usd} state={state} />
      }
      case 2: {
        return <VerificationPage changeStep={() => setStage(3)} goBack={() => setStage(prev => prev - 1)} loading={isLoading} action={createSwap} />
      }
      case 3: {
        return <ProcessingPage state={state} close={close} />
      }
    }
  }, [stage, usd]);


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