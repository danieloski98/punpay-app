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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Axios from '../../../utils/api';
import { showMessage } from 'react-native-flash-message';


const NotificationCard = ({ title, userId, body, id }: INotification) => {
  const user = useSelector((state: RootState) => state.User);
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: string) => Axios.delete(`/notification/${data}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['getNotifications']);
    },
    onError: (error: string) => {
      showMessage({
        message: 'An error occured',
        description: error,
        statusBarHeight: 20,
        floating: false,
        autoHide: true,
        duration: 6000,
        type: 'danger',
        animated: true,
        hideOnPress: true,
      })
    }
  })
  const handleDelete = React.useCallback(() => {
    mutate(id)
  }, []);
  const theme = useTheme<Theme>();
  return (
    <View style={{ width: '100%', borderBottomWidth: 2, borderBottomColor: theme.textInput.backgroundColor, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
      <CustomText variant='body'>{title}</CustomText>
      <CustomText variant='bodylight' mt='s'>{body}</CustomText>
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

  const { isLoading, error } = useQuery(['getNotifications'], () => Axios.get('/notification/user'), {
    // refetchInterval: 1000,
    onSuccess: (data) => {
      setData(data.data.data);
    }
  });
  
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

        <Box backgroundColor='mainBackground' style={{ flex: 1, paddingHorizontal: 0 }}>
        {data.length > 0 && (
          <ScrollView style={{ flex: 1 }} horizontal={false} contentContainerStyle={{ padding: 20, backgroundColor: theme.colors.mainBackground }}>
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