import http from '@/utils/http';

const login = async (identifier: string, password: string) => {
    const result = await http.post('/api/auth/local', {identifier, password});

    return result.data;
}

export default login;
