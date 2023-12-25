<script setup lang="ts">
  import {onBeforeMount} from 'vue';
  import {useRouter} from 'vue-router';

  import LayoutComponent from '@/components/layout/LayoutComponent.vue';
  import SideBarComponent from '@/components/sideBar/sideBarComponent.vue';
  import HeaderComponent from '@/components/header/headerComponent.vue';
  import isLogin from '@/utils/isLogin';
  import {useUserStore} from '@/stores/user';

  const state = useUserStore();

  const router = useRouter();

  onBeforeMount(async () => {
    const loggedIn = await isLogin();

    state.loggedIn = loggedIn;
    router.beforeEach((to, _, next) => {
      if (!loggedIn && to.name !== 'login') {
        next('/login')
      } else {
        next()
      }
    })
  });
</script>

<template>
  <RouterView v-if="!state.loggedIn" />
  <LayoutComponent v-else>
    <template #header>
      <HeaderComponent />
    </template>
    <template #sideBar>
      <SideBarComponent />
    </template>

    <div>
      <RouterView />
    </div>
  </LayoutComponent>
</template>

<style scoped>

</style>
