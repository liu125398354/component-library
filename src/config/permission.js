/**
 * Created by liunannan on 2020/9/22.
 */

import router from '@/router'
import store from '@/store'

let isAddRouter = false
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next({ path: '/homepage' })
  } else {
    if (!isAddRouter) {
      let accessRoutes = []
      accessRoutes = await store.dispatch('routes/setAllRoutes')
      for (let i = 0; i < accessRoutes.length; i += 1) {
        const element = accessRoutes[i]
        router.addRoute(element)
      }
      isAddRouter = true
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
