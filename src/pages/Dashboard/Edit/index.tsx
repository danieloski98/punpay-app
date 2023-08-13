import { View, Alert, Pressable } from 'react-native'
import React from 'react'
import { Box, Text as CustomText, FormContainer, Submit } from '../../../components/General'
import { editSchema } from '../../../models/validationSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import { Feather } from '@expo/vector-icons';

const EditDetail = ({ navigation }) => {
    const user = useSelector((state: RootState) => state.User);
    const theme = useTheme<Theme>();
    const queryClient = useQueryClient()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: any) => Axios.put(`/user/${user.id}`, data),
        onSuccess: (data) => {
          Alert.alert('Success', data.data.message);
          queryClient.refetchQueries();
          navigation.navigate('settings')
        },
        onError: (error: any) => {
          Alert.alert('Error', error);
        }
      })
    
    
      const submit = (data: any) => {
        const obj = {
            firstName: data.firstName !== '' ? data.firstName : user.firstName,
            lastName: data.lastName !== '' ? data.lastName : user.lastName,
            phone: data.phone !== '' ? data.phone : user.phone,
        }
        mutate(data);
      }
  return (
    <FormContainer
        initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
        }}
        validationSchema={editSchema}
        onSubmit={submit}
    >
        <Box backgroundColor='mainBackground' flex={1}>
            <Box flexDirection='row' height='15%' alignContent='center' alignItems='center' pt="l" mx='l'>
                <Pressable style={Style.header} onPress={() => { navigation.goBack() }}>
                    <Feather name="chevron-left" size={25} color={theme.colors.text} />
                    <CustomText variant="body" marginLeft="s" style={{ marginBottom: 3 }}>Back</CustomText>
                </Pressable>

                <CustomText variant='subheader' marginLeft='xl'>Edit Details</CustomText>
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
                keyboardType="number-pad"
                name="phone"
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

         


          <View style={Style.btnC}>
            <Submit text="Update" isLoading={isLoading} />
          </View>
        </ScrollView>

        </Box>
    </FormContainer>
  )
}

export default EditDetail

import { StyleSheet } from 'react-native'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import CustomInput from '../../../components/General/TextInput'
import { ScrollView } from 'react-native-gesture-handler'
export const Style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 0
    },
    imgc: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    elevatedBtn: {
        height: 60,
        borderRadius: 60,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {width: 0, height: 0},
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    box: {
        marginTop: 15,
    },
    checkbox: {
        marginTop: 10,
        flexDirection: 'row',
    },
    btnC: {
        marginTop: 25,
    },
});