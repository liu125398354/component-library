import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'

Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/SequenceDiagram'),
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  },
  {
    path: '/vab',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '我的组件' },
    children: [
      {
        path: 'permissions',
        component: () => import('@/views/tab/SequenceDiagram'),
        meta: {
          title: '时序图'
        }
      },
      {
        path: '/vab/icon',
        component: EmptyLayout,
        redirect: 'noRedirect',
        meta: {
          title: '搜索'
        },
        children: [
          {
            path: 'awesomeIcon',
            component: () => import('@/views/tab/cBtnSearch'),
            meta: { title: '按钮输入框同一列' }
          },
          {
            path: 'remixIcon',
            component: () => import('@/views/tab/sBtnSearch'),
            meta: { title: '按钮输入框不同列' }
          }
        ]
      }
      // {
      //   path: '预览',
      //   component: () => import('@/views/tab/ee'),
      //   meta: { title: '验证码' }
      // }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
