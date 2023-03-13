import axios, { AxiosError } from 'axios';
import Url from './url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Axios = axios.create({
    baseURL: `${Url}`,
});

Axios.interceptors.request.use(async(config) => {
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

Axios.interceptors.response.use((data) => {
    return data;
}, async(error: AxiosError<any, any>) => {
    if (error.response?.data.message instanceof Array) {
        const msg = error.response?.data.message as Array<any>;        
        return Promise.reject(JSON.stringify(error.response?.data.message));
    } else {
        if (error.response.status === 401 || error.response.status === 403) {
            await AsyncStorage.setItem('token', '');
        }
        if (error.response?.data.message === undefined || error.response?.data === undefined) {
            return Promise.reject('An error occured');
        }
        return Promise.reject(error.response?.data.message);
    }
});

export default Axios;
