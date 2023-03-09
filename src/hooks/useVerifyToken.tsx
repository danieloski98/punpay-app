import { Alert } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../state/Store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useVerifyToken = () => {
  const dispatch = useDispatch<Dispatch>();
    const { isLoading, status, isError, data } = useQuery(['tokenVerification'], () => Axios('/user-auth/verify-token'), {
      // refetchInterval: 10000,
      onError: async (error) => {
        const token = await AsyncStorage.getItem('token')
        if (token === null || token === '') {
          dispatch.loggedIn.logout();
          return;
        } else {
          await AsyncStorage.setItem('token', '');
          Alert.alert('Error', 'Session expired please login');
          dispatch.loggedIn.logout();
        }
        
      }
    })
  return {
    isLoading,
    isError,
    status,
    data,
  }
}

export default useVerifyToken