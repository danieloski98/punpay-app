import { View } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomText from '../../../components/General/Text'
import { Box } from '../../../components/General'
import { getNotificationInbox } from 'native-notify';
import { ScrollView } from 'react-native-gesture-handler';
import { INotification } from '../../../models/notification'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../style/theme';

const Notifications = () => {
  const [data, setData] = useState<INotification[]>([]);
  const theme = useTheme<Theme>();
  useEffect(() => {
       (async function() {
          let notifications = await getNotificationInbox(6405, 'JhIbh6BDeO8Z5mEBHU50Dh');
          console.log("notifications: ", notifications);
          setData(notifications);
       })()
  }, []);
  return (
    <Box backgroundColor='mainBackground' style={{ flex: 1 }}>
        <Box width='100%' backgroundColor='cardPrimaryBackground' height='15%' paddingHorizontal='m' justifyContent='center' elevation={1} shadowColor='mainBackground' >
            <CustomText variant='subheader'>Notifications</CustomText>
        </Box>
        {data.length < 1 && (
          <Box backgroundColor='modalBg' flex={1} justifyContent='center' alignItems='center'>
              <CustomText>No Notifications</CustomText>
          </Box>
        )}

        <Box style={{ flex: 1, padding: 20 }}>
        {data.length > 0 && (
          <ScrollView style={{ flex: 1 }} horizontal={false} contentContainerStyle={{ paddingBottom: 20, backgroundColor: theme.colors.mainBackground }}>
            {data.map((item, index) => (
              <View key={index} style={{ elevation: 6, width: '100%', backgroundColor: 'red' }}>
                <CustomText variant='body'>{item.message}</CustomText>
              </View>
            ))}
          </ScrollView>
        )}
        </Box>
    </Box>
  )
}

export default Notifications