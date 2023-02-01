import { View, Text } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, TextInput as CustomInput, PrimaryButton, FormContainer, Submit } from '../../../components/General'
import { Style } from './style'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Unlock from '../../../res/svg-output/SuccessfullyUnlock'
import { resetPasswordSchema } from '../../../models/validationSchema'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { Alert } from 'react-native'
// import { User } from 'react-native-iconly'

interface IProps {
  navigation: NativeStackNavigationProp<any>;
}

export default function ResetPassword({ navigation }: IProps) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Axios.post('/user-auth/reset-password', data),
    onSuccess: () => {
      navigation.navigate('login');
    }, onError: (error: any) => {
      Alert.alert('Error', error);
    }
  });

  const theme = useTheme<Theme>();

  const submit = React.useCallback((data: any) => {
    const obj = {
      code: data.code,
      password: data.confirmPassword
    }
    mutate(obj);
  }, []);

  return (
    <FormContainer
      validationSchema={resetPasswordSchema}
      initialValues={{ newPassword: '', confirmPassword: ''}}
      onSubmit={submit}
    >
      <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 0 }}>

        <View style={{ ...Style.text, paddingHorizontal: 20 }}>
          <CustomText variant="subheader">Set New Password</CustomText>
          <CustomText variant="bodylight">Enter the code sent to your email address to reset your password</CustomText>
        </View>

        <ScrollView bounces style={{ flex: 1, marginBottom: 0, backgroundColor: 'transparent', paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>

          <View style={{ width: '100%', height: 220, justifyContent: 'center', alignItems: 'center' }}>
            <Unlock width={320} height={240} />
          </View>

          <View style={Style.box}>
            <CustomInput name="code" label="OTP Code" keyboardType='email-address' leftElement={<Feather name="code" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
          </View>

          <View style={Style.box}>
            <CustomInput name="newPassword" label="New Password" keyboardType='email-address' isPassword={showPass} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass(prev => !prev)} name={showPass ? "eye" : "eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
          </View>

          <View style={Style.box}>
            <CustomInput name='confirmPassword' label="Confrim Password" keyboardType='email-address' isPassword={showPass2} leftElement={<Feather name="lock" size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} rightElement={<Feather onPress={() => setShowPass2(prev => !prev)} name={showPass2 ? "eye" : "eye-off"} size={25} style={{ marginTop: 10, color: theme.colors.iconColor }} />} />
          </View>

          <View style={Style.btnC}>
            <Submit text="Set Password" isLoading={isLoading} />
          </View>

        </ScrollView>

      </Box>
    </FormContainer>
  )
}