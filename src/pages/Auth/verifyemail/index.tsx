import { Alert, View } from 'react-native'
import React, { useCallback, useState } from 'react'
// import Box from '../../../../components/generalComponents/Box'
// import CustomText from '../../../../components/generalComponents/Text'
import { Style } from './style'
import { Box, Text as CustomText, FormContainer, TextInput, Submit } from '../../../components/General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { VerifyEmailSchema } from '../../../models/validationSchema'
import { Feather } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'


interface IProps {
  navigation: NativeStackNavigationProp<any>;
  route: any
}

export default function Verifyemail({ navigation, route }: IProps) {
  const [countDown, setCountDown] = useState(0);
  const [resending, setResending] = useState(false);
  const theme = useTheme<Theme>();
  const { email } = route.params;

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => Axios.post(`/user-auth/verify-otp/${data}`),
    onSuccess: () => {
      navigation.navigate('setpin');
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  const resendOtpMutation = useMutation({
    mutationFn: (data) => Axios.get(`/user-auth/resend-otp/${data}`),
    onSuccess: () => {
      setResending(true);;
      setCountDown(59);
      const interval = setInterval(() => {
        if (countDown > 0) {
          setCountDown(prev => prev - 1);
        } else {
          setResending(false);
          setCountDown(0);
          clearInterval(interval)
        }
      }, 1000)
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });


  const submit = useCallback((data: any) => {
    mutate(data.code);
  }, [])

  return (
    <FormContainer initialValues={{ code: '' }} validationSchema={VerifyEmailSchema} onSubmit={submit}>
      <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

        <View style={{ ...Style.text, paddingHorizontal: 0 }}>
          <CustomText variant="subheader">Verify Your Email Address</CustomText>
          <CustomText variant="bodylight">We sent a 5 digit code to your email - {email}</CustomText>
        </View>

        <ScrollView bounces style={{ flex: 1, marginBottom: 50, backgroundColor: 'transparent', paddingHorizontal: 0 }} contentContainerStyle={{ marginBottom: 50 }}>

          <Box>
            <TextInput name="code" leftElement={<Feather name="lock" size={25} style={{ marginTop: 10 }} />} keyboardType="number-pad"
                isPassword={false} />
          </Box>



          <View style={Style.btnC}>
            <Submit text="Continue" isLoading={isLoading} />
          </View>

          <View style={Style.textBox}>
            <CustomText variant="bodylight" textAlign="center" onPress={() => resendOtpMutation.mutate(email) } >
             {!resending && 'Resend Code'}
             {resending && countDown}
            </CustomText>
          </View>

        </ScrollView>

      </Box>
    </FormContainer>
  )
}