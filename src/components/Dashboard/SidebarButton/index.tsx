import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Text as CustomText } from '../../General';
import { Style } from './style';
import { useNavigation } from '@react-navigation/native';

export interface ISidebarButton {
    icon: JSX.Element;
    text: string;
    location: 'settings' | 'history' | any;
    action?: () => void;
    backgroundColor: string;
}

const SidebarButton = ({ location, text, icon, action, backgroundColor }: ISidebarButton) => {
    const navigation = useNavigation<any>();
    const nav = (route: string) => {
        navigation.navigate(route)
    }
  return (
    <Pressable onPress={() => action ? action() : nav(location)} style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginBottom: 10 }}>
    <View style={{ ...Style.iconHolder,  backgroundColor }}>
       {icon}
    </View>
    <CustomText variant="body" style={{ marginLeft: 20 }}>{text}</CustomText>
</Pressable>
  )
}

export default SidebarButton