<template>
    <div class="header">
        <h1>CMS-ADMIN</h1>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-avatar class="avatar" color="info" v-bind="props">
                    <span>{{state.user?.username?.slice(0, 2) ?? ''}}</span>
                </v-avatar>
            </template>

            <v-list>
                <v-list-item
                    @click="onLogoutClickHandler"
                    :link="true"
                    title="退出登录"
                ></v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router';

    import {useUserStore} from '@/stores/user';

    const router = useRouter();
    const state = useUserStore();

    const onLogoutClickHandler = () => {

        router.push('/login');
        state.clearUserStatus();
    }

</script>
<style scoped lang="scss">
.header {
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

.avatar {
    cursor: pointer;
}
</style>