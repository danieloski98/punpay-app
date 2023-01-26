import { View, Text, ScrollView, Dimensions, Platform, Pressable } from 'react-native'
import React from 'react'
import {Text as CustomText} from '../../../General'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../style/theme';
import { LineChart } from 'react-native-wagmi-charts';


const os = Platform.OS;
export const {width: SIZE} = Dimensions.get('window');
const timeline = ['24h', '7d', '2w', '1m', '6m', '1y'];

const StatsTab = () => {
    const [time, setTime] = React.useState('24h');
    const theme = useTheme<Theme>();

    // const data2 = [
    //   {
    //     timestamp: 1625948100000,
    //     value: 33215.25,
    //   },
    //   {
    //     timestamp: 1625947200000,
    //     value: 33510.25,
    //   },
    //   {
    //     timestamp: 1625946300000,
    //     value: 33545.25,
    //   },
    //   {
    //     timestamp: 1625945400000,
    //     value: 33575.25,
    //   },  
    // ];
    new Date().getTime()
    const data2 = [
      { timestamp: 1668449551463, value: 20725.111685463908 },
      { timestamp: 1668449551463, value: 20703.87020352946 },
      { timestamp: 1668449551463, value: 20724.645725389022 },
      { timestamp: 1668449551463, value: 20714.06467140975 }
    ];

    // 20725.111685463908,
    // 20703.87020352946,
    // 20724.645725389022,
    // 20714.06467140975,

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
          <View style={{ width: '100%', paddingTop: 0, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: theme.textInput.backgroundColor, paddingBottom: 40 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <CustomText variant="header" fontSize={37} style={{ fontWeight: os === 'android' ? 'bold':'600' }}>$20,000</CustomText>
              <CustomText variant="bodylight" style={{ color: '#0EA581', marginTop: 5 }}>+1.9%</CustomText>
            </View>
            <View style={{ width: '100%', height: 150, borderBottomWidth: 1, borderBottomColor: theme.textInput.backgroundColor, paddingHorizontal: 20 }}>
              

            <LineChart.Provider data={data2}>
              <LineChart height={150} width={SIZE - 40}>
                <LineChart.Path color="#15A7FA">
                  <LineChart.Gradient />
                </LineChart.Path>
                <LineChart.CursorCrosshair color='#15A7FA' >
                  <LineChart.Tooltip textStyle={{ color: theme.colors.text }} />
                  <LineChart.Tooltip position="bottom">
                    <LineChart.DatetimeText style={{ color: theme.colors.text }} />
                  </LineChart.Tooltip>
                </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>

            </View>

            <View style={{ width: '100%', height: 60, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              {timeline.map((item, index) => (
                <Pressable onPress={() => setTime(item)} key={index.toString()} style={{ width: 63, height: 33, borderRadius: 30, backgroundColor: time === item ? theme.textInput.backgroundColor:'transparent', justifyContent: 'center', alignItems: 'center' }}>
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