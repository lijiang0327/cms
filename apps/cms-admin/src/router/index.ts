import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue';
import BrandManageView from '../views/BrandManageView.vue';
import TypeManageView from '../views/TypeManageView.vue';
import ProductManageView from '../views/ProductManageView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      strict: true,
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      strict: true,
      component: HomeView,
      children: [
        {
          path: '',
          name: 'dashboard1',
          strict: true,
          redirect: '/home/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
        {
          path: 'brand',
          name: 'brand',
          component: BrandManageView,
        },
        {
          path: 'type',
          name: 'type',
          component: TypeManageView,
        },
        {
          path: 'product',
          name: 'product',
          component: ProductManageView,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      strict: true,
      component: LoginView,
    }
  ]
})

export default router
