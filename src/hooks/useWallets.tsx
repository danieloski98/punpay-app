import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/Store'
import Axios from '../utils/api'
import { useQuery } from '@tanstack/react-query'

const useWallets = () => {
    const user = useSelector((state: RootState) => state.User);
    const { isLoading, isError, data, refetch } = useQuery(['wallets', user.id], () => Axios.get(`/user/wallets/${user.id}`), {
      onError: (error: any) => {
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