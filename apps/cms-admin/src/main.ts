import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.min.css';

import './assets/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
