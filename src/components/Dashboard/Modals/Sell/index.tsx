import React from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/Store";
import { useTheme } from '@shopify/restyle';
import { Theme } from "../../../../style/theme";
import { Style } from "./style";
import { Box, Text as CustomText } from '../../../General'
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import STAT from '../../../../utils/stats';
import { IStat } from '../../../../models/Stat';
import { Link, useNavigation } from '@react-navigation/native';
import { reducer, state as reducerState } from './state';
import Axios from '../../../../utils/api';
import useOpenWhatsapp from '../../../../hooks/useOpenWhatsapp';
import { openURL } from 'expo-linking'
import { View, Pressable, Alert, ActivityIndicator, BackHandler } from 'react-native'


// svgs
import CardEdit from '../../../../res/svg-output/CardEdit'
import UserO from '../../../../res/svg-output/Usero'
import { useModalState } from '../../../../pages/Dashboard/TransactionType/state';
import { showMessage } from 'react-native-flash-message';




interface IProps {
    coin: string;
}

const SellPage = ({ coin }: IProps) => {
    const { setOpenModal, setAll } = useModalState((state) => state);
  // STATES
    const [step, setStep] = React.useState(1)
    const [sellStep, setSellStep] = React.useState(1);
    const [sendStep, setSendStep] = React.useState(1);
    const [initial, setInital] = React.useState(true);
    const [usd, setUsd] = React.useState('')
    const user = useSelector((state: RootState) => state.User);
    const [state, dispatch] = React.useReducer(reducer, reducerState);
    const [verificationUploaded, setVerificationUpload] = React.useState(false);


    const navigation = useNavigation<any>();
    const bottomsheetRef = React.useRef<BottomSheetModal>(null);
    const theme = useTheme<Theme>();
    const { getShortName } = useIcons();
    const { openwhatsapp } = useOpenWhatsapp()
    const queryClient = useQueryClient();

    // handle back press
    React.useEffect(() => {
      const handleBack = BackHandler.addEventListener('hardwareBackPress', () => {
        if (initial) {
          setAll({ openSell: false });
          return true;
        } else {
          if (!initial && step === 1) {
            if (sellStep === 1) {
              setInital(true);
              return true;
            }
            if (sellStep >  1 && sellStep < 4) {
              setSellStep(prev => prev - 1);
              return true;
            }
            if (sellStep === 4) {
              showMessage({
                message: `Transaction Processing`,
              description: `Your transaction has already been created`,
              type: 'info',
              floating: false,
              autoHide: true,
              duration: 6000,
              });
              return true;
            }
          } 
          if (!initial && step === 2) {
            if (sendStep === 1) {
              setInital(true);
              return true;
            }
            if (sendStep >  1 && sendStep < 4) {
              setSellStep(prev => prev - 1);
              return true;
            }
            if (sendStep === 4) {
              showMessage({
                message: `Transaction Processing`,
              description: `Your transaction has already been created`,
              type: 'info',
              floating: false,
              autoHide: true,
              duration: 6000,
              });
              return true;
            }
          }
        }
      });

      return () => {
        handleBack.remove();
      }
    }, [sellStep, sendStep, initial])

     // get verification
    const { isLoading: verificationLoading } = useQuery(['getVerificationSell'], () => Axios.get('/verification'), {
      refetchOnMount: true,
      onSuccess: (data) => {
        setVerificationUpload(true);
      },
      onError: (error: any) => {
        setVerificationUpload(false);
      }
    });

    const handleLink = async() => {
      await openURL('https://wa.me/message/LX3XCNXKYMVVK1');
    }

    // Custom hooks
    const { isLoading, data } = useGetRate({ currency: getShortName(coin as Coin), transactionType: 'buy' });
    const { getApiName } = useCoin(coin as Coin);

    // get the coin usd value from the coingecko api
    const { isLoading: coinDataLoading, data: coinData, isError } = useQuery(['getCoinDetailsSell'], () => STAT.get(`/coins/${getApiName()}`), {
      refetchOnMount: true,
      retryOnMount: true,
      retry: true,
      // notifyOnChangeProps: 'all',
      onSuccess: (data) => {
        const res = data.data as IStat
        setUsd(res.market_data.current_price.usd);
      },
      onError: (error) => {
        showMessage({
          message: `Error`,
          description: `Error, Couldn't get ${coin} USD value`,
          type: 'danger',
          floating: false,
          autoHide: true,
          duration: 6000,
          statusBarHeight: 30,
          
        });
        bottomsheetRef.current?.close();
        navigation.goBack();
      }
  });

  // create sell transaction
   // create transaction
   const { mutate: sellMutation, isLoading: sellIsLoading } = useMutation({
    mutationFn: (data: any) => Axios.post(`/transaction/sell`, data),
    onSuccess: (data) => {
      showMessage({
        message: `Transaction Succcessful`,
        description: data.data.message,
        type: 'success',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30,
        
      });
      queryClient.invalidateQueries(['getCoin']);
      queryClient.refetchQueries();
      setSellStep(4)
    },
    onError: (error: any) => {
      showMessage({
        message: `An error occured while processing your transaction`,
        description: error,
        type: 'warning',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30,
       
      });
    }
  })

  const { mutate: withdrawMutation, isLoading: withdrawIsLoading } = useMutation({
    mutationFn: (data: any) => Axios.post(`/transaction/withdraw`, data),
    onSuccess: (data) => {
      showMessage({
        message: `Transaction successful`,
        description: data.data.message,
        type: 'success',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30,
        
      });
      queryClient.invalidateQueries(['getCoin']);
      queryClient.refetchQueries();
      setSendStep(4)
    },
    onError: (error: any) => {
      showMessage({
        message: `An error occured while processing your transaction`,
        description: error,
        type: 'warning',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30,
       
      });
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

  const handleMetaMapClickButton = () => {
    //set 3 params clientId (cant be null), flowId, metadata

    // MetaMapRNSdk.showFlow("642be3a4547081001c4eb417", "642be3a4547081001c4eb416", { lastName: user.lastName, firstName: user.firstName, email: user.email, userId: user.id });
}

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
      onClose={() => setAll({ openSell: false })}
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
                     <Box mt='s'>
                     <UserO width={30} height={30} />
                     </Box>
                     <CustomText variant="bodylight" ml="m">Sell for FIAT</CustomText>
                 </Pressable>

                

                {
                  user.accountDisabled ?
                  (
                    <>
                       <Pressable onPress={handleLink} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                          <CustomText variant="bodylight" ml="m" textAlign='center' style={{ color: '#790014' }}>Your account is locked. Contact Support</CustomText>
                      </Pressable>
                    </>
                  )
                  : 
                  (
                    <>
                     {
                        verificationLoading && (
                          <Box alignItems='center' width='100%' paddingVertical='s'>
                            <ActivityIndicator color={theme.colors.primaryColor} size='small' />
                            <CustomText variant="bodylight" ml="m">Checking verification</CustomText>
                          </Box>
                        )
                      }
                     {
                        !verificationLoading && user.KYCVerified && (
                          <Pressable onPress={() => selectSell(2)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                          <Box mt='s'>
                            <CardEdit width={30} height={30} />
                          </Box>
                          <CustomText variant="bodylight" ml="m">Transfer to another wallet</CustomText>
                          </Pressable>
                        )
                      }
                      {
                        !verificationLoading && !verificationUploaded && (
                          <Pressable onPress={handleMetaMapClickButton} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor, marginTop: 20 }}>
                          <CustomText variant="bodylight" ml="m" textAlign='center'>Verify KYC to be able to withdraw</CustomText>
                          </Pressable>
                        )
                    }

{
                        !verificationLoading && verificationUploaded && !user.KYCVerified && (
                          <View style={{ ...Style.conatiner2, backgroundColor: '#f94e4e81', marginTop: 20, flexDirection: 'column' }}>
                          <CustomText variant="subheader" style={{ color: 'white', fontSize: 18 }}>KYC under review</CustomText>
                          <CustomText variant='xs' mt='s'>Your KYC documents are still under review, once they have been approved you will be able to withdraw</CustomText>
                          </View>
                        )
                    }
                    </>
                  )
                }
                

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