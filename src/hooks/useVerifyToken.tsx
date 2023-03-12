import { Alert } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../state/Store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useVerifyToken = () => {
  const [shown, setShown] = React.useState(false);

  const dispatch = useDispatch<Dispatch>();
    const { isLoading, status, isError, data } = useQuery(['tokenVerification'], () => Axios('/user-auth/verify-token'), {
      refetchInterval: 10000,
      onError: async (error: any) => {
        const token = await AsyncStorage.getItem('token')
        if (token === null || token === '') {
          dispatch.loggedIn.logout();
          return;
        } else {
          if (!shown) {
            await AsyncStorage.setItem('token', '');
            Alert.alert('Error', error);
            dispatch.loggedIn.logout();
          }
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