import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Style } from './style'
import CustomText from '../../../../../generalComponents/Text'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import Bitcoin from '../../../../../../res/svgs/Bitcoin.svg'
import Ex from '../../../../../../res/svgs/ex.svg'
import USDT from '../../../../../../res/svgs/usdt.svg'
import { Feather, FontAwesome } from '@expo/vector-icons'
import PrimaryButton from '../../../../../generalComponents/PrimaryButton'

interface IProps {
  next: React.Dispatch<React.SetStateAction<number>>;
}

const AmountPage: React.FC<IProps> = ({ next }) => {
  const theme = useTheme<Theme>();
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Swap Crypto</CustomText>
      <CustomText variant="bodylight">Convert Crypto Seamlessly</CustomText>

      <View style={Style.amountContainer}>
        <CustomText>Amount</CustomText>
        <View style={{ ...Style.selectContainer, borderBottomColor: theme.textInput.backgroundColor }}>

          <View style={Style.inputContainer}>
            <TextInput defaultValue="0.0" style={{ flex: 1, fontSize: theme.textVariants.subheader.fontSize, fontWeight: '500', color: theme.colors.text }} keyboardType="number-pad" />
            <CustomText variant="body">BTC</CustomText>
          </View>

          <View style={Style.dropDownContainer}>
            <Bitcoin width={30} height={30} />
            <CustomText variant="bodylight" mx='m'>BTC</CustomText>
            <Feather name="chevron-down" size={15} color={theme.colors.text} />
          </View>

        </View>
        <CustomText>0.0034BTC Avaliable</CustomText>
      </View>

      <View style={{ height: 100, justifyContent: 'center' }}>
        <Ex width={40} height={40} />
      </View>

      <View style={{...Style.amountContainer, marginTop: 0 }}>
        <CustomText>Amount</CustomText>
        <View style={{ ...Style.selectContainer, borderBottomColor: theme.textInput.backgroundColor }}>

          <View style={Style.inputContainer}>
            <TextInput defaultValue="0.0" style={{ flex: 1, fontSize: theme.textVariants.subheader.fontSize, fontWeight: '500', color: theme.colors.text }} keyboardType="number-pad" />
            <CustomText variant="body">USDT</CustomText>
          </View>

          <View style={Style.dropDownContainer}>
            <USDT width={30} height={30} />
            <CustomText variant="bodylight" mx='m'>USDT</CustomText>
            {/* <Feather name="chevron-down" size={15} color={theme.colors.text} /> */}
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
          <CustomText variant="bodylight" ml="s">0.0002BTC</CustomText>
        </View>
      </View>

      <View style={{ padding: 15, borderRadius: 20, backgroundColor: '#ff886049', marginTop: 20 }}>
        <CustomText variant="bodylight">Swap is only available for USDT BEP20</CustomText>
      </View>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton text='Swap' action={() => next(2)} />
      </View>
    </View>
  )
}

export default AmountPage