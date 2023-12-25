import http from '@/utils/http';

const isValidJWT = async (jwt: string) => {
    const result = await http.post('/', {jwt});

    return result.data;
}