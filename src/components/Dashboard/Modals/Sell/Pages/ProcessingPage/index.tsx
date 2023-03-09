import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../../../style/theme';
import { Text as CustomText, PrimaryButton } from '../../../../../General'
import { State } from '../../state';
import { currencyFormat } from '../../../../../../utils/currencyconverter';

interface IProps {
    state: State;
    close: (a: boolean) => void;
    transactionType: 'Sell' | 'Send'
}

const ProcessingPage = ({ state, close, transactionType }: IProps) => {
    const theme = useTheme<Theme>()
    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <CustomText variant="subheader" style={{ fontSize: 20 }}>Transaction Processing</CustomText>
            <CustomText variant="bodylight">Your transaction is been processed</CustomText>

            <View style={{ width: '100%', height: 150 }}>
                <Image source={require('../../../../../../res/svgs/hourp.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>

            <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
                <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Currency</CustomText>
                <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                    {state.transactionCurrency}
                </CustomText>
            </View>

            <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
                <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Amount</CustomText>
                <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                    {state.transactionAmount}
                </CustomText>
            </View>

            {transactionType === 'Send' && (
                <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
                    <CustomText variant="subheader" style={{ fontSize: 16 }}>Withdrawal Address</CustomText>
                    <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                        {state.wallet}
                    </CustomText>
                </View>
            )}

            {transactionType === 'Sell' && (
                <>
                    <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
                        <CustomText variant="subheader" style={{ fontSize: 16 }}>Payput Currency</CustomText>
                        <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                            NGN
                        </CustomText>
                    </View>

                    <View style={{ paddingVertical: 20, borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor }}>
                        <CustomText variant="subheader" style={{ fontSize: 16 }}>Payout Amount</CustomText>
                        <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                            {currencyFormat(state.payoutAmount)}
                        </CustomText>
                    </View>
                </>

            )}

            {/* <View style={{ paddingVertical: 20, flexDirection: 'column' }}>
                <CustomText variant="subheader" style={{ fontSize: 16 }}>Transaction Fee</CustomText>
                <CustomText variant="bodylight" style={{ fontSize: 16 }}>
                    {(state.payoutAmount / 100 * 5).toFixed(2)}
                </CustomText>
            </View> */}

            <View>
                <PrimaryButton text="Done" action={() => close(false)} />
            </View>
        </View>
    )
}

export default ProcessingPage