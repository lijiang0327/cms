import axios from 'axios';

import {getItem} from './localStorage';
import {useGlobalStore} from '@/stores/global';

const BaseUrl = '/';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? BaseUrl
});

instance.interceptors.request.use((config) => {
    const jwt = getItem('jwt');

    config.headers.Authorization = jwt ? `Bearer ${jwt}` : undefined;

    return config;
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const store = useGlobalStore();
        store.errorMessage = error.message;
        store.errorMessageVisible = true;
        console.log(error);
    }
)

export default instance;
