import { View, Text, Platform, Pressable } from 'react-native'
import React from 'react'
import { Style } from './style'
import Box from '../../generalComponents/Box'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { DrawerNavigationProp,  } from '@react-navigation/drawer'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import CustomText from '../../generalComponents/Text'

// svgs
import User from '../../../res/svgs/assets/user.svg'
import Noti from '../../../res/svgs/assets/Notification.svg'
import Upload from '../../../res/svgs/assets/Upload.svg'
import Message from '../../../res/svgs/assets/message.svg'
import Logout from '../../../res/svgs/assets/logout.svg'

interface IProps {
    navigation: DrawerNavigationHelpers
}

export default function SideBar({ navigation }: IProps) {
    const theme = useTheme<Theme>()
    
    const nav = (route: string) => {
        navigation.navigate(route)
    }

  return (
    <Box backgroundColor="mainBackground" flex={1}>
        <View style={Style.closeCon}>
            <Feather name="x" size={25} color={theme.colors.text} onPress={() => navigation.closeDrawer()} />
        </View>

        <View style={Style.imageCon}>
            <View style={{...Style.imgC, backgroundColor: theme.colors.primaryColor }}>
                <User width={60} height={60} />
            </View>
            <CustomText variant="body" marginTop="s">Daniel Emmanuel</CustomText>
            <CustomText variant="bodylight" style={{ color: 'red' }}>Account is not verified.  Verify Now</CustomText>
            
        </View>

        <View style={Style.itemC}>
            <View style={{...Style.iteminnerc, borderColor: theme.textInput.backgroundColor}}>

                <Pressable onPress={() => nav('settings')} style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
                    <View style={{...Style.iconHolder,  backgroundColor: '#FFC37D' }}>
                        <User width={20} height={20} />
                    </View>
                    <CustomText variant="body" style={{ marginLeft: 20 }}>Manage Account</CustomText>
                </Pressable>

                <Pressable onPress={() => nav('history')} style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
                    <View style={{...Style.iconHolder,  backgroundColor: '#31CBD1' }}>
                        <Noti width={20} height={20} />
                    </View>
                    <CustomText variant="body" style={{ marginLeft: 20 }}>Transaction History</CustomText>
                </Pressable>

                <Pressable style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
                    <View style={{...Style.iconHolder,  backgroundColor: '#61E0A1' }}>
                        <Upload width={20} height={20} />
                    </View>
                    <CustomText variant="body" style={{ marginLeft: 20 }}>Share App</CustomText>
                </Pressable>

                <Pressable style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
                    <View style={{...Style.iconHolder,  backgroundColor: '#74BBFF' }}>
                        <Message width={20} height={20} />
                    </View>
                    <CustomText variant="body" style={{ marginLeft: 20 }}>Contact Support</CustomText>
                </Pressable>

                <Pressable style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
                    <View style={{...Style.iconHolder,  backgroundColor: '#FF6675' }}>
                        <Logout width={20} height={20} />
                    </View>
                    <CustomText variant="body" style={{ marginLeft: 20 }}>Log Out</CustomText>
                </Pressable>
                

            </View>
        </View>
    </Box>
  )
}