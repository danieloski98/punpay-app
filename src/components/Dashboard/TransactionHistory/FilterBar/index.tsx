import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'
import CustomText from '../../../generalComponents/Text'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

export default function FilterBar() {
    const [inx, setInx] = React.useState(2);
    const theme = useTheme<Theme>()

  return (
    <View style={{ width: '100%', height: 51, backgroundColor: theme.textInput.backgroundColor, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
      
       <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} showsHorizontalScrollIndicator={false}>

       <TouchableOpacity onPress={() => setInx(1)} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: inx === 1 ? theme.colors.primaryColor : 'transparent', marginHorizontal: 0, width: 88 }}>
            <CustomText variant="xs" style={{ color: inx === 1 ? 'white':theme.colors.text }}>All</CustomText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setInx(2)} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: inx === 2 ? theme.colors.primaryColor : 'transparent', marginHorizontal: 5, width: 88 }}>
            <CustomText variant="xs" style={{ color: inx === 2 ? 'white':theme.colors.text }}>Recieved</CustomText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setInx(3)} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: inx === 3 ? theme.colors.primaryColor : 'transparent', marginHorizontal: 5, width: 88 }}>
            <CustomText variant="xs" style={{ color: inx === 3 ? 'white':theme.colors.text }}>Sent</CustomText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setInx(4)} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: inx === 4 ? theme.colors.primaryColor : 'transparent', marginHorizontal: 5, width: 88 }}>
            <CustomText variant="xs" style={{ color: inx === 4 ? 'white':theme.colors.text }}>Swap</CustomText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setInx(5)} style={{ padding: 10, height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: inx === 5 ? theme.colors.primaryColor : 'transparent', marginHorizontal: 5, width: 88 }}>
            <CustomText variant="xs" style={{ color: inx === 5 ? 'white':theme.colors.text }}>Processing</CustomText>
        </TouchableOpacity>

       </ScrollView>

    </View>
  )
}