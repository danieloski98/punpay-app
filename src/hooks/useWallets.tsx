import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '../state/Store'
import Axios from '../utils/api'
import { useQuery } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useWallets = () => {
  const dispatch = useDispatch<Dispatch>();
    const user = useSelector((state: RootState) => state.User);
    const { isLoading, isError, data, refetch } = useQuery(['wallets', user.id], () => Axios.get(`/user/wallets/${user.id}`), {
      onError: async (error: any) => {
        const token = await AsyncStorage.getItem('token');
        if (token === null || token === '') {
          dispatch.loggedIn.logout();
        }
        Alert.alert('Error', error);
      }
    })
  return {
    isError,
    isLoading,
    data,
    refetch
  }
}

export default useWallets