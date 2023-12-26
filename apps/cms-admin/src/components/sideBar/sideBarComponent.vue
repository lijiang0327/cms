<template>
    <v-card
        width="260"
        height="100%"
    >
        <v-list class="list-container">
            <template v-for="menu in state.menus">
                <v-list-item 
                    :prepend-icon="menu.icon" 
                    :title="menu.title"
                    :link="true"
                    :to="menu.path"
                    v-if="!menu.children"
                    :key="menu.id"
                ></v-list-item>
                <v-list-group
                    v-if="menu.children"
                    :key="menu.id"
                >
                    <template v-slot:activator="{props}">
                        <v-list-item
                            v-bind="props"
                            :prepend-icon="menu.icon"
                            :title="menu.title"
                            :link="true"
                            :to="menu.path"
                        ></v-list-item>
                    </template>
                    <v-list-item 
                        v-for="child in menu.children"
                        :prepend-icon="child.icon"
                        :title="child.title"
                        :key="child.id"
                        :link="true"
                        :to="child.path"
                    ></v-list-item>
                </v-list-group>
            </template>
        </v-list>
    </v-card>
</template>
<script setup lang="ts">
    import {reactive} from 'vue';
    import {v4 as uuidv4} from 'uuid';

    const state = reactive({
        menus: [
            {
                id: uuidv4(),
                title: '首页',
                icon: 'mdi-home',
                path: '/'
            },
            {
                id: uuidv4(),
                title: '产品管理',
                icon: 'mdi-cog-box',
                children: [
                    {
                        id: uuidv4(),
                        title: '品牌管理',
                        icon: 'mdi-google-ads',
                        path: '/brand'
                    },
                    {
                        id: uuidv4(),
                        title: '类型管理',
                        icon: 'mdi-ev-plug-type1',
                        path: '/type'
                    },
                    {
                        id: uuidv4(),
                        title: '商品管理',
                        icon: 'mdi-ev-plug-type1',
                        path: '/product'
                    },
                ]
            },
            {
                id: uuidv4(),
                title: '关于',
                icon: 'mdi-information-outline',
                path: 'about',
            }
        ]
    })

</script>
<style scope lang="scss">
.list-container {
    height: 100%;
    padding: 0;
}
</style>