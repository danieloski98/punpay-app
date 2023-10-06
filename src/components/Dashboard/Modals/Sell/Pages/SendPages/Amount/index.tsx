import { View, TextInput, Alert, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Style } from './style'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../../../../../style/theme'
import { Feather, Ionicons } from '@expo/vector-icons'
import { Text as CustomText, PrimaryButton, Box } from '../../../../../../General'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../../state/Store'
import useIcons, { Coin } from '../../../../../../../hooks/useIcons'
import { Action } from '../../../state'
import { BarCodeScanner } from 'expo-barcode-scanner';
import useMinimiumWithdrawal from '../../../../../../../hooks/useMinimiumWithdrawal'
import { CRYPTO_NETWORKS } from '../../../../../../../utils/networks'

interface IProps {
  change: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<Action>;
}

const HEIGHT = Dimensions.get('screen').height;

const SendAmountPage = ({ change, dispatch }: IProps) => {
  const theme = useTheme<Theme>()
  const coin = useSelector((state: RootState) => state.Coin);
  const [amount, setAmount] = React.useState('0');
  const [address, setAddress] = React.useState('');
  const { getShortName, getNetwork } = useIcons();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [showScanner, setShowScanner] = React.useState(false);
  const [network, setNetwork] = React.useState('');
  const [showNetworks, setShowNetworks] = React.useState(false);

  React.useEffect(() => {
     // setnetworrk
     if (coin) {
      setNetwork(networks()[0]);
    }
  }, [])

  // custom hooks
  const { getMinimiumAmount } = useMinimiumWithdrawal(coin as any);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handlePress = React.useCallback(() => {
    if (address === '') {
      Alert.alert('Warning', 'You must enter an address');
      return;
    }
    if (amount === '0' || amount === '') {
      Alert.alert('Warning', 'You must enter an amount greater than 0');
      return;
    }
    if (parseFloat(amount) < getMinimiumAmount()) {
      Alert.alert('Warning', `Minimium withdrawal amount for ${coin} is ${getMinimiumAmount()}`);
      return;
    }
    dispatch({ type: 'transaction_currency', payload: getShortName(coin as Coin) });
    dispatch({ type: 'transaction_amount', payload: parseFloat(amount) })
    dispatch({ type: 'wallet', payload: address });
    change(2);
  }, [address, amount]);

  const handleBarCodeScanned = ({ type, data }) => {
    setAddress(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setShowScanner(false);
  };

  const networks = React.useCallback((): string[] => {
    if (!coin) {
      return []
    } else {
      if (coin === 'Tether') {
        return CRYPTO_NETWORKS[coin];
      }
    return CRYPTO_NETWORKS[coin];
    }
    
  }, [coin])

  const handleNetworkChange = React.useCallback((network: string) => {
    dispatch({ type: 'network', payload: network });
    setNetwork(network);
    setShowNetworks(false);
  }, []);


  return (
    <View style={Style.parent}>
      {
        !showScanner && (
          <>
            <CustomText variant="subheader">Send {coin}</CustomText>
            <CustomText variant="bodylight">Transfer coins to another wallet</CustomText>

            <View style={{ marginTop: 20 }}>
              <CustomText variant="subheader" style={{ fontSize: 15 }}>Enter Amount</CustomText>
              <View style={{ ...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
                <TextInput defaultValue='0.00' value={amount} keyboardType='number-pad' onChangeText={(e) => setAmount(e)} style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
                <CustomText variant="subheader" style={{ fontSize: 16 }}>{getShortName(coin as any)}</CustomText>
              </View>
              <CustomText variant="bodylight" style={{ fontSize: 15 }}>Minimium withrawal amount - {getMinimiumAmount()} {coin}</CustomText>
            </View>

            <View style={{ marginTop: 20, zIndex: 10 }}>
              <CustomText variant="subheader" style={{ fontSize: 15 }}>Recipient Address</CustomText>
              <View style={{ ...Style.input, backgroundColor: theme.textInput.backgroundColor, height: theme.textInput.height, marginTop: 10 }}>
                <TextInput defaultValue='' value={address} onChangeText={(e) => setAddress(e)} style={{ flex: 1, fontSize: 16, color: theme.colors.text }} />
                <Ionicons name="scan-outline" size={25} color={theme.colors.text} onPress={() => setShowScanner(true)} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, position: 'relative', }}>
                <CustomText variant="body" style={{ fontSize: 15 }}>NETWORK - </CustomText>
                <View style={{ flexDirection: 'row' }}>
                  <CustomText variant="subheader" onPress={() => setShowNetworks(prev => !prev)} style={{ fontSize: 14, marginTop: 3 }}>{network.toUpperCase()}</CustomText>
                  { networks().length > 1 && (
                    <Feather name={showNetworks ? 'chevron-up':'chevron-down'} size={25} color={theme.colors.text} style={{ marginTop: 5 }} onPress={() => setShowNetworks(prev => !prev)} />
                  )}
                </View>
                { networks().length > 1 && showNetworks && (
                  <View style={{ width: 130, minHeight: 80,  backgroundColor: theme.colors.modalBg, borderRadius: 10, position: 'absolute', bottom: -72, left: 130, zIndex: 10, elevation: 4 }}>
                    { networks().map((network, index) => (
                      <Box key={index.toString()} flex={1} height={40} justifyContent={'center'} borderBottomWidth={ index === networks().length - 1 ? 0:1} paddingHorizontal='s' style={{ borderBottomColor: theme.textInput.backgroundColor }}>
                        <CustomText variant='subheader' fontSize={16} key={network} onPress={() => handleNetworkChange(network)}>{network.toUpperCase()}</CustomText>
                      </Box>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View style={Style.upgradeContainer}>
              <CustomText variant="bodylight">Please insure the address is correct and is on the <CustomText variant='body'>{network.toUpperCase() || ''}</CustomText> Netwrok, to avoid losing your funds.</CustomText>
            </View>

            <View style={{ marginTop: 40 }}>
              <PrimaryButton text='Continue' action={handlePress} />
            </View>
          </>
        )
      }

      {
        showScanner && (
          <View style={{ flex: 1, height: HEIGHT / 100 * 40 }}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ flex: 1 }}
            />
          </View>
        )
      }

    </View>
  )
}

export default SendAmountPage