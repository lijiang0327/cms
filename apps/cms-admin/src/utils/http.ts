import axios from 'axios';

import {getItem} from './localStorage';

const BaseUrl = '/';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? BaseUrl
});

instance.interceptors.request.use((config) => {
    const jwt = getItem('jwt');

    config.headers.Authorization = jwt ? `Bearer ${jwt}` : undefined;

    return config;
})

export default instance;
