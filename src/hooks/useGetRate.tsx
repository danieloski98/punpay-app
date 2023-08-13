import { Alert } from 'react-native'
import React from 'react'
import { coinType } from './useIcons'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch } from '../state/Store'
import { useDispatch } from 'react-redux'

interface IProps {
    currency?: coinType,
    transactionType: 'buy' | 'sell'
}

const useGetRate = ({ currency, transactionType }: IProps) => {
    const navigation = useNavigation()
    const dispatch = useDispatch<Dispatch>();
    const { isLoading, data } = useQuery(['rate', transactionType], () => Axios.get(`/rate/usd/${transactionType}`), {
      refetchOnMount: true,
      refetchInterval: 50000,
        onError: async (error: any) => {
          const token = await AsyncStorage.getItem('token');
          if (token === null || token === '') {
            dispatch.loggedIn.logout();
            Alert.alert('Error', error);
            return;
          }
            Alert.alert('Error', 'Couldn\'t get the rate');
            navigation.goBack();
        }
    })
  return {
    isLoading,
    data: data?.data,
  }
}

export default useGetRate