import React from 'react'
import AmountPage from './Pages/AmountPage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'


// SVGS
import VerificationPage from './Pages/VerificationPage';
import ProcessingPage from './Pages/ProcessingPage';
import ModalWrapper from '../../../General/ModalWrapper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from '../../../../utils/api';
import { reducer, state as reducerState } from './state';
import { Alert, BackHandler } from 'react-native';
import { IStat } from '../../../../models/Stat';
import STAT from '../../../../utils/stats';
import { useNavigation } from '@react-navigation/native';
import { Coin } from '../../../../hooks/useIcons';
import useCoin from '../../../../hooks/useCoin';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/Store';
import { useModalState } from '../../../../pages/Dashboard/TransactionType/state';
import { showMessage } from 'react-native-flash-message';


interface IProps {
  coin: string;
}

const Swap = ({ coin }: IProps) => {
  const { setOpenModal, setAll } = useModalState((state) => state)
  const [stage, setStage] = React.useState(1)
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);
  const [usd, setUsd] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, reducerState);
  const { getApiName } = useCoin(coin as Coin);
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.User);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stage === 1) {
        setAll({ openSwap: false });
        return true;
      } else {
        if (stage === 3) {
          showMessage({
            message: 'Confirm transaction',
            description: `You can't go back , your transaction has already been created`,
            floating: false,
            statusBarHeight: 20,
            animated: true,
            autoHide: true,
            duration: 6000,
            type: 'warning'
          })
          return true;
        }
        setStage(prev => prev - 1)

        return true;
      }
    });

    return () => unsubscribe.remove();
  }, [stage])


  // get the coin usd value from the coingecko api
  const { isLoading: coinDataLoading, data: coinData, isError } = useQuery(['getCoinDetails'], () => STAT.get(`/coins/${getApiName()}`), {
    refetchOnMount: true,
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
      showMessage({
        message: 'Success',
        description: `Your swap was successful`,
        floating: false,
        statusBarHeight: 30,
        autoHide: false,
        duration: 6000,
        type: 'success'
      });
      queryClient.invalidateQueries(['getCoin']);
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
      onClose={() => setAll({ openSwap: false })}
    >
      {switchPages()}
    </ModalWrapper>
  )
}

export default Swap