<template>
    <LayoutComponent>
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

<script setup lang="ts">
    import LayoutComponent from '@/components/layout/LayoutComponent.vue';
    import SideBarComponent from '@/components/sideBar/sideBarComponent.vue';
    import HeaderComponent from '@/components/header/headerComponent.vue';
</script>