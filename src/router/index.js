import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Search',
    component: () => import('@/views/tab/v-search'),
    hidden: true
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
