import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import CustomText from '../../../General/Text'

interface IProps{
    name: string;
    code: string;
    id: string;
    onSelect: (e: any) => void;
}

const BankChip: React.FC<IProps> = ({name, code, id, onSelect }) => {
    const theme = useTheme<Theme>();

    const returnFirstLetter = useCallback(() => {
        return name.charAt(0).toUpperCase();
    }, [name])

  return (
    <Pressable style={Styles.parent} onPress={() => onSelect({ name, code, id})}>
        <View style={{ ...Styles.Icon, backgroundColor: theme.colors.primaryColor }}>
            <CustomText variant='subheader' style={{ color: 'white' }}>{returnFirstLetter()}</CustomText>
        </View>
        <CustomText variant='body' ml='m'>{name}</CustomText>
    </Pressable>
  )
}

const Styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    Icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default BankChip