import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api';

const useBalance = () => {
    const { isLoading, isError, data, refetch } = useQuery(['balance'], () => Axios.get('/user/balance'), {
        onError: (error: any) => {
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