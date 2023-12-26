
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const errorMessageVisible = ref(false);
  const errorMessage = ref('');

  return {
    errorMessage,
    errorMessageVisible
  }
})
