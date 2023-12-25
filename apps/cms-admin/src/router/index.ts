import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue';
import BrandManageView from '../views/BrandManageView.vue';
import TypeManageView from '../views/TypeManageView.vue';
import ProductManageView from '../views/ProductManageView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/brand',
      name: 'brand',
      component: BrandManageView,
    },
    {
      path: '/type',
      name: 'type',
      component: TypeManageView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductManageView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ]
})

export default router
