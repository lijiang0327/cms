<script setup lang="ts">
  import {onBeforeMount, reactive} from 'vue';
  import {useRouter} from 'vue-router';

  import LayoutComponent from '@/components/layout/LayoutComponent.vue';
  import SideBarComponent from '@/components/sideBar/sideBarComponent.vue';
  import HeaderComponent from '@/components/header/headerComponent.vue';
  import isLogin from '@/utils/isLogin';

  const state = reactive({
    isLogin: false,
  });

  const router = useRouter();

  onBeforeMount(async () => {
    const logined = await isLogin();

    state.isLogin = logined;
    router.beforeEach((to, _, next) => {
      console.log(to.name);
      if (!logined && to.name !== 'login') {
        next('/login')
      } else {
        next()
      }
    })
  });
</script>

<template>
  <RouterView v-if="!state.isLogin" />
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
