import { View, Text } from 'react-native'
import React from 'react'
import { Coin } from './useIcons';

const useMinimiumWithdrawal = (coin: Coin) => {
    const getMinimiumAmount = React.useCallback(() => {
        switch(coin) {
            case 'Bitcoin': {
                return 0.0007
            }
            case 'DOGE': {
                return 15
            }
            case 'Ethereum': {
                return 0.009
            }
            case 'BUSD': {
                return 2;
            }
            case 'BNB': {
                return 0.003;
            }
            case 'Tether' : {
                return 2
            }
            case 'XRP': {
                return 3
            }
            case 'Litecoin': {
                return 0.005;
            }
        }
    }, [coin]);
  return {
    getMinimiumAmount
  }
}

export default useMinimiumWithdrawal