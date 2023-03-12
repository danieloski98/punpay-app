import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import {Box, Text as CustomText} from '../../../General'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const Arr = [
    {
        name: 'All',
        num: '',
    },
    {
        name: 'Deposit',
        num: 0,
    },
    {
        name: 'Sell',
        num: 1,
    },
    {
        name: 'Buy',
        num: 2,
    },
    {
        name: 'Swap',
        num: 3,
    },
    {
        name: 'Withdraw',
        num: 4,
    }
]

const TRANSACTIONTYPE = ['ALL', 'RECIEVED', 'SENT', 'SWAP', 'BUY']

const FilterButton = ({ theme, index, setIndex, type, currentIndex, num, setType }) => {
    const handlePress = React.useCallback(() => {
        setIndex(index);
        setType(num);
    }, [])
    return (
        <TouchableOpacity onPress={handlePress} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: index === currentIndex ? theme.colors.primaryColor : 'transparent', marginHorizontal: 0, width: 88 }}>
            <CustomText variant="xs" style={{ color: index === currentIndex ? 'white':theme.colors.text }}>{type}</CustomText>
        </TouchableOpacity>
    )
}

export default function FilterBar({ setType }: { setType: (type: number) => void}) {
    const [inx, setInx] = React.useState(1);
    const theme = useTheme<Theme>()

  return (
    <View style={{ width: '100%', height: 51, backgroundColor: theme.textInput.backgroundColor, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
      
       <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} showsHorizontalScrollIndicator={false}>

        {Arr.map((item, index) => (
            <FilterButton setType={setType} num={item.num} type={item.name} index={index+1} setIndex={setInx} theme={theme} key={index.toString()} currentIndex={inx} />
        ))}

       </ScrollView>

    </View>
  )
}