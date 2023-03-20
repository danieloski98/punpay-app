import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import { BorderButton, Box, PrimaryButton } from '../../../components/General'
import CustomText from '../../../components/General/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../state/Store'

const VerificationPage = () => {
  const [code, setCode] = React.useState('');
  const theme = useTheme<Theme>();
  const dispatch = useDispatch<Dispatch>();

  // request otp
   // Request for an otp
   const { isLoading, mutate } = useMutation({
    mutationFn: () => Axios.get('/user/request-otp'),
    onSuccess: (data) => {
      Alert.alert(data.data.message);
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  })

  // verify the OTP
   // verify otp
   const { isLoading: optVerifying, mutate: verifyOtp} = useMutation({
    mutationFn: () => Axios.get(`/user/verify-otp/${code}`),
    onSuccess: () => {
      dispatch.loggedIn.login();
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  return (
    <Box backgroundColor='mainBackground' flex={1} style={Styles.parent}>
      <View style={Styles.imageContainer}>
            <Image source={require('../../../res/logo2.png')} style={{ width: 80, height: 80 }} resizeMode='contain' />
      </View>
      <CustomText variant='body' mt='l'>Verify Your Email</CustomText>

      <View style={{ marginTop: 30 }}>
        <CustomText variant="subheader" style={{ fontSize: 16 }}>OTP Sent To Email</CustomText>
        <View style={{ width: '100%', backgroundColor: theme.textInput.backgroundColor, flexDirection: 'row', padding: 10, borderRadius: 10, height: 55 }}>
            <TextInput keyboardType="number-pad" value={code} onChangeText={(e) => setCode(e)} placeholderTextColor={theme.colors.text} style={{ flex: 1, color: theme.colors.text, fontSize: 16 }} />
            <View style={{ width: '30%', height: '100%' }}>
                <BorderButton text='Send OTP' action={mutate} height='100%' isLoading={isLoading}  />
            </View>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Continue' action={verifyOtp} isLoading={optVerifying}  />
      </View>
    </Box>
  )
}

const Styles = StyleSheet.create({
  parent: {
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: "center",
  }
})

export default VerificationPage