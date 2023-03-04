import { Alert } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../state/Store'

const useVerifyToken = () => {
  const dispatch = useDispatch<Dispatch>();
    const { isLoading, status, isError, data } = useQuery(['tokenVerification'], () => Axios('/user-auth/verify-token'), {
      onError: (error) => {
        Alert.alert('Error', 'Session expired please login');
        dispatch.loggedIn.logout();
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