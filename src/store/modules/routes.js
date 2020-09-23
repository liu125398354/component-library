/**
 * Created by liunannan on 2020/9/22.
 */

import { constRoutes } from '@/router'

const state = { routes: [] }
const getters = {
  routes: (state) => state.routes
}
const mutations = {
  setAllRoutes(state, routes) {
    state.routes = routes
  }
}
const actions = {
  async setAllRoutes({ commit }) {
    commit('setAllRoutes', constRoutes)
    return constRoutes
  }
}
export default { state, getters, mutations, actions }
