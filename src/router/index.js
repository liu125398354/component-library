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
        component: () => import('@/views/tab/Home'),
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '我的组件' },
    children: [
      {
        path: 'sd',
        component: () => import('@/views/tab/FileUpload'),
        meta: {
          title: '文件上传进度'
        }
      },
      {
        path: '/tab/preview',
        component: EmptyLayout,
        redirect: 'noRedirect',
        meta: {
          title: '预览'
        },
        children: [
          {
            path: 'previewPoster',
            component: () => import('@/views/tab/PreviewSingleImg'),
            meta: { title: '预览单张图片' }
          },
          {
            path: 'previewImage',
            component: () => import('@/views/tab/PreviewMultipleImg'),
            meta: { title: '预览多张图片' }
          },
          {
            path: 'previewView',
            component: () => import('@/views/tab/PreviewVideo'),
            meta: { title: '预览视频' }
          }
        ]
      },
      {
        path: '/tab/search',
        component: EmptyLayout,
        redirect: 'noRedirect',
        meta: {
          title: '搜索'
        },
        children: [
          {
            path: 'same',
            component: () => import('@/views/tab/cBtnSearch'),
            meta: { title: '按钮输入框同一列' }
          },
          {
            path: 'diff',
            component: () => import('@/views/tab/sBtnSearch'),
            meta: { title: '按钮输入框不同列' }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'sd',
    children: [
      {
        path: 'sd',
        component: () => import('@/views/tab/SequenceDiagram'),
        meta: {
          title: '时序图',
          affix: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
