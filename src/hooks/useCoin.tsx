import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Coin } from './useIcons'
import { useQuery } from '@tanstack/react-query';
import STAT from '../utils/stats';
import { IStat } from '../models/Stat';

const useCoin = (coin: Coin) => {
    const getApiName = React.useCallback(() => {
        switch(coin) {
            case 'Bitcoin': {
                return 'bitcoin'
            }
            case 'DOGE': {
                return 'dogecoin';
            }
            case 'Ethereum': {
                return 'ethereum';
            }
            case 'BUSD': {
                return 'binance-usd';
            }
            case 'BNB': {
                return 'binancecoin';
            }
            case 'Tether' : {
                return 'tether';
            }
            case 'XRP': {
                return 'ripple';
            }
            case 'Litecoin': {
                return 'litecoin';
            }
        }
    }, [coin]);

    // api call
    const { data, isLoading, isError } = useQuery(['getCoinDetails'], () => STAT.get(`/coins/${getApiName()}`), {
        refetchOnMount: true,
        onError: (error: any) => {
            Alert.alert('Error', error);
        }
    });
  return {
    data: data?.data as IStat,
    isLoading,
    isError,
    getApiName,
  }
}

export default useCoin