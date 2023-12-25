import storage from './localStorage';

const isLogin = async () => {
    const jwt = storage.getItem('jwt');

    return !!jwt;
}

export default isLogin;
