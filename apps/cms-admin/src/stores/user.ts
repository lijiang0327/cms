
import {defineStore} from 'pinia';
import {ref} from 'vue';

import {getItem, removeItem, setItem} from '@/utils/localStorage';

export const useUserStore = defineStore('user', () => {
  const jwt = ref(getItem('jwt'));
  const user = ref(getItem('user'));
  const loggedIn = ref(!!jwt.value);

  const clearUserStatus = () => {
    jwt.value = '';
    user.value = {};
    loggedIn.value = false;
    removeItem('jwt');
    removeItem('user');
  }

  const setUserStatus = (jwtStr: string, userInfo: unknown) => {
    setItem('jwt', jwtStr);
    setItem('user', userInfo);
    jwt.value = jwtStr;
    user.value = userInfo;
    loggedIn.value = true;
  }

  return {
    jwt,
    user,
    loggedIn,
    clearUserStatus,
    setUserStatus,
  }
})
