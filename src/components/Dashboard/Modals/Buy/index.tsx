import React, { useReducer } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import AmountPage from './Pages/Amount';
import AwaitingPaymentPage from './Pages/AwaitingPage';
import ConfirmPaymentPage from './Pages/ConfirmPayment';
import Bank from './Pages/Banks'
import ModalWrapper from '../../../General/ModalWrapper';
import { initialState, useBuyState } from './State';
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
import { BackHandler, Platform } from 'react-native'
import { Box } from '../../../General';
import { Feather } from '@expo/vector-icons';
import { useModalState } from '../../../../pages/Dashboard/TransactionType/state';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import { showMessage } from 'react-native-flash-message';


const OS = Platform.OS;
interface IProps {
  coin: string;
}

const BuyPage = ({ coin }: IProps) => {
  const { setOpenModal, setAll } = useModalState((state) => state)
  const [usd, setUsd] = React.useState('0');
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);
  const navigation = useNavigation()
  const user = useSelector((state: RootState) => state.User);
  const toast = useToast();
  const transaction = useBuyState((state) => state)
  const theme = useTheme<Theme>();

  React.useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      if (transaction.stage === 1) {
        setAll({ openBuy: false });
        return true;
      } else {
        if (transaction.stage === 2) {
          transaction.setAll({ stage: transaction.stage - 1 })
        }
        if (transaction.stage === 3) {
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

        return true;
      }
    });

    return () => unsubscribe.remove();
  }, [transaction.stage])

  // CUSTOM HOOKS
  const { getShortName } = useIcons()
  const { isLoading, data } = useGetRate({ currency: getShortName(coin as Coin), transactionType: 'sell' });
  const { getApiName } = useCoin(coin as Coin);
  const { isLoading: createTransactionMutation, mutate } = useMutation({
    mutationFn: (data: any) => Axios.post('/transaction/buy', data),
    onSuccess: (data) => {
      toast.show('Transaction created', {
      })
      transaction.setAll({ transactionId: data.data.data.id });
      transaction.setAll({ stage: 3 });
    },
    onError: (error: any) => {
      Alert.alert('Error', error)
    }
  })
  const { isLoading: coinDataLoading, data: coinData, isError } = useQuery(['getCoinDetails'], () => STAT.get(`/coins/${getApiName()}`), {
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

  React.useEffect(() => {
    if (!coinDataLoading && !isError) {
      transaction.setAll({ usd: (coinData?.data as IStat).market_data.current_price.usd })
    }
    if (!isLoading && data) {
      transaction.setAll({ rate: data.data.rate })
      bottomsheetRef.current?.present();
    }
  }, [coinData])

  

  const trade = React.useCallback((bank: IBank) => {
    transaction.setAll({ bank: bank });
    
    //make api request
    const obj = {
      userId: user.id,
      bankId: bank.id.toString(),
      transactionCurrency: 'ngn',
      transactionAmount: parseInt(transaction.transactionAmount),
      payoutCurrency: transaction.payoutCurrency,
      payoutAmount: parseFloat(transaction.payoutAmount),
      rate: transaction.rate,
      transactionReference: transaction.referenceCode,
    }
    mutate(obj);
  }, [transaction]);

  const handleBackButtonPro = React.useCallback(() => {
    if (transaction.stage === 1) {
      setOpenModal(false);
      return;
    } else {
      transaction.setAll({ stage: transaction.stage - 1});
    }
  }, [transaction.stage]);

  const switchPages = React.useCallback(() => {
    if (isLoading || coinDataLoading) {
      return <ActivityIndicator size='large' />
    } else {
      switch (transaction.stage) {
        case 1: {
          return <AmountPage  coin={coin} />
        }
        case 2: {
          return <Bank action={trade} />
        }
        case 3: {
          return <AwaitingPaymentPage />
        }
        case 4: {
          return <ConfirmPaymentPage />
        }
      }
    }
   
  }, [transaction.stage, transaction.transactionAmount, transaction.payoutAmount, isLoading, coinDataLoading, usd]);

  return (
    <ModalWrapper
      ref={bottomsheetRef}
      onClose={() => {
        transaction.setAll(initialState);
        setAll({ openBuy: false });
      }}
    >
      {transaction.stage === 2 && (
        <Box height={35} justifyContent='flex-end' marginBottom='m'>
          <Feather name="chevron-left" onPress={handleBackButtonPro} size={30} color={theme.colors.text} />
        </Box>
      )}
      {switchPages()}
    </ModalWrapper>
  )
}

export default BuyPage