import { View } from 'react-native'
import React from 'react'
import CustomText from '../../../components/General/Text'
import { Box } from '../../../components/General'

const Notifications = () => {
  return (
    <View style={{ flex: 1 }}>
        <Box width='100%' backgroundColor='cardPrimaryBackground' height='15%' paddingHorizontal='m' justifyContent='center' elevation={1} shadowColor='mainBackground' >
            <CustomText variant='subheader'>Notifications</CustomText>
        </Box>
        <Box backgroundColor='modalBg' flex={1} justifyContent='center' alignItems='center'>
            <CustomText>No Notifications</CustomText>
        </Box>
    </View>
  )
}

export default Notifications