import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import CustomText from '../../../../../General/Text'
import { IBank } from '../../../../../../models/bank'
import PrimaryButton from '../../../../../General/BorderButton' 
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../style/theme'

interface IProps {
    action: (bank: IBank) => void;
    bank: IBank,
}

const BankChip = ({bank, action}: IProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const theme = useTheme<Theme>()
  const handleClick = React.useCallback(() => {
    setIsLoading(true);
    action(bank);
    setIsLoading(false);
  }, [])
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 0, alignItems: 'center' }}>
                <CustomText variant='body'>{bank.accountName}</CustomText>
                <Image source={require('../../../../../../res/check.png')} style={{ width: 15, height: 15, marginLeft: 5 }} />
            </View>
            <CustomText variant='body'>{bank.name}</CustomText>
            <CustomText variant='bodylight'>{bank.accountNumber}</CustomText>
        </View>
       <View style={{ flex: 0.3}}>
             <PrimaryButton height={30} text='Trade' action={handleClick} radius={20} isLoading={isLoading} />
       </View>
    </View>
  )
}

export default BankChip