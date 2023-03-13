import { View, Text, Platform, Pressable, Alert } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ModalWrapper from '../../../General/ModalWrapper';
import { FormContainer, PrimaryButton, Submit, TextInput } from '../../../General';
import CustomText from '../../../General/Text';
import Identify from "../../../../res/svg-output/Identity";
import Nin from './Pages/Nin';
import Driverslincence from './Pages/Driverslincence';
import Passport from './Pages/Passport';
import { verificationSchema } from '../../../../models/validationSchema';
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useMutation } from '@tanstack/react-query';
import Axios from '../../../../utils/api';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../../../state/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    close: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

const VerificationModal = ({ close, type }: IProps) => {
    const theme = useTheme<Theme>();
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [picked, setPicked] = React.useState(false);
    const [showPicker, setShowPicker] = React.useState(false);
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    const dispatch = useDispatch<Dispatch>();
    // mutation function
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => Axios.post('/verification/create', data),
        onSuccess: (data) => {
            Alert.alert('Success', data.data.message);
            close(false);
        },
        onError: async (error: string) => {
            const token = await AsyncStorage.getItem('token');
            if (token === '' || token === null) {
                Alert.alert('Error', error);
                dispatch.loggedIn.logout();
                return;
            }
            Alert.alert('Error', error);
        }
    })
    React.useEffect(() => {
        bottomSheetRef.current?.present();
    });

    const onChange = React.useCallback((e, date: Date) => {
        if (Platform.OS === 'android') {
            setDate(date);
            setPicked(true);
        } else {
            setDate(date);
            setPicked(true);
        }
    }, [])

    const showMode = () => {
       if (Platform.OS === 'android') {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
            is24Hour: true,
            style: { backgroundColor: theme.colors.primaryColor}
          });
       } else {
        setShowPicker(true);
       }
      };
    
     
    const title: () => string = React.useCallback(() => {
        const obj = {
            nin: 'nationid',
            'drivers-lincence': 'dirverlicence',
            passport: 'passport'
        }
        return obj[type];
    }, []);

    const submit = React.useCallback((data) => {
        const obj = {
            ...data,
            identification_type: title(),
            identification_dob: date.toDateString(),
        }
        mutate(obj);
    }, []);

    return (
        <ModalWrapper
            ref={bottomSheetRef}
            onClose={() => close(false)}
        >
            <FormContainer
                initialValues={{
                    identification_number: '',
                    identification_name: '',
                }}
                validationSchema={verificationSchema}
                onSubmit={submit}
            >
                <>
                    <CustomText variant="body">Verify with your {title().toUpperCase()}</CustomText>
                    <TextInput name='identification_number' placeholder='Identification Number' placeholderTextColor={theme.colors.text}  leftElement={<Feather name='hash' size={20} color={theme.colors.text} style={{ marginTop: 10}} />} />

                    <TextInput name='identification_name' placeholder='Identification Name' placeholderTextColor={theme.colors.text}  leftElement={<Feather name='user-check' size={20} color={theme.colors.text} style={{ marginTop: 10}} />} />

                    <Pressable 
                    onPress={showMode}
                    style={{ width: '100%', height: 55, borderRadius: 10, backgroundColor: theme.textInput.backgroundColor, marginTop: 20, paddingHorizontal: 20, justifyContent: 'center' }}>
                        {!picked && <CustomText variant='xs'>Select Date of Birth</CustomText>}
                        {picked &&<CustomText variant='xs'>{new Date(date).toDateString()}</CustomText>}
                    </Pressable>

                     {showPicker && (
                        <>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                onChange={onChange}
                                display='spinner'
                                textColor={theme.colors.text}
                                />
                                <PrimaryButton text='Close' action={() => setShowPicker(false)} />
                        </>
                    )}
                    {!showPicker && (
                        <View style={{ marginTop: 20 }}>
                            <Submit text='Submit' isLoading={isLoading} />
                        </View>
                    )}
                </>
            </FormContainer>
        </ModalWrapper>
    )
}

export default VerificationModal