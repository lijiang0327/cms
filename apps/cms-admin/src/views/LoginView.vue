<script setup lang="ts">
    import {reactive, ref} from 'vue';
    import {useRouter} from 'vue-router';

    import login from '@/api/login';
    import storage from '@/utils/localStorage';

    const state = reactive({
        email: '',
        emailRules: [
            (v: string) => !!v || 'Email is required',
        ],
        password: '',
        passwordRules: [
            (v: string) => !!v || 'Password is required',
            (v: string) => v?.length >= 6 || 'Password must more than 6 characters'
        ]
    })
    const formRef = ref<null | HTMLFormElement>(null);

    const router = useRouter();

    const onSubmitClickHandler = async () => {
        const {valid} = await formRef.value?.validate() ?? {};

        if (!valid) {
            return;
        }

        const result = await login(state.email, state.password);
        
        if (result) {
            if (result.jwt) {
                storage.setItem('jwt', result.jwt);
            }

            if (result.user) {
                storage.setItem('user', result.user);
            }

            location.href = '/';
        }
    }
</script>

<template>
    <div class="loginView">
        <div class="loginForm">
            <h3>登录</h3>
            <v-form ref="formRef">
                <v-text-field
                   label="邮箱"
                   type="text"
                   :rules="state.emailRules"
                   v-model="state.email"
                ></v-text-field>
                <v-text-field
                    label="密码"
                    type="password"
                    :rules="state.passwordRules"
                    v-model="state.password"
                ></v-text-field>

                <v-btn @click="onSubmitClickHandler" block>登录</v-btn>
            </v-form>
        </div>
    </div>
</template>

<style>
    .loginView {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .loginForm {
        width: 50vw;
        height: 50vh;
        padding: 40px 80px;

        h3 {
            margin-bottom: 32px;
        }
    }
</style>