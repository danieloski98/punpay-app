import { View, Text, Image } from 'react-native'
import React, { useCallback } from 'react'

const COINS = ['Bitcoin', 'Ethereum', 'Tether', 'BUSD', 'XRP', 'DOGE', 'BNB', 'LTC', 'DOT'];

type coinType = 'btc' | 'eth' | 'usdt' | 'busd' | 'xrp' | 'doge' | 'bnb' | 'ltc' | 'dot';

type Coin = 'Bitcoin' | 'Ethereum' | 'Tether' | 'BUSD' | 'XRP' | 'DOGE' | 'BNB' | 'Pokadot' | 'Litecoin'

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
            case 'Pokadot': {
              return <Image source={require('../res/dot.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
            }
            case 'Litecoin': {
              return <Image source={require('../res/ltc.png')} style={{ width: size ? size: '100%', height: size ? size: '100%' }} resizeMode='cover' />
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
          return 'DOGE'
        }
        case 'xrp': {
          return 'XRP'
        }
        case 'dot': {
          return 'Pokadot'
        }
        case 'ltc': {
          return 'Litecoin'
        }
      }
    }, [])

    const getShortName = useCallback((coin: Coin) => {
      switch(coin) {
        case 'Bitcoin': {
          return 'btc'
        }
        case 'Ethereum': {
          return 'eth'
        }
        case 'Tether': {
          return 'usdt'
        }
        case 'XRP': {
          return 'xrp'
        }
        case 'DOGE': {
          return 'doge'
        }
        case 'BUSD': {
          return 'busd'
        }
        case 'BNB': {
          return 'bnb'
        }
      }
    }, [])

    const getNetwork = useCallback((name: Coin) => {
      console.log(`the network is for the coin ${name}`)
      switch(name) {
        case 'Bitcoin': {
          return 'BTC'
        }
        case 'Ethereum': {
          return 'ERC20'
        }
        case 'Tether': {
          return 'BEP20'
        }
        case 'BNB': {
          return 'BEP20'
        }
        case 'BUSD': {
          return 'BEP20'
        }
        case 'DOGE': {
          return 'Doge'
        }
        case 'XRP': {
          return 'XRP'
        }
        case 'Pokadot': {
          return 'BEP20'
        }
        case 'Litecoin': {
          return 'BEP20'
        }
      }
    }, [])
  return {
    getIcon,
    COINS,
    getShortName,
    getName,
    getNetwork
  }
}

export default useIcons