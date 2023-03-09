import { View, Text } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking'

const useOpenWhatsapp = () => {
    const openwhatsapp = React.useCallback(async() => {
        const w = `whatsapp://send?text=this is a text&phone=08138590346`;
         await Linking.openURL('https://wa.me/message/LX3XCNXKYMVVK1')
       }, []);
  return {
    openwhatsapp,
  }
}

export default useOpenWhatsapp