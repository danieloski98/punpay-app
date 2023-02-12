import { View, Pressable } from 'react-native'
import {Text as CustomText } from '../../General'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import An from '../../../res/svg-output/An'

const Compaliance = () => {
    const theme = useTheme<Theme>();
    const navigation = useNavigation<any>()
  return (
    <View style={{ width: '100%', height: 140, paddingVertical: 20, paddingHorizontal: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>

            <View style={{ flexDirection: 'row', width: '80%' }}>
              <View style={{ width: 50, height: 50, borderRadius: 25 }}>
                <An width={50} height={50} />
              </View>
              <CustomText variant="bodylight" style={{ width: '100%', marginLeft: 10 }}>Financial compliance laws require us to verify your identity in order for you to use our services</CustomText>
            </View>

            <Pressable onPress={() => navigation.navigate('kyc')} style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
              <CustomText color="primaryColor">Get Started</CustomText>
              <Feather name="arrow-right" size={20} color={theme.colors.primaryColor} />
            </Pressable>

          </View>
  )
}

export default Compaliance