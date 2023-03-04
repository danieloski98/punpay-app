import axios, { AxiosError } from 'axios';
import {STAT_URL} from './url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STAT = axios.create({
    baseURL: `${STAT_URL}`,
});

STAT.interceptors.request.use(async(config) => {
    const token = await AsyncStorage.getItem('token')
    config.headers!['content-type'] = 'application/json';
    if (token === null) {
        return config;
    }
    config.headers!['authorization'] = `Bearer ${token}`;
    return config;
},  error => {
    return Promise.reject(error)
}); 

STAT.interceptors.response.use((data) => {
    return data;
}, (error: AxiosError<any, any>) => {
    if (error.response?.data.message instanceof Array) {
        const msg = error.response?.data.message as Array<any>;        
        return Promise.reject(msg);
    } else {
        if (error.response?.data.message === undefined || error.response?.data === undefined) {
            return Promise.reject('An error occured');
        }
        return Promise.reject(error.response?.data.message);
    }
});

export default STAT;
