import { View, Text, Pressable, TextInput, Alert } from 'react-native'
import { Style } from './style'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import {Text as CustomText, PrimaryButton, BorderButton } from '../../../../../General'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../../../../utils/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import { State } from '../../../Sell/state'
import { BooleanLocale } from 'yup/lib/locale'


interface IProps {
    changeStep: () => void;
    goBack: () => void;
    loading: boolean;
    action: () => void;
}

const VerificationPage = ({ changeStep, goBack, action, loading }: IProps) => {
    const theme = useTheme<Theme>();
    const [code, setCode] = React.useState('');
    const [pin, setPin] = React.useState('');
    const [holder, setHolder] = React.useState([]);
    const user = useSelector((state: RootState) => state.User);   
    
     // timer
    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [showTimer, setShowTimer] = React.useState(false);

    // using ref 
    const second = React.useRef<number>(0)
    const min = React.useRef<number>(0);

    // state Timeer
  const startTimer = React.useCallback(() => {
    if (!showTimer) {
      min.current = 1;
      second.current = 59;
      setMinutes(min.current);
      mutate()
      setShowTimer(true);
      const interval = setInterval(() => {
        if (second.current > 0) {
          second.current = second.current - 1;
          setSeconds(second.current);
        } else {
          if (min.current === 0 && second.current === 0) {
            // setShowTimer(false);
            second.current = 0;
            min.current = 0
            setSeconds(second.current);
            setMinutes(min.current);
            setShowTimer(false);
            clearInterval(interval);
          } else if (min.current === 1 && second.current === 0) {
            min.current = 0;
            second.current = 59;
            setMinutes(min.current);
            setSeconds(59);
          }
          else {
            min.current = min.current - 1;
            second.current = 59;
            setMinutes(min.current);
            setSeconds(second.current);
          }
        }
      }, 1000);
    }
  }, []);

    // Request for an otp
    const { isLoading, mutate } = useMutation({
      retry: 4,
      mutationFn: () => Axios.get('/user/request-otp'),
      onSuccess: (data) => {
        Alert.alert(data.data.message);
      },
      onError: (error: any) => {
        Alert.alert('Error', error);
      }
    })
    // verify otp
    const verifyOtp = useMutation({
      mutationFn: () => Axios.get(`/user/verify-otp/${code}`),
      onSuccess: () => {
        // proceed to nest page
        //create transaction
        action();
      },
      onError: (error: any) => {
        Alert.alert('Error', error);
      }
    });

     // verify pin
     const verifyPin = useMutation({
      mutationFn: (data: any) => Axios.put(`/user-auth/verify-pin`, data),
      onSuccess: () => {
        verifyOtp.mutate();
      },
      onError: (error: any) => {
        Alert.alert('Error', error);
      }
    });


    const updatePin = React.useCallback((pin: string) => {
      if (pin.length >= 4) {
        setPin(pin);
      } else {
        setPin(pin);
        setHolder([]);
      }
    }, []);

    const handlePress = React.useCallback(async() => {
      // verify pin
      verifyPin.mutate({ userId: user.id, pin });
    }, [pin]);
  return (
    <View style={Style.parent}>
      <Pressable onPress={() => goBack() } style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="chevron-left" size={20} color={theme.colors.text} />
        <CustomText variant="bodylight" ml="s">Go Back</CustomText>
      </Pressable>

      <CustomText variant="subheader" textAlign="center" mt="m" style={{ fontSize: 20 }}>CONFIRM TRANSACTION</CustomText>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>OTP Sent To Email</CustomText>
        <View style={{ width: '100%', backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10, height: 55 }}>
            <TextInput keyboardType="number-pad" value={code} onChangeText={(e) => setCode(e)} placeholderTextColor={theme.colors.text} style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
            <View style={{ width: '30%', height: '100%' }}>
              <BorderButton text={showTimer ? `${minutes}:${seconds}`:'Send OTP'} action={ showTimer ? () => {} : startTimer} height='100%' isLoading={isLoading}  />
            </View>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>PIN</CustomText>
        <View style={{ width: '100%', height: 55, backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10 }}>
            <TextInput placeholder='Enter PIN' value={pin} onChange={(e) => updatePin(e.nativeEvent.text)} secureTextEntry keyboardType="number-pad" placeholderTextColor={theme.colors.text} style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Continue' action={verifyOtp.isLoading || loading ? () => {} : handlePress} isLoading={verifyOtp.isLoading || loading}  />
      </View>
    </View>
  )
}

export default VerificationPage