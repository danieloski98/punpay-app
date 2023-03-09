import React from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useTheme } from '@shopify/restyle';
import { Theme } from "../../../../style/theme";
import { Style } from "./style";
import { Box, Text as CustomText } from '../../../General'
import { View, Pressable, Alert } from 'react-native'
import * as Linking from 'expo-linking'

// svgs
import CardEdit from '../../../../res/svg-output/CardEdit'
import UserO from '../../../../res/svg-output/Usero'
import AmountPage from './Pages/Amount';
import ReviewSellPage from './Pages/Review';
import VerificationPage from '../Swap/Pages/VerificationPage';
import ProcessingPage from './Pages/ProcessingPage';
import SendAmountPage from './Pages/SendPages/Amount';
import ReviewSendPage from './Pages/SendPages/Review';
import { useAtom } from 'jotai';
import { DarkModeAtom } from '../../../../state/states';
import ModalWrapper from '../../../General/ModalWrapper';
import useGetRate from '../../../../hooks/useGetRate';
import useIcons, { Coin } from '../../../../hooks/useIcons';
import useCoin from '../../../../hooks/useCoin';
import { useMutation, useQuery } from '@tanstack/react-query';
import STAT from '../../../../utils/stats';
import { IStat } from '../../../../models/Stat';
import { Link, useNavigation } from '@react-navigation/native';
import { reducer, state as reducerState } from './state';
import Axios from '../../../../utils/api';
import useOpenWhatsapp from '../../../../hooks/useOpenWhatsapp';


interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    coin: string;
}

const SellPage = ({ close, coin }: IProps) => {
  // STATES
    const [step, setStep] = React.useState(1)
    const [sellStep, setSellStep] = React.useState(1);
    const [sendStep, setSendStep] = React.useState(1);
    const [initial, setInital] = React.useState(true);
    const [usd, setUsd] = React.useState('')
    const user = useSelector((state: RootState) => state.User);
    const [state, dispatch] = React.useReducer(reducer, reducerState);

    const navigation = useNavigation();
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const theme = useTheme<Theme>();
    const { getShortName } = useIcons();
    const { openwhatsapp } = useOpenWhatsapp()

    // Custom hooks
    const { isLoading, data } = useGetRate({ currency: getShortName(coin as Coin), transactionType: 'buy' });
    const { getApiName } = useCoin(coin as Coin);

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

  // create sell transaction
   // create transaction
   const { mutate: sellMutation, isLoading: sellIsLoading } = useMutation({
    mutationFn: (data: any) => Axios.post(`/transaction/sell`, data),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      setSellStep(4)
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  })

  const { mutate: withdrawMutation, isLoading: withdrawIsLoading } = useMutation({
    mutationFn: (data: any) => Axios.post(`/transaction/withdraw`, data),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      setSendStep(4)
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  })

  React.useEffect(() => {
    if (!coinDataLoading && !isError) {
      dispatch({ type: 'usd', payload: (coinData?.data as IStat).market_data.current_price.usd });
    }
    if (!isLoading && data) {
      dispatch({ type: 'rate', payload: data.data.rate });
      bottomsheetRef.current?.present();
    }
  }, [coinData])

  // send transaction
  const createSellTransaction = React.useCallback(() => {
    const obj = {
      userId: user.id,
      transactionCurrency: state.transactionCurrency,
      transactionAmount: state.transactionAmount,
      payoutCurrency: state.payoutCurrency,
      payoutAmount: state.payoutAmount,
      rate: state.rate,
    }
    sellMutation(obj);
  }, [state, user]);

  // withdraw transcation
  const withdrawTransaction = React.useCallback(() => {
    const obj = {
      userId: user.id,
      transactionCurrency: state.transactionCurrency,
      transactionAmount: state.transactionAmount,
      withdrawalAddress: state.wallet,
    }
    withdrawMutation(obj);
  }, [state, user]);


    const { getIcon } = useIcons()

    React.useEffect(() => {
        bottomsheetRef.current?.present();
    });

    const switchPages = React.useCallback(() => {
        switch(sellStep) {
            case 1: {
                return <AmountPage change={setSellStep} dispatch={dispatch} coinUSDValue={usd}  />
            }
            case 2: {
                return <ReviewSellPage change={setSellStep} state={state} />
            }
            case 3: {
                return <VerificationPage changeStep={() => setSellStep(4)} goBack={() => setSellStep(prev => prev - 1)} loading={sellIsLoading} action={createSellTransaction} />
            }
            case 4: {
                return <ProcessingPage state={state} close={close} transactionType='Sell' />
            }
        }
    }, [sellStep, usd]);

    const swicthSendPages = React.useCallback(() => {
      switch(sendStep) {
        case 1: {
          return <SendAmountPage change={setSendStep} dispatch={dispatch} />
        }
        case 2: {
          return <ReviewSendPage change={setSendStep} state={state} />
        }
        case 3: {
          return <VerificationPage changeStep={() => setSendStep(4)} goBack={() => setSendStep(prev => prev - 1)} loading={withdrawIsLoading} action={withdrawTransaction} />
      }
      case 4: {
          return <ProcessingPage state={state} close={close} transactionType='Send' />
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

  const selectSell = React.useCallback((step: number) => {
    setInital(false);
    setStep(step);
  }, []);
  return (
    <ModalWrapper
      ref={bottomsheetRef}
      onClose={() => close(false)}
    >
      {initial && (
                 <Box mt='m'>
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

                  <CustomText variant='body' mt='xl'>Have a transaction above $20k?</CustomText>
                  <Pressable onPress={openwhatsapp} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                     <CardEdit width={30} height={30} />
                     <CustomText variant="bodylight" ml="m">Use Punpay Aboki Rate</CustomText>
                 </Pressable>
                </Box>
              )}
              {!initial && (
                <Box mt='m'>
                    { step === 1 && switchPages()}
                    { step === 2 && swicthSendPages()}
                </Box>
              )}
    </ModalWrapper>
  )
}

export default SellPage