<script setup lang="ts">
  import {onBeforeMount} from 'vue';
  import {useRouter} from 'vue-router';

  import {useUserStore} from '@/stores/user';
  import {useGlobalStore} from '@/stores/global';

  const state = useUserStore();
  const globalStore = useGlobalStore();

  const router = useRouter();

  onBeforeMount(async () => {
    router.beforeEach((to, _, next) => {
      if (!state.loggedIn && to.name !== 'login') {
        next('/login')
      } else {
        next()
      }
    })
  });
</script>

<template>
  <RouterView />
  <v-snackbar
    color="warning"
    v-model="globalStore.errorMessageVisible"
    location="top"
  >
  {{ globalStore.errorMessage }}</v-snackbar>
</template>

<style scoped>

</style>
