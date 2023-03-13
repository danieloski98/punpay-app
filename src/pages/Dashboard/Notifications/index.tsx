import { Pressable, View, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomText from '../../../components/General/Text'
import { Box } from '../../../components/General'
import { getNotificationInbox, getIndieNotificationInbox, deleteIndieNotificationInbox  } from 'native-notify';
import { ScrollView } from 'react-native-gesture-handler';
import { INotification } from '../../../models/notification'
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../style/theme';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'

const NotificationCard = ({ message, title, notification_id }: INotification) => {
  const user = useSelector((state: RootState) => state.User);
  const [loading, setLoading] = React.useState(false);
  const handleDelete = React.useCallback(() => {
    setLoading(true);
    deleteIndieNotificationInbox(user.id, notification_id, 6405, 'JhIbh6BDeO8Z5mEBHU50Dh')
    .then((data) => {
      setLoading(false);
    })
    .catch((error) => {
    });
  }, [notification_id]);
  const theme = useTheme<Theme>();
  return (
    <View style={{ width: '100%', borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
      <CustomText variant='body'>{title}</CustomText>
      <CustomText variant='bodylight' mt='s'>{message}</CustomText>
      </View>

      <Pressable onPress={handleDelete} style={{ width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.textInput.backgroundColor }}>
        {!loading && <Feather name="trash-2" size={20} color={theme.colors.text} />}
        {loading && <ActivityIndicator size='small' color={theme.colors.primaryColor} />}
      </Pressable>
    </View>
  )
}

const Notifications = () => {
  const user = useSelector((state: RootState) => state.User);
  const [data, setData] = useState<INotification[]>([]);
  const theme = useTheme<Theme>();
  useEffect(() => {
       (async function() {
        const general = await getNotificationInbox(6405, 'JhIbh6BDeO8Z5mEBHU50Dh')
          let notifications = await getIndieNotificationInbox(user.id, 6405, 'JhIbh6BDeO8Z5mEBHU50Dh');
          const notif = [...notifications]
          setData(notif);
       })()

       return () => {
        //mark all as read
       }
  }, []);
  return (
    <Box backgroundColor='mainBackground' style={{ flex: 1 }}>
        <Box width='100%' backgroundColor='cardPrimaryBackground' height='10%' paddingHorizontal='m' justifyContent='flex-end' elevation={1} shadowColor='mainBackground' >
            <CustomText variant='subheader'>Notifications</CustomText>
        </Box>
        {data.length < 1 && (
          <Box backgroundColor='mainBackground' flex={1} justifyContent='center' alignItems='center'>
              <CustomText>No Notifications</CustomText>
          </Box>
        )}

        <Box backgroundColor='mainBackground' style={{ flex: 1, paddingHorizontal: 20 }}>
        {data.length > 0 && (
          <ScrollView style={{ flex: 1 }} horizontal={false} contentContainerStyle={{ paddingBottom: 20, backgroundColor: theme.colors.mainBackground }}>
            {data.map((item, index) => (
              <NotificationCard {...item} key={index} />
            ))}
          </ScrollView>
        )}
        </Box>
    </Box>
  )
}

export default Notifications