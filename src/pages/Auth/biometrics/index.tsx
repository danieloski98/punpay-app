import { View, Text, Dimensions, Pressable, Switch } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Style } from './style'
import { Box } from '../../../components/General'
import { Text as CustomText, PrimaryButton } from '../../../components/General'
import FaceID from '../../../res/svg-output/FaceId'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { LoggedInAtom } from '../../../state/states'
import { useAtom } from 'jotai'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../state/Store'

const { width } = Dimensions.get('screen')

export default function BioMetricSetup() {
  const [check, setCheck] = React.useState(false);
  const dispatch = useDispatch<Dispatch>();
  const theme = useTheme<Theme>();

  const navigate = () => {
   dispatch.loggedIn.login();
  }

  const change = useCallback(async () => {
    setCheck(prev => !prev);
    await AsyncStorage.setItem('biometric', check ? 'true':'false');
  }, []);

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
          <Switch onChange={change} value={check} />
        </Box>

        <Box marginTop="l">
          <PrimaryButton text='Continue' action={navigate}  />
        </Box>
        

      </View>
    </Box>
  )
}