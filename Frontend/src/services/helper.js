import axios from 'axios';
import { getToken } from '../Auth/Auth';

export const BASE_URL='http://localhost:9095';

export const myAxios = axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
});

privateAxios.interceptors.request.use((config)=>{
    const token=getToken()
    console.log("token:",token)
    if (token) {
        if (!config.headers) {
            config.headers = {}; // Initialize headers if it doesn't exist
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
},(error)=>Promise.reject(error))