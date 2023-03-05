import React, { useReducer } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import AmountPage from './Pages/Amount';
import AwaitingPaymentPage from './Pages/AwaitingPage';
import ConfirmPaymentPage from './Pages/ConfirmPayment';
import Bank from './Pages/Banks'
import ModalWrapper from '../../../General/ModalWrapper';
import { reducer, state as reducerState } from './State';
import { IBank } from '../../../../models/bank';
import useGetRate from '../../../../hooks/useGetRate';
import useIcons, { Coin } from '../../../../hooks/useIcons';
import useCoin from '../../../../hooks/useCoin';
import { ActivityIndicator, Alert } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import STAT from '../../../../utils/stats';
import { IStat } from '../../../../models/Stat';
import { useNavigation } from '@react-navigation/native';
import Axios from '../../../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/Store';
import { useToast } from 'react-native-toast-notifications';


interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  coin: string;
}

const BuyPage = ({ close, coin }: IProps) => {
  const [stage, setStage] = React.useState(1)
  const [usd, setUsd] = React.useState('0');
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);
  const navigation = useNavigation()
  const user = useSelector((state: RootState) => state.User);
  const toast = useToast();

  // CUSTOM HOOKS
  const { getShortName } = useIcons()
  const { isLoading, data } = useGetRate({ currency: getShortName(coin as Coin), transactionType: 'sell' });
  const { getApiName } = useCoin(coin as Coin);
  const { isLoading: createTransactionMutation, mutate } = useMutation({
    mutationFn: (data: any) => Axios.post('/transaction/buy', data),
    onSuccess: (data) => {
      toast.show('Transaction created', {
      })
      dispatch({ type: 'id', payload: data.data.data.id });
    },
    onError: (error: any) => {
      Alert.alert('Error', 'An error occured while trying to create the transaction')
      console.log(error);
    }
  })
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

  // REDUCER FUNCTION
  const [state, dispatch] = useReducer(reducer, reducerState);

  React.useEffect(() => {
    if (!coinDataLoading && !isError) {
      dispatch({ type: 'usd', payload: (coinData?.data as IStat).market_data.current_price.usd });
    }
    if (!isLoading && data) {
      dispatch({ type: 'rate', payload: data.data.rate });
      bottomsheetRef.current?.present();
    }
  }, [coinData])

  

  const trade = React.useCallback((bank: IBank) => {
    console.log(bank);
    dispatch({ type: 'bank', payload: bank });
    //make api request
    const obj = {
      userId: user.id,
      bankId: bank.id.toString(),
      transactionCurrency: 'ngn',
      transactionAmount: state.transactionAmount,
      payoutCurrency: state.payoutCurrency,
      payoutAmount: state.payoutAmount,
      rate: state.rate,
      transactionReference: state.referenceCode,
    }
    mutate(obj);
    setStage(3);
  }, [state])

  const switchPages = React.useCallback(() => {
    if (isLoading || coinDataLoading) {
      return <ActivityIndicator size='large' />
    } else {
      console.log(`this is the usd = ${usd}`)
      switch (stage) {
        case 1: {
          return <AmountPage next={setStage} coin={coin} dispatch={dispatch} rate={isLoading ? '0' : data.data.rate} coinUSDValue={!coinData ? '0' : usd} />
        }
        case 2: {
          return <Bank action={trade} />
        }
        case 3: {
          return <AwaitingPaymentPage next={setStage} state={state} />
        }
        case 4: {
          return <ConfirmPaymentPage state={state} />
        }
      }
    }
   
  }, [stage, isLoading, coinDataLoading, usd, state]);

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