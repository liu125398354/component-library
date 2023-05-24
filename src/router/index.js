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
        component: () => import('@/views/Home'),
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
        path: '/tab/verify',
        component: EmptyLayout,
        redirect: 'noRedirect',
        meta: {
          title: '验证码'
        },
        children: [
          {
            path: 'Alphanumeric',
            component: () => import('@/views/tab/NumLetterVerify'),
            meta: { title: '前端验证' }
          },
          {
            path: 'captcha',
            component: () => import('@/views/tab/captcha'),
            meta: { title: '后端验证' }
          },
          {
            path: 'graphical',
            component: () => import('@/views/tab/GraphicalVerify'),
            meta: { title: '图形验证码' }
          }
        ]
      },
      {
        path: '/tab/player',
        component: EmptyLayout,
        redirect: 'noRedirect',
        meta: {
          title: '播放器'
        },
        children: [
          {
            path: 'livePlayer',
            component: () => import('@/views/tab/LivePlayer'),
            meta: { title: '直播/点播' }
          },
          {
            path: 'dPlayer',
            component: () => import('@/views/tab/dPlayer'),
            meta: { title: 'DPlayer' }
          }
        ]
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
            path: 'previewVideo',
            component: () => import('@/views/tab/PreviewVideo'),
            meta: { title: '预览视频' }
          },
          {
            path: 'previewAudio',
            component: () => import('@/views/tab/PreviewAudio'),
            meta: { title: '预览音频' }
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
      },
      {
        path: 'cal',
        component: () => import('@/views/tab/CalculateDay'),
        meta: {
          title: '计算天数'
        }
      }
    ]
  },
  {
    path: '/api',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: 'Browser API' },
    children: [
      {
        path: 'ac',
        component: () => import('@/views/tab/AdobeCaptivate'),
        meta: { title: '屏幕录制' }
      },
      {
        path: 'cr',
        component: () => import('@/views/tab/CameraRecording'),
        meta: { title: '摄像头录制' }
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
        component: () => import('@/views/SequenceDiagram'),
        meta: {
          title: '时序图',
          affix: true
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'maxFile',
    children: [
      {
        path: 'maxFile',
        component: () => import('@/views/MaxFileUpload'),
        meta: {
          title: '大文件上传',
          affix: true
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'multiFile',
    children: [
      {
        path: 'multiFile',
        component: () => import('@/views/MultiFileUpload'),
        meta: {
          title: '多文件上传',
          affix: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
