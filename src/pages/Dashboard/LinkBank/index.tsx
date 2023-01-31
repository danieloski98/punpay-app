import { View, ScrollView, TextInput, Pressable, Button, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Box, Text as CustomText, Dropdown, FormContainer, PrimaryButton, Submit } from '../../../components/General'
import { Feather } from '@expo/vector-icons'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { BankSchema } from '../../../models/validationSchema'
import BanksModal from '../../../components/Dashboard/Modals/BanksModal'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { CustomInput } from '../../../components/General/TextInput'

const defaultState = {
  id: 0,
  code: '',
  name: 'Select Bank',
}

type action = {
  type: 'UPDATE',
  payload: typeof defaultState,
}

const reducer = (state, action: action) => {
  switch (action.type) {
    case 'UPDATE': {
      state = { ...action.payload };
      console.log(state);
    }
      return state;
  }
}

const LinkBank = ({ navigation }) => {
  const [bankName, setBankName] = useState('Select Bank')
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  const [showBanks, setShowBanks] = React.useState(false);
  const bottomsheetRef = React.useRef<BottomSheetModal>(null);

  // MUTATION
  const { isLoading, mutate } = useMutation({
    mutationKey: ['createBank'],
    mutationFn: (data) => Axios.post('/bank/create', data),
    onSuccess: (data) => {
      console.log(data.data.message);
    },
    onError: (error: any) => {
      Alert.alert('Error', error)
    }
  })


  const theme = useTheme<Theme>()

  const setBank = React.useCallback((item: Partial<Bank> | any ) => {
    dispatch({ type: 'UPDATE', payload: item });
    bottomsheetRef.current?.close();
  }, []);

  const submit = (data: any) => {
    mutate({ ...data, ...state })
  }


  return (
    <FormContainer
      validationSchema={BankSchema}
      initialValues={{
        accountNumber: '',
      }}
      onSubmit={submit}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box backgroundColor="mainBackground" style={Style.parent}>



          <Pressable onPress={() => navigation.goBack()} style={Style.backContainer}>
            <Feather name="chevron-left" size={25} color={theme.colors.text} />
            <CustomText variant="xs">Go Back</CustomText>
          </Pressable>

          <View style={Style.headerContainer}>
            <CustomText variant="subheader" style={{ fontSize: 20 }}>Link a bank account</CustomText>
            <View style={{ width: '30%' }}>
              <Submit text="Link" isLoading={isLoading} />
            </View>
          </View>

          <View style={Style.disclaimerBox}>
            <CustomText>Ensure the name on this account matches what is on your PunPay Account.</CustomText>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

            <View style={{ marginTop: 20 }}>
              <CustomText variant="subheader" style={{ fontSize: 15 }}>Bank</CustomText>
              <Pressable onPress={() => bottomsheetRef.current?.present() } style={{ ...Style.textInput, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height }}>
                <CustomText style={{ flex: 1 }}>{state.name}</CustomText>
                <Feather name="chevron-down" size={25} color={theme.colors.text} />
              </Pressable>
              {/* <Dropdown value={[{ label: '', value: ''}]} /> */}
             
            </View>

            <View style={{ marginTop: 20 }}>
                <CustomInput name="accountNumber" label="Account Number" leftElement={<></>} style={{ flex: 1, color: theme.colors.text }} keyboardType='number-pad' />
            </View>


          </ScrollView>

              <BanksModal onClose={() => setShowBanks(false)} ref={bottomsheetRef} onSelect={setBank} />
         
        </Box>
      </GestureHandlerRootView>
    </FormContainer>
  )
}

export default LinkBank