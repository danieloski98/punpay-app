import { View, Text } from 'react-native'
import React from 'react'
import NetInfo from '@react-native-community/netinfo';
import { showMessage, hideMessage } from "react-native-flash-message";


const useNetwork = () => {
    const [isConnected, setIsConnected] = React.useState(false);

    // TODO ADD FUNCTION TO NAVIGATE NOT NO NETWORK PAGE
   
React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) {
            // showMessage({
            //     message: 'You are connected to the internet.',
            //     animated: true,
            //     backgroundColor: 'grey',
            //     floating: false,
            //     hideStatusBar: false,
            //     duration: 5000,
            //     autoHide: true,
            //     description: 'You are now connected to the internet internet.',
            //     statusBarHeight: 20,
            //     textStyle: {
            //         fontFamily: 'Jakarta-Sans',
            //         color: 'white'
            //     },
            //     style: {
            //         height: 100,
            //         justifyContent: 'center',
            //         paddingTop: 20,
            //         backgroundColor: 'lemon'
            //     }
            // });
            setIsConnected(state.isConnected);
        } else {
            showMessage({
                description: 'You have not active internet connection',
                message: 'You are not connected to the internet.',
                animated: true,
                floating: false,
                hideStatusBar: false,
                type: 'warning',
                statusBarHeight: 20,
                textStyle: {
                    fontFamily: 'Jakarta-Sans',
                    color: 'white'
                },
                style: {
                    height: 100,
                    justifyContent: 'center',
                    paddingTop: 20,
                }
            });
            setIsConnected(state.isConnected);
        }
      });
    return () => unsubscribe();
}, [])
      
  return {
    isConnected
  }
}

export default useNetwork