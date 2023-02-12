import { View, TextInput } from 'react-native'
import React from 'react'
import { Style } from './style'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import useIcons from '../../../../../../hooks/useIcons'

interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
  coin: string;
}

const AmountPage = ({ next, coin }: IProps) => {
    const theme = useTheme<Theme>()
    const { getIcon, getShortName} = useIcons()
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader" style={Style.header}>Buy {getShortName(coin as any)}</CustomText>
      <CustomText variant="bodylight">Enter the amount of {getShortName(coin as any)} you want to buy</CustomText>

      <View style={Style.inputCointainer}>
        <TextInput defaultValue='0.0' keyboardType='number-pad' style={{ fontSize: 55, fontFamily: theme.textVariants.subheader.fontFamily, fontWeight: theme.textVariants.subheader.fontWeight as any, color: theme.colors.text }} />
        <CustomText variant="bodylight" ml="s">{getShortName(coin as any)}</CustomText>
      </View>

      <View style={Style.network}>
        <View style={{ ...Style.netwrokContainer, backgroundColor: theme.textInput.backgroundColor }}>
            <CustomText variant="body">BEP20</CustomText>
        </View>
      </View>

      <CustomText variant="bodylight" textAlign="center" mt="m">(NGN120,000.00)</CustomText>

      <View style={{ marginTop: 40 }}>
        <PrimaryButton text='Continue' action={() => next(2)} />
      </View>
    </View>
  )
}

export default AmountPage