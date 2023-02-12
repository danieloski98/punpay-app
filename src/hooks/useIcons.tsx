import { View, Text, Image } from 'react-native'
import React, { useCallback } from 'react'

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB'];

type coinType = 'btc' | 'eth' | 'usdt' | 'busd' | 'xrp' | 'doge' | 'bnb';

type Coin = 'Bitcoin' | 'Ethereum' | 'Tether' | 'BUSD' | 'XRP' | 'DOGE' | 'BNB'

const useIcons = () => {
    const getIcon = useCallback((icon: Coin | String, size?: number|string) => {
        switch(icon) {
            case 'Bitcoin': {
              return <Image source={require('../res/bitcoin.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'Ethereum': {
              return <Image source={require('../res/eth.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'Tether': {
              return <Image source={require('../res/usdt.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'XRP': {
              return <Image source={require('../res/xrp.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'DOGE': {
              return  <Image source={require('../res/dogecoin.png')} style={{ width: size ? size: '100%', height: size ? size: '100%'}} resizeMode='cover' />
            }
            case 'BUSD': {
              return <Image source={require('../res/busd.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'BNB': {
              return <Image source={require('../res/bnb.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
          }
    }, [])

    const getName = useCallback((name: coinType) => {
      switch(name) {
        case 'btc': {
          return 'Bitcoin'
        }
        case 'eth': {
          return 'Ethereum'
        }
        case 'usdt': {
          return 'Tether'
        }
        case 'bnb': {
          return 'BNB'
        }
        case 'busd': {
          return 'BUSD'
        }
        case 'doge': {
          return 'Doge'
        }
        case 'xrp': {
          return 'Ripple'
        }
      }
    }, [])

    const getShortName = useCallback((coin: Coin) => {
      switch(coin) {
        case 'Bitcoin': {
          return 'BTC'
        }
        case 'Ethereum': {
          return 'ETH'
        }
        case 'Tether': {
          return 'USDT'
        }
        case 'XRP': {
          return 'XRP'
        }
        case 'DOGE': {
          return 'DOGE'
        }
        case 'BUSD': {
          return 'BUSD'
        }
        case 'BNB': {
          return 'BNB'
        }
      }
    }, [])
  return {
    getIcon,
    COINS,
    getShortName,
    getName
  }
}

export default useIcons