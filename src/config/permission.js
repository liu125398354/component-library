/**
 * Created by liunannan on 2020/9/22.
 */

import router from '@/router'
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next({ path: '/homepage' })
  } else {
    let accessRoutes = []
    accessRoutes = await store.dispatch('routes/setAllRoutes')
    router.addRoutes(accessRoutes)
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
})
