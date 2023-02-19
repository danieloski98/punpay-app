import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'

const useVerifyToken = () => {
    const { isLoading, status, isError, data } = useQuery(['tokenVerification'], () => Axios('/user-auth/verify-token'))
  return {
    isLoading,
    isError,
    status,
    data,
  }
}

export default useVerifyToken