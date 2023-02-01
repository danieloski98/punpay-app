import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Dispatch } from '../state/Store';
import { DARKMODE } from '../enums/init.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogout = () => {
    const dispatch = useDispatch<Dispatch>()
    const logout = React.useCallback(async() => {
        await AsyncStorage.removeItem('user');
        dispatch.Bank.update({}, '');
        dispatch.User.update({}, '');
        dispatch.loggedIn.logout();
    }, []);
  return {
    logout,
  }
}

export default useLogout