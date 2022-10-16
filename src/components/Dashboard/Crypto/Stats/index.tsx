import { View, Text, ScrollView, Dimensions, Platform, Pressable } from 'react-native'
import React from 'react'
import {ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation} from '@rainbow-me/animated-charts';
import CustomText from '../../../generalComponents/Text'
import { backgroundColor, useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme';

const os = Platform.OS;
export const {width: SIZE} = Dimensions.get('window');
const timeline = ['24h', '7d', '2w', '1m', '6m', '1y'];

const StatsTab = () => {
    const [time, setTime] = React.useState('24h');
    const theme = useTheme<Theme>();

    const data = [
        {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
        {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
        {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
        {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
        {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
        {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
        {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
      ];
    
      const points = monotoneCubicInterpolation({data, range: 40});
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
          <View style={{ width: '100%', paddingTop: 0, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: theme.textInput.backgroundColor, paddingBottom: 40 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <CustomText variant="header" fontSize={37} style={{ fontWeight: os === 'android' ? 'bold':'600', color: 'lightgrey' }}>$20,000</CustomText>
              <CustomText variant="bodylight" style={{ color: '#0EA581', marginTop: 5 }}>+1.9%</CustomText>
            </View>
            <View style={{ width: '100%', height: 250, borderBottomWidth: 1, borderBottomColor: theme.textInput.backgroundColor, paddingHorizontal: 20 }}>
              
            <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
              <ChartPath height={200} stroke="#15A7FA" width={SIZE - 40} />
              <ChartDot style={{ backgroundColor: '#15A7FA' }} />
            </ChartPathProvider>

            </View>

            <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              {timeline.map((item, index) => (
                <Pressable onPress={() => setTime(item)} key={index.toString()} style={{ width: 63, height: 33, borderRadius: 30, backgroundColor: time === item ? 'whitesmoke':'transparent', justifyContent: 'center', alignItems: 'center' }}>
                  <CustomText variant="body" fontSize={15} >{item}</CustomText>
                </Pressable>
              ))}
            </View>

          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
            <CustomText variant="subheader">Market Stats</CustomText>

            <View style={{ flexDirection: 'row', height: 100 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CustomText variant="bodylight" fontSize={17}>Market Cap</CustomText>
                <CustomText variant="subheader" fontSize={17}>$557.7B</CustomText>
              </View>

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CustomText variant="bodylight" fontSize={17}>Trading Activity</CustomText>
                <CustomText variant="subheader" fontSize={17}>78% Buy</CustomText>
              </View>
            </View>

            <View style={{ flexDirection: 'row', height: 100 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CustomText variant="bodylight" fontSize={17}>Volume (24h)</CustomText>
                <CustomText variant="subheader" fontSize={17}>$35.7B</CustomText>
              </View>

              <View style={{ flex: 1, justifyContent: 'center' }}>
                <CustomText variant="bodylight" fontSize={17}>Supply</CustomText>
                <CustomText variant="subheader" fontSize={17}>19.1M BTC</CustomText>
              </View>
            </View>

          </View>

          
        </ScrollView>
  )
}

export default StatsTab