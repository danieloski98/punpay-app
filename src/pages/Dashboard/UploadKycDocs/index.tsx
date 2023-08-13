import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Box } from '../../../components/General'
import CustomText from '../../../components/General/Text'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import InputNinModal from '../../../components/Dashboard/Modals/InputNin'
import {getDocumentAsync} from 'expo-document-picker';
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@tanstack/react-query'
import Axios from '../../../utils/api'
import { Feather } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CameraCapturedPicture } from 'expo-camera'
import mimeType from 'mime';

const UploadKYCDoc = ({ navigation }: NativeStackScreenProps<any>) => {
  const [docType, setDocType] = React.useState('');
  const [nin, setNin] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const isDark = useSelector(((state: RootState) => state.isDarkMode));
  const id = useSelector((state: RootState) => state.User.id);
  const theme = useTheme<Theme>();

  const setDoc = React.useCallback((type: number) => {
    switch (type) {
      case 1: {
        setDocType('NIN');
        setShowModal(true);
        break;
      }
      case 2: {
        setDocType(`Driver's Licencse`);
        setShowModal(true);
        break;
      }
      case 3: {
        setDocType(`Passport`);
        setShowModal(true);
        break;
      }
    }
  }, []);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) => Axios.post(`/verification/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }),
    onError: (error) => {
      showMessage({
        message: 'Error',
        description: `${error}`,
        type: 'danger',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30
      });
    },
    onSuccess: (data) => {
      showMessage({
        message: 'Success',
        description: `Doccument uploaded`,
        type: 'success',
        floating: false,
        autoHide: true,
        duration: 6000,
        statusBarHeight: 30
      });
    }
  })

  const openPicker = React.useCallback(async(data: CameraCapturedPicture) => {
    try {
      const str = data.uri.split('.jpg')[0].split('/');
      const request = await fetch(data.uri);
      const blob = await request.blob();
      const obj = {
        uri: data.uri,
        type: mimeType.getType(data.uri),  
        name: `${str[str.length - 1]}.jpg`
      }
      const formData = new FormData();
      formData.append('front', obj as any);
      formData.append('doc_type', docType);
      setShowModal(false);
      mutate(formData);
    } catch (error) {
    }
  }, [docType])
  return (
    <Box backgroundColor='mainBackground' flex={1} paddingTop='xl' style={{ paddingTop: 80 }} padding='m'>

      <Feather name='chevron-left' size={30} color={theme.colors.text} onPress={() => navigation.goBack()} />
      <CustomText variant='subheader' mt='m'>Verify Identity</CustomText>
      <CustomText variant='body'>Financial compliance laws require us to verify your identity in order for you to use our services</CustomText>

      <Box style={{ height: 50 }} />

      <Pressable onPress={() => setDoc(1)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor }}>
          <Ionicons size={30} color={isDark ? 'white': theme.colors.primaryColor} name='person-circle-outline' />
          <CustomText variant="bodylight" ml="m">NIN</CustomText>
          { isLoading && docType === 'ID' && <ActivityIndicator size='small' color={isDark ? 'white': theme.colors.primaryColor} />}
      </Pressable>
      <Box style={{ height: 20 }} />
      <Pressable onPress={() => setDoc(2)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor }}>
          <Ionicons size={30} color={isDark ? 'white': theme.colors.primaryColor} name='car-sport-sharp' />
          <CustomText variant="bodylight" ml="m">Drivers License</CustomText>
          { isLoading && docType === 'DL' && <ActivityIndicator size='small' color={isDark ? 'white': theme.colors.primaryColor} />}
      </Pressable>
      <Box style={{ height: 20 }} />
      <Pressable onPress={() => setDoc(3)} style={{ ...Style.conatiner, backgroundColor: theme.textInput.backgroundColor }}>
          <Ionicons size={30} color={isDark ? 'white': theme.colors.primaryColor} name='earth' />
          <CustomText variant="bodylight" ml="m">Passport</CustomText>
          { isLoading && docType === 'PP' && <ActivityIndicator size='small' color={isDark ? 'white': theme.colors.primaryColor} />}
      </Pressable>

      {showModal && <InputNinModal close={() => setShowModal(false)} action={openPicker} />}
      
    </Box>
  )
}

export default UploadKYCDoc