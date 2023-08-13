import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../../style/theme';
import CustomText from '../../../General/Text';

export interface IProps {
    title: string;
    icon: JSX.Element;
    type: string;
    action?:() => void;
}

const ActionCard = ({title, icon, type, action = undefined}: IProps) => {
    const navigation = useNavigation<any>();
    const theme = useTheme<Theme>();

    const handlePress = React.useCallback(() => {
        if (type === 'Swap') {
            alert('Swap is Coming soon');
            return;
        }
        if (action === undefined) {
            navigation.navigate('transactiontype', {
                type
            })
        } else {
            action();
        }
    }, [])
  return (
    <View style={{ alignItems: 'center' }}>
    <Pressable 
        onPress={handlePress}
        style={{ width: 40, height: 40, backgroundColor: theme.textInput.backgroundColor, borderRadius: 30, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
        {icon}
    </Pressable>
    <CustomText variant="xs" >{title}</CustomText>
</View>
  )
}

export default ActionCard