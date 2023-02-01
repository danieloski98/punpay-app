import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Box, Text as CustomText, TextInput as CustomInput, PrimaryButton, FormContainer, Submit } from '../../../components/General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import { Feather } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { changePasswordSchema } from '../../../models/validationSchema'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'


export default function NextOfKin({ navigation }: any) {
  const [showPass, setShowPass] = React.useState(false);
  const [newp, setNewP] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const user = useSelector((state: RootState) => state.User);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Axios.put('/user/change-password', data),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      navigation.navigate('settings')
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert('Error', error);
    }
  })


  const submit = (data: any) => {
    delete data.confirmPassword;
    console.log(data);
    const obj = {
      ...data,
      id: user.id,
    }
    mutate(obj);
  }


  const dispatch = useDispatch<Dispatch>();
  const darkMode = useSelector((state: RootState) => state.isDarkMode);

  const theme = useTheme<Theme>();
  return (
    <FormContainer
      validationSchema={changePasswordSchema}
      onSubmit={submit}
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }}
    >
      <Box backgroundColor="mainBackground" flex={1} style={{ paddingHorizontal: 20 }}>

        <Pressable style={Style.header} onPress={() => { navigation.goBack() }}>
          <Feather name="chevron-left" size={25} color={theme.colors.text} />
          <CustomText variant="body" marginLeft="s">Back</CustomText>
        </Pressable>

        <View>
          <View style={Style.box}>
            <CustomInput keyboardType="visible-password"
              name="oldPassword"
              label="Old Password"
              isPassword={!showPass}
              leftElement={
                <Feather
                  name="lock"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              rightElement={
                <Feather
                  onPress={() => setShowPass((prev) => !prev)}
                  name={showPass ? "eye" : "eye-off"}
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              } />
          </View>
        </View>

        <View style={{ marginTop: 0 }}>
          <View style={Style.box}>
            <CustomInput
              keyboardType="visible-password"
              name="newPassword"
              label="New Password"
              isPassword={!newp}
              leftElement={
                <Feather
                  name="lock"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              rightElement={
                <Feather
                  onPress={() => setNewP((prev) => !prev)}
                  name={newp ? "eye" : "eye-off"}
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              } />
          </View>
        </View>


        <View style={{ marginTop: 0 }}>
          <View style={Style.box}>
            <CustomInput keyboardType="visible-password"
              name="confirmPassword"
              label="Confrim Password"
              isPassword={!confirm}
              leftElement={
                <Feather
                  name="lock"
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              }
              rightElement={
                <Feather
                  onPress={() => setConfirm((prev) => !prev)}
                  name={confirm ? "eye" : "eye-off"}
                  size={25}
                  style={{ marginTop: 10, color: theme.colors.iconColor }}
                />
              } />
          </View>
        </View>

        <View style={Style.btnC}>
          <Submit text="Update Password" isLoading={isLoading} />
        </View>

      </Box>
    </FormContainer>
  )
}