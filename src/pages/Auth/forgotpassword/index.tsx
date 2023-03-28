import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, FormContainer, PrimaryButton, Submit, TextInput } from '../../../components/General'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { forgotPasswordSchema } from '../../../models/validationSchema'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import CustomInput from '../../../components/General/TextInput'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function ForgotPassword({ navigation }: IProps) {
  const  {mutate, isLoading } = useMutation({
    mutationFn: (data: string) => Axios.get(`/user-auth/request-reset-otp/${data}`),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message)
      navigation.navigate('resetpassword');
    },
    onError: (error: any) => {
      Alert.alert(error);
    }
  })

  const theme = useTheme<Theme>();

  const submit = (data: { email: string }) => {
    mutate(data.email);
  };

  return (
    <FormContainer
      initialValues={{ email: '' }}
      validationSchema={forgotPasswordSchema}
      onSubmit={submit}
    >
      <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

        <View style={{ ...Style.text, paddingHorizontal: 20 }}>
          <CustomText variant="subheader">Forgot Password</CustomText>
          <CustomText variant="bodylight">Enter your email address to get a code to reset your password</CustomText>
        </View>

        <ScrollView bounces style={{ flex: 1, marginBottom: 50, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ marginBottom: 50 }}>

          <View style={Style.box}>
            <CustomInput name="email" label='Email' keyboardType='email-address' leftElement={<Feather name="mail" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
          </View>

          <View style={Style.btnC}>
            <Submit text="Continue" isLoading={isLoading} />
          </View>

        </ScrollView>
      </Box>
    </FormContainer>
  )
}