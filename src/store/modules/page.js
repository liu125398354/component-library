/**
 * Created by liunannan on 2020/9/22.
 */

const state = {
  visitedRoutes: []
}
const getters = {
  visitedRoutes: (state) => state.visitedRoutes
}
const mutations = {
  addVisitedRoute(state, route) {
    if (state.visitedRoutes.some((item) => item.path === route.path)) return
    state.visitedRoutes.push(Object.assign({}, route))
  }
}
const actions = {
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  }
}
export default { state, getters, mutations, actions }
