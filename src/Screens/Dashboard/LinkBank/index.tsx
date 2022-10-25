import { View, ScrollView, TextInput, Pressable } from 'react-native'
import React from 'react'
import Box from '../../../components/generalComponents/Box'
import CustomText from '../../../components/generalComponents/Text'
import PrimaryButton from '../../../components/generalComponents/PrimaryButton'
import { Feather } from '@expo/vector-icons'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'

const LinkBank = ({ navigation }) => {
    const theme = useTheme<Theme>()
  return (
    <Box backgroundColor="mainBackground" style={Style.parent}>

      <Pressable onPress={() => navigation.goBack()} style={Style.backContainer}>
        <Feather name="chevron-left" size={25} color={theme.colors.text} />
        <CustomText variant="xs">Go Back</CustomText>
      </Pressable>

      <View style={Style.headerContainer}>
        <CustomText variant="subheader" style={{ fontSize: 20 }}>Link a bank account</CustomText>
        <View style={{ width: '30%'}}>
            <PrimaryButton text="Link" action={() => {}} />
        </View>
      </View>

      <View style={Style.disclaimerBox}>
        <CustomText>Ensure the name on this account matches what is on your PunPay Account.</CustomText>
      </View>

     <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={{ marginTop: 20}}>
            <CustomText variant="subheader" style={{ fontSize: 15 }}>Bank</CustomText>
            <View style={{ ...Style.textInput, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height }}>
                <TextInput style={{ flex: 1, color: theme.colors.text }} />
                <Feather name="chevron-down" size={25} color={theme.colors.text} />
            </View>
        </View>

        <View style={{ marginTop: 20}}>
            <CustomText variant="subheader" style={{ fontSize: 15 }}>Account Number</CustomText>
            <View style={{ ...Style.textInput, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height }}>
                <TextInput style={{ flex: 1, color: theme.colors.text }} />
            </View>
        </View>

        <View style={{ marginTop: 20}}>
            <CustomText variant="subheader" style={{ fontSize: 15 }}>BVN</CustomText>
            <View style={{ ...Style.textInput, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height }}>
                <TextInput style={{ flex: 1, color: theme.colors.text }} />
            </View>
            <CustomText variant="xs" style={{  }}>This is only collected for verification purposes. We do not store your BVN details.</CustomText>
        </View>

        <View style={{ marginTop: 20}}>
            <CustomText variant="subheader" style={{ fontSize: 15 }}>Date of birth</CustomText>
            <View style={{ ...Style.textInput, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height }}>
                <TextInput style={{ flex: 1, color: theme.colors.text }} />
            </View>
        </View>

     </ScrollView>

    </Box>
  )
}

export default LinkBank