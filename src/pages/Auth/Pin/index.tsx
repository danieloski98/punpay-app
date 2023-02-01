import { View, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import React from 'react'
import { Box } from '../../../components/General'
import { Style } from './style'
import { Text as CustomText } from '../../../components/General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import FaceID from '../../../res/svg-output/Fill23'
// import FaceID from '../../../../res/svgs/Fill-23.svg'
import * as LocalAuthentication from 'expo-local-authentication';

import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../state/Store'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface IProps {
    navigation: NativeStackNavigationProp<any>;
}

export default function Pin({navigation}: IProps) {
    const [pin, setPin] = React.useState([] as Array<string>);
    const [step, setStep] = React.useState(1);
    const [holder, setHolder] = React.useState('');
    const [match, setMatch] = React.useState(false);

    const theme = useTheme<Theme>();
    const pinS = useAsyncStorage('PIN')
    const dispatch = useDispatch<Dispatch>();

    const changePin = (e: string) => {
        if (pin.length === 4) {
            return;
        } else {
            setPin(prev => [...prev, e]);
        }
    }

    React.useEffect(() => {
        if (step === 1) {
            if (pin.length === 4) {
                setHolder(pin.toString());
                setPin([]);
                setStep(2);
            }
        } else {
            if (pin.length === 4) {
                if (pin.toString() === holder) {
                    setMatch(true);
                    pinS.setItem(pin.toString());
                    navigation.navigate('biometric')
                } else {
                    setMatch(false);
                }
            }
        }
    }, [pin])

    const clear = () => {
        const copy = [...pin];
        copy.splice(pin.length - 1, 1);
        setPin(copy);    
    }

    const auth = async () => {
        const res = await LocalAuthentication.authenticateAsync({promptMessage: 'Sign in to Punpay'});
        if (res.success) {
            dispatch.loggedIn.login();
        } else {
            Alert.alert('Error', 'Authentication failed')
        }
    }

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <View style={Style.header}>
        { step > 1 && (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                setHolder('');
                setPin([]);
                setStep(1);
            }}>
                <>
                    <Feather name="chevron-left" size={25} color={theme.colors.text} />
                    <CustomText variant="bodylight" >Go Back</CustomText>
                </>
            </TouchableOpacity>
        )}
      </View>

      <CustomText fontWeight="bold" variant="body" textAlign="center">WELCOME BACK, MICHAEL</CustomText>


      <View style={{ width: '100%', height: 70, alignItems: 'center' }}>
        <View style={{ width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInput style={{...Style.input, backgroundColor: pin.length > 0 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 1 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 2 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
            <TextInput style={{...Style.input, backgroundColor: pin.length > 3 ? theme.colors.primaryColor : theme.textInput.backgroundColor }} />
        </View>
      </View>

     <CustomText fontWeight="400" variant="bodylight" textAlign="center">Enter your PIN to continue</CustomText>


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

                <TouchableOpacity onPress={auth} style={{  width: 60, height: 60, borderRadius: 35, borderWidth: 1, borderColor: theme.colors.primaryColor, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    {Platform.OS === 'android' && <Ionicons name="finger-print" size={25} />}
                    {Platform.OS === 'ios' && <FaceID width={30} height={30} fill={theme.colors.text} />}
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