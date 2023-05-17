import React from 'react';
import { Box as View, Text, PrimaryButton } from '../../../components/General'
import { Image, Alert } from 'react-native'
import * as Updates from 'expo-updates';
import { set } from 'react-native-reanimated';


function AboutApp() {
    const [loading, setLoading] = React.useState(false);

    const checkForUpdates = React.useCallback(async() => {
        try {
            setLoading(true)
            const update = await Updates.checkForUpdateAsync();
      
            if (update.isAvailable) {
                Alert.alert('Update Availabe', 'Seems like you have an update. Would you like to update now?', [
                    {text: 'No', onPress: () => {}, },
                    {text: 'Yes', onPress: async() => {
                        await Updates.fetchUpdateAsync();
                        await Updates.reloadAsync();
                    }, }
                ]);
                setLoading(false)
            
            } else {
                setLoading(false)
                Alert.alert('No Updates', 'Seems like you have the latest version of the app. No need to update.');
            
            }
          } catch (error) {
            setLoading(false)
            // You can also add an alert() to see the error message in case of an error when fetching updates.
            Alert.alert(`Error fetching latest Expo update:`, `${error}`, [
                {text: 'No', onPress: () => {}, },
                {text: 'Yes', onPress: async() => {
                    // await Updates.fetchUpdateAsync();
                    // await Updates.reloadAsync();
                }, }
            ]);
          }
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }} backgroundColor='mainBackground'>
            <Image source={require('../../../../assets/logo2.png')} resizeMode='contain' style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'white'  }} />
             <Text variant='subheader' marginTop='m'>About App</Text>
             <Text variant='body' textAlign='center' marginTop='l'>Buy, Sell and Swap crypto currencies at ease instantly</Text>
             <View height={30} />
             <PrimaryButton action={checkForUpdates} text='Check for updates' isLoading={loading}  />
        </View>
    )
}

export default AboutApp