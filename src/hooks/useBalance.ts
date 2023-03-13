import { Alert } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux';
import { Dispatch } from '../state/Store';

const useBalance = () => {
  const dispatch = useDispatch<Dispatch>();
    const { isLoading, isError, data, refetch } = useQuery(['balance'], () => Axios.get('/user/balance'), {
        refetchInterval: 10000,
        onError: async (error: any) => {
            const token = await AsyncStorage.getItem('token');
            if (token === null || token === '') {
              dispatch.loggedIn.logout();
            }
            Alert.alert('Error', error);
        }
    })
  return {
    isLoading,
    isError,
    data,
    refetch
  }
}

export default useBalance