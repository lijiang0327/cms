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
                    v-model="state.brandName"
                ></v-text-field>
            </div>
            <v-btn
                color="secondary"
                @click="onSearchHandler"
            >查询</v-btn>
            <v-btn
                color="primary"
                @click="state.dialogVisible=true"
            >添加</v-btn>
            
        </v-form>
    </v-card>

    <v-card 
        class="card"
    >
        <v-data-table
            :headers="state.headers"
            :items="state.items"
            :loading="state.loading"
            :items-per-page="state.pagination.pageSize"
        >
            <template v-slot:item.operate="{ item }">
                <div >
                    <v-btn 
                        @click="onDeleteClickHandler(item)"
                        icon="mdi-delete-outline"
                        variant="text"
                        color="warning"
                    ></v-btn>
                    <v-btn 
                        @click="onEditClickHandler(item)"
                        icon="mdi-square-edit-outline"
                        variant="text"
                        color="primary"
                    ></v-btn>
                </div>
            </template>
            <template v-slot:bottom>
                <div>
                    <v-pagination
                        v-model="state.pageIndex"
                        :length="state.pagination.pageCount"
                        :show-first-last-page="true"
                        :total-visible="5"
                        @update:model-value="onPageChangeHandler"
                    ></v-pagination>
                </div>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog
        v-model="state.deleteDialogVisible"
        width="400"
    > 
        <v-card>
            <v-card-title>提示</v-card-title>
            <v-card-text>
                确定要删除吗?
            </v-card-text>
            <v-card-actions class="dialog-footer">
                <v-btn @click="onDeleteDialogClose">取消</v-btn>
                <v-btn color="primary" @click="onDeleteDialogConfirm">确认</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="state.dialogVisible"
        persistent
        width="800px"
        :close-on-back="true"
    >
        <v-card>
            <v-card-title>
                <span>{{ dialogTitle }}</span>
            </v-card-title>
            <v-form
                ref="dialogFormRef"
            >
                <v-card-text>
                    <v-container class="dialog-form-field">
                        <span>品牌名称</span>
                        <v-text-field
                            placeholder="请输入品牌名称"
                            variant="outlined"
                            density="compact"
                            v-model="dialogFormState.brandName"
                            :rules="dialogFormState.brandNameRules"
                        ></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions class="dialog-footer">
                    <v-btn @click="closeDialog">取消</v-btn>
                    <v-btn color="primary" @click="onDialogConfirmHandler">确认</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
    import {reactive, onBeforeMount, ref, computed} from 'vue';

    import {getBrandList, addBrand, deleteBrand, updateBrand} from '@/api/brand';

    type Pagination = {
        page: number
        total: number
        pageSize: number
        pageCount: number
    }
    type Item = {
        id: number
        attributes: Record<string, unknown>
        operate: string
    }

    const state = reactive({
        headers: [
            {
                title: '序号',
                key: 'id'
            },
            {
                title: '品牌名称',
                key: 'attributes.name'
            },
            {
                title: '操作',
                sortable: false,
                key: 'operate'
            }
        ],
        loading: false,
        items: [] as Item[],
        brandName: '',
        pagination: {} as Pagination,
        pageIndex: 1,
        dialogVisible: false,
        deleteDialogVisible: false,
        currentSelectedItem: null as Item | null,
    });
    const dialogFormState = reactive({
        brandName: '',
        brandNameRules: [
            (v: string) => !!v || '请输入品牌名称',
        ]
    });

    const dialogFormRef = ref<HTMLFormElement | null>(null);
    const dialogTitle = computed(() => {
        return state.currentSelectedItem ? '修改品牌' : '添加品牌'
    })

    onBeforeMount(async () => {
        onSearchHandler();
    })

    const onSearchHandler = async () => {
        state.loading = true;
        const result = await getBrandList({
            brandName: state.brandName,
            page: state.pageIndex
        });
        state.loading = false;
        state.items = result.data;
        state.pagination = result.meta.pagination;
    }

    const onPageChangeHandler = async () => {
        onSearchHandler();
    }

    const closeDialog = async () => {
        state.dialogVisible = false;
        dialogFormState.brandName = '';
        state.currentSelectedItem = null;
    }

    const onDialogConfirmHandler = async () => {
        const {valid} = await dialogFormRef.value?.validate() || {};

        if (!valid) {
            return;
        }

        if (state.currentSelectedItem) {
            await updateBrand({name: dialogFormState.brandName, id: state.currentSelectedItem.id});
        } else {
            await addBrand({name: dialogFormState.brandName});
        }
        
        closeDialog();
        onSearchHandler();
    }

    const onDeleteDialogClose = async () => {
        state.deleteDialogVisible = false;
        state.currentSelectedItem = null
    }

    const onDeleteDialogConfirm = async () => {
        if (!state.currentSelectedItem) {
            return;
        }

        await deleteBrand(state.currentSelectedItem?.id);
        state.deleteDialogVisible = false;
        onSearchHandler();
    }

    const onDeleteClickHandler = async (item: Item) => {
        state.currentSelectedItem = item;
        state.deleteDialogVisible = true;
    }

    const onEditClickHandler = async (item: Item) => {
        state.currentSelectedItem = item;
        state.dialogVisible = true;
        dialogFormState.brandName = item.attributes.name as string;
    }

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

    .dialog-form-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .dialog-footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        padding-right: 16px;
    }

    
</style>
