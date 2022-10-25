import { View, TextInput, Pressable } from 'react-native'
import { Style } from './style'
import React from 'react'
import CustomText from '../../../../../generalComponents/Text'
import PrimaryButton from '../../../../../generalComponents/PrimaryButton'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import Bank from '../../../../../../res/svgs/bank.svg'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
}

const AmountPage: React.FC<IProps> = ({ change }) => {
    const [ha, setHa] = React.useState(false);
    const theme = useTheme<Theme>();
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Sell Bitcoin For FIAT</CustomText>
      <CustomText variant="bodylight">Get paid into your bank account for selling crypto</CustomText>

      {!ha && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your account is currently limited so you cannot trade above 0.003BTC. Verify your account to remove limits</CustomText>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 18 }}>Enter Amount</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <CustomText variant="subheader" style={{ fontSize: 16 }}>BTC</CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CustomText variant="body" style={{ fontSize: 18 }}>You'll recieve </CustomText>
            <CustomText variant="subheader" style={{ fontSize: 18 }} mt="s">NGN0.00</CustomText>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <CustomText variant="subheader" style={{ fontSize: 18 }}>Current Rate</CustomText>
        <CustomText variant="body" style={{ fontSize: 18 }}>NGN745/$1</CustomText>
      </View>

      {ha && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank Account</CustomText>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Bank width={70} height={70} />

                <View style={{ paddingLeft: 20}}>
                    <CustomText variant="subheader" style={{ fontSize: 16 }}>MICHEAL JOHN</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>UNITED BANK FOR AFRICA</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>2072723456</CustomText>
                </View>

               <View style={{ height: '100%'}}>
                <CustomText variant="subheader" style={{ fontSize: 16, color: theme.colors.primaryColor }} ml="s">UNLINK</CustomText>
               </View>
            </View>
        </View>
      )}

      {ha && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your crypto will be sent to PunPay and after we confirm receipt of your payment. You’ll receive the payment straight to your bank account</CustomText>
        </View>
      )}

      {!ha && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank</CustomText>

            <Pressable onPress={() => setHa(true)} style={{ ...Style.linkBtn, height: theme.button.height, backgroundColor: theme.textInput.backgroundColor }}>
                <CustomText variant="subheader" style={{ fontSize: 18, color: theme.colors.primaryColor }}>Link</CustomText>
            </Pressable>
        </View>
      )}
    {ha && (
        <View style={{ marginTop: 20 }}>
            <PrimaryButton text='Continue' action={() => change(2)} />
        </View>
    )}
    </View>
  )
}

export default AmountPage