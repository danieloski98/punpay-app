import { View, Text, Dimensions, Pressable, Switch } from 'react-native'
import React from 'react'
import { Style } from './style'
import Box from '../../../../components/generalComponents/Box'
import CustomText from '../../../../components/generalComponents/Text'
import FaceID from '../../../../res/svgs/face-id.svg'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme'

// redux
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../../state/Store'

const { width } = Dimensions.get('screen')

export default function BioMetricSetup() {

  const [check, setCheck] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();

  const theme = useTheme<Theme>();

  const navigate = () => {
    dispatch.loggedIn.login();
  }

  return (
    <Box backgroundColor="mainBackground" flex={1}>

      <View style={Style.first}>
        <CustomText variant="body" onPress={() => navigate()}>Skip</CustomText>
      </View>

      <View style={Style.second}>
        <CustomText variant="subheader">One more thing</CustomText>
        <CustomText variant="bodylight">Do you want to turn on biometrics login and log in faster?</CustomText>
      </View>

      <View style={Style.imgBox}>
        <FaceID width={width} height={width} />
      </View>

      

      <View style={{ paddingHorizontal: 20, ...Style.last }}>
        
        <Box backgroundColor="mainBackground" style={{...Style.elevatedBtn, backgroundColor: theme.textInput.backgroundColor }}>
          <CustomText variant="bodylight">Enable Biometrics</CustomText>
          <Switch onChange={() => setCheck(prev => !prev)} value={check} />
        </Box>

        <Pressable onPress={() => navigate()} style={{ height: theme.button.height, backgroundColor: theme.colors.primaryColor, width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <CustomText variant="bodylight" color="whiteText">Continue</CustomText>
        </Pressable>

      </View>
    </Box>
  )
}