import { View, TextInput, Pressable } from 'react-native'
import { Style } from './style'
import React from 'react'
import {Text as CustomText, PrimaryButton } from '../../../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'
import Bank from '../../../../../../res/svg-output/Bank'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../state/Store'
import useIcons from '../../../../../../hooks/useIcons'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
}

const AmountPage = ({ change }: IProps) => {
    const [ha, setHa] = React.useState(false);
    const theme = useTheme<Theme>();
    const coin = useSelector((state: RootState) => state.Coin);
    const bank = useSelector((state: RootState) => state.Bank);
    const user = useSelector((state: RootState) => state.User);
    const {getShortName} = useIcons();
  return (
    <View style={Style.parent}>
      <CustomText variant="subheader">Sell {getShortName(coin as any)} For FIAT</CustomText>
      <CustomText variant="bodylight">Get paid into your bank account for selling crypto</CustomText>

      {!user.KYCVerified && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your account is currently limited so you cannot trade above 0.003BTC. Verify your account to remove limits</CustomText>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <CustomText variant="subheader" style={{ fontSize: 18 }}>Enter Amount</CustomText>
        <View style={{...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
            <TextInput defaultValue='0.00' style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
            <CustomText variant="subheader" style={{ fontSize: 16 }}>{getShortName(coin as any)}</CustomText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <CustomText variant="body" style={{ fontSize: 18 }}>You'll recieve </CustomText>
            <CustomText variant="subheader" style={{ fontSize: 18 }} mt="s">NGN0.00</CustomText>
        </View>
      </View>

      {/* <View style={{ marginTop: 10 }}>
        <CustomText variant="subheader" style={{ fontSize: 18 }}>Current Rate</CustomText>
        <CustomText variant="body" style={{ fontSize: 18 }}>NGN745/$1</CustomText>
      </View> */}

      {bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank Account</CustomText>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                <Bank width={70} height={70} />

                <View style={{ paddingLeft: 20}}>
                    <CustomText variant="subheader" style={{ fontSize: 16 }}>{bank.accountName}</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.name}</CustomText>
                    <CustomText variant="xs" style={{ fontSize: 14 }}>{bank.accountNumber}</CustomText>
                </View>

               {/* <View style={{ height: '100%'}}>
                <CustomText variant="subheader" style={{ fontSize: 16, color: theme.colors.primaryColor }} ml="s">UNLINK</CustomText>
               </View> */}
            </View>
        </View>
      )}

      {!ha && (
        <View style={Style.upgradeContainer}>
            <CustomText variant="bodylight">Your crypto will be sent to PunPay and after we confirm receipt of your payment. You’ll receive the payment straight to your bank account</CustomText>
        </View>
      )}

      {!bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 18 }}>Bank</CustomText>

            <Pressable onPress={() => setHa(true)} style={{ ...Style.linkBtn, height: theme.button.height, backgroundColor: theme.textInput.backgroundColor }}>
                <CustomText variant="subheader" style={{ fontSize: 18, color: theme.colors.primaryColor }}>Link</CustomText>
            </Pressable>
        </View>
      )}
    {bank.accountNumber && (
        <View style={{ marginTop: 20 }}>
            <PrimaryButton text='Continue' action={() => change(2)} />
        </View>
    )}
    </View>
  )
}

export default AmountPage