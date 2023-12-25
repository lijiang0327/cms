<template>
    <v-card class="card">
        <v-form class="top-form">
            <div class="form-field">
                <span>品牌名称:</span>
                <v-text-field 
                    placeholder="请输入要查询的品牌名称"
                    :clearable="true"
                    class="text-field"
                    variant="outlined"
                    density="compact"
                    hide-details="auto"
                ></v-text-field>
            </div>
            <v-btn
                variant="elevated"
                color="primary"
            >查询</v-btn>
        </v-form>
    </v-card>

    <v-card 
        class="card"
    >
        <v-data-table
            :headers="state.headers"
            :items="state.items"
        >
            <template v-slot:item.operate="{ item }">
                <div >
                    <v-btn @click="console.log(item.id)">删除</v-btn>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts" setup>
    import {reactive, onBeforeMount} from 'vue';

    import {getBrandList} from '@/api/brand';

    const state = reactive({
        headers: [
            {
                title: '序号',
                sortable: false,
                key: 'id'
            },
            {
                title: '品牌名称',
                key: 'attributes.name'
            },
            {
                title: '操作',
                key: 'operate'
            }
        ],
        items: []
    })

    onBeforeMount(async () => {
        const result = await getBrandList();

        state.items = result.data ;
    })
</script>

<style scoped lang="scss">
    .card {
        margin: 8px;
        padding: 16px;
    }

    .card:nth-child(2) {
        margin-top: 16px;
    }

    .top-form {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
    }

    .form-field {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
    }

    .text-field {
        width: 300px;
    }
</style>
