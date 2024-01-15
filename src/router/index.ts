import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokedexScreen from '@/views/PokedexScreen.vue'

import SignUp from '@/views/SignUp.vue'
import LoginView from '@/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: PokedexScreen,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'sign up',
    component: SignUp,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
