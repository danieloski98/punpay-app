import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Box } from '../../../components/General'
import { Style } from './style'
import { Text as CustomText } from '../../../components/General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { Feather } from '@expo/vector-icons'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import {} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../../../state/Store'
import Axios from '../../../utils/api'

interface IProps {
    navigation: NativeStackNavigationProp<any>;
}

export default function SetPin({navigation}: IProps) {
    const [pin, setPin] = React.useState('');
    const [step, setStep] = React.useState(1);
    const [holder, setHolder] = React.useState('');
    const [match, setMatch] = React.useState(false);
    const user = useSelector((state: RootState) => state.User);
    const dispatch = useDispatch<Dispatch>();

    // create Pin
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => Axios.post('/user-auth/create-pin', data),
        onSuccess: (data) => {
            Alert.alert('Success', data.data.message);
            setPin('')
            setStep(1);
            dispatch.loggedIn.login();
        },
        onError: (error: any) => {
            Alert.alert('Error', error);
            setPin('');
            setHolder('')
            setStep(1);
        }
    })

    const theme = useTheme<Theme>();

    const changePin = (e: string) => {
        if (pin.length === 4) {
            return;
        } else {
            let newp = pin + e;
            setPin(newp);
        }
    }

    React.useEffect(() => {
       (async function() {
        if (step === 1) {
            if (pin.length === 4) {
                setHolder(pin);
                setPin('');
                setStep(2);
            }
        } else {
            if (pin.length === 4) {
                    setMatch(true);
                    if (pin !== holder) {
                        setPin('');
                        setHolder('');
                        setStep(1);
                        Alert.alert('Pin does not match');
                        return
                    }
                    mutate({ userId: user.id, pin }); 
            }
        }
       })()
    }, [pin])

    const clear = () => {
        const newp = pin.slice(0, pin.length - 1);
        setPin(newp);    
    }

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <View style={Style.header}>
        { step > 1 && (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                setHolder('');
            setPin('');
                setStep(1);
            }}>
                <>
                    <Feather name="chevron-left" size={25} color={theme.colors.text} />
                    <CustomText variant="bodylight" >Go Back</CustomText>
                </>
            </TouchableOpacity>
        )}
      </View>

      {step === 1 && (<CustomText fontWeight="bold" variant="body" textAlign="center">CREATE DEVICE PIN</CustomText>)}

      {step === 2 &&  (
       <CustomText fontWeight="bold" variant="body" textAlign="center">CONFIRM DEVICE PIN</CustomText>
      )}

      <View style={{ width: '100%', height: 70, alignItems: 'center' }}>
        <View style={{ width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput style={{...Style.input, backgroundColor: pin.length > 0 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 1 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 2 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 3 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
        </View>
      </View>

     {step === 1 && ( <CustomText fontWeight="400" variant="bodylight" textAlign="center">Enter a PIN you can remember</CustomText>)}

     {step === 2 && (
        <>
            {pin.length < 4 && !match && (
                <CustomText fontWeight="400" variant="bodylight" textAlign="center">Just making sure this matches the previous PIN</CustomText>
            )}

            {pin.length === 4 && !match && (
                <CustomText fontWeight="400" variant="bodylight" textAlign="center" style={{ color: 'red' }}>PIN does not match, please try again</CustomText>
            )}
        </>
     )}


      <View style={{ width: '100%', height: '50%', alignItems: 'center' }}>
        <View style={{ width: '60%', height: '100%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => changePin("1")} style={{ width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">1</CustomText>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => changePin("2")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">2</CustomText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changePin("3")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">3</CustomText>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => changePin("4")} style={{ width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">4</CustomText>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => changePin("5")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">5</CustomText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changePin("6")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">6</CustomText>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => changePin("7")} style={{ width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">7</CustomText>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => changePin("8")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">8</CustomText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changePin("9")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">9</CustomText>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>

                <TouchableOpacity onPress={() => changePin("7")} style={{ width: 60, height: 60, borderRadius: 35, borderWidth: 0, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    {/* <CustomText variant="subheader">7</CustomText> */}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => changePin("0")} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <CustomText variant="subheader" marginTop="s">0</CustomText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => clear()} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Feather name="delete" size={25} color={theme.colors.text} />
                </TouchableOpacity>
            </View>
            
        </View>
      </View>
    </Box>
  )
}