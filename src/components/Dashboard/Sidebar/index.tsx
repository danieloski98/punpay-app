import { View, Image } from 'react-native'
import React from 'react'
import { Style } from './style'
import {Box, Text as CustomText } from '../../General'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '../../../style/theme'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

// svgs
import User from '../../../res/svg-output/assets/User'
import Noti from '../../../res/svg-output/assets/Notification'
import Upload from '../../../res/svg-output/assets/Upload'
import Message from '../../../res/svg-output/assets/Message'
import Logout from '../../../res/svg-output/assets/Logout'
import SidebarButton, { ISidebarButton } from '../SidebarButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/Store'
import useLogout from '../../../hooks/useLogout'

export const MenuItems: ISidebarButton[] = [
    {
        text: "Manage Account",
        location: 'settings',
        icon: <User width={25} height={25} />,
        backgroundColor: '#FFC37D'
    },
    // {
    //     text: "Transaction History",
    //     location: 'history',
    //     icon: <Noti width={25} height={25} />,
    //     backgroundColor: '#31CBD1'
    // },
    {
        text: "Share App",
        location: '',
        icon: <Upload width={25} height={25} />,
        backgroundColor: '#61E0A1'
    },
    {
        text: "Contact Support",
        location: 'history',
        icon: <Message width={25} height={25} />,
        backgroundColor: '#74BBFF'
    },
];


interface IProps {
    navigation: DrawerNavigationHelpers
}

export default function SideBar({ navigation }: IProps) {
    const theme = useTheme<Theme>()
    const user = useSelector((state: RootState) => state.User);
    console.log(user);
    const { logout } = useLogout()
    
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
                <Image source={{ uri: `https://api.dicebear.com/5.x/bottts/png?seed=${user.email}` }} style={{ width: '80%', height: '80%'}} />
            </View>
            <CustomText variant="body" marginTop="s">{user.firstName} {user.lastName}</CustomText>
            {!user.emailVerified && <CustomText variant="bodylight" style={{ color: 'red' }}>Account is not verified.  Verify Now</CustomText>}
        </View>

        <View style={Style.itemC}>
            <View style={{...Style.iteminnerc, borderColor: theme.textInput.backgroundColor}}>
                {MenuItems.map((item, index) => (
                    <SidebarButton {...item} key={index.toString()} />
                ))}
                 <SidebarButton text='Logout' location={'home'} icon={<Logout width={25} height={25} />} backgroundColor='#FF6675' action={logout} />
            </View>
        </View>
    </Box>
  )
}