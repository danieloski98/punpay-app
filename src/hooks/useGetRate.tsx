import { Alert } from 'react-native'
import React from 'react'
import { coinType } from './useIcons'
import { useQuery } from '@tanstack/react-query'
import Axios from '../utils/api'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    currency?: coinType,
    transactionType: 'buy' | 'sell'
}

const useGetRate = ({ currency, transactionType }: IProps) => {
    const navigation = useNavigation()
    const { isLoading, data } = useQuery(['rate'], () => Axios.get(`/rate/usd/${transactionType}`), {
        onError: (error) => {
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