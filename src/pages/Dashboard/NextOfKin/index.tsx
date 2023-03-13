import { View, Text, Pressable, Alert, ScrollView } from 'react-native'
import React from 'react'
import { Style } from './style'
import { Box, Text as CustomText, TextInput as CustomInput, PrimaryButton, FormContainer, Submit } from '../../../components/General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import { Feather } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { changePasswordSchema, nextofkinSchema } from '../../../models/validationSchema'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'


export default function NextOfKin({ navigation }: any) {
  const [showPass, setShowPass] = React.useState(false);
  const [newp, setNewP] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const user = useSelector((state: RootState) => state.User);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => Axios.put('/user/create-next-of-kin', data),
    onSuccess: (data) => {
      Alert.alert('Success', data.data.message);
      navigation.navigate('settings')
    },
    onError: (error: any) => {
      Alert.alert('Error', error);
    }
  })


  const submit = (data: any) => {
    delete data.confirmPassword;
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
      validationSchema={nextofkinSchema}
      onSubmit={submit}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        relationship: '',
        phoneNumber: ''
      }}
    >
      <Box backgroundColor="mainBackground" flex={1} >

        <Box flexDirection='row' height='15%' alignContent='center' alignItems='center' pt="l" mx='l'>
          <Pressable style={Style.header} onPress={() => { navigation.goBack() }}>
            <Feather name="chevron-left" size={25} color={theme.colors.text} />
            <CustomText variant="body" marginLeft="s" style={{ marginBottom: 3 }}>Back</CustomText>
          </Pressable>

          <CustomText variant='subheader' marginLeft='xl'>Next of kin</CustomText>
        </Box>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <View>
            <View style={Style.box}>
              <CustomInput
                name="firstName"
                label="First Name"

                leftElement={
                  <Feather
                    name="user"
                    size={25}
                    style={{ marginTop: 10, color: theme.colors.iconColor }}
                  />
                }
              />
            </View>
          </View>

          <View style={{ marginTop: 0 }}>
            <View style={Style.box}>
              <CustomInput
                keyboardType="visible-password"
                name="lastName"
                label="Last Name"
                leftElement={
                  <Feather
                    name="user"
                    size={25}
                    style={{ marginTop: 10, color: theme.colors.iconColor }}
                  />
                }
              />
            </View>
          </View>

          <View style={{ marginTop: 0 }}>
            <View style={Style.box}>
              <CustomInput
                keyboardType="email-address"
                name="email"
                label="Email"
                leftElement={
                  <Feather
                    name="at-sign"
                    size={25}
                    style={{ marginTop: 10, color: theme.colors.iconColor }}
                  />
                }
              />
            </View>
          </View>

          <View style={{ marginTop: 0 }}>
            <View style={Style.box}>
              <CustomInput
                keyboardType="number-pad"
                name="phoneNumber"
                label="Phone Number"
                leftElement={
                  <Feather
                    name="phone"
                    size={25}
                    style={{ marginTop: 10, color: theme.colors.iconColor }}
                  />
                }
              />
            </View>
          </View>

          <View style={{ marginTop: 0 }}>
            <View style={Style.box}>
              <CustomInput
                keyboardType="ascii-capable"
                name="relationship"
                label="Relationship"
                leftElement={
                  <Feather
                    name="users"
                    size={25}
                    style={{ marginTop: 10, color: theme.colors.iconColor }}
                  />
                }
              />
            </View>
          </View>


          <View style={Style.btnC}>
            <Submit text="Update next of kin" isLoading={isLoading} />
          </View>
        </ScrollView>

      </Box>
    </FormContainer>
  )
}