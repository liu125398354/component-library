/**
 * Created by liunannan on 2020/10/27.
 */

export function saveToLocal(id, key, value) {
  let store = window.localStorage.__store__
  if (!store) {
    store = {}
    store[id] = {}
  } else {
    store = JSON.parse(store)
    if (!store[id]) {
      store[id] = {}
    }
  }
  store[id][key] = value
  window.localStorage.__store__ = JSON.stringify(store)
}

export function loadFromLocal(id, key, def) {
  let store = window.localStorage.__store__
  if (!store) {
    return def
  }
  store = JSON.parse(store)[id]
  if (!store) {
    return def
  }
  let ret = store[key]
  return ret || def
}

export function removeLocal(id, key) {
  let store = window.localStorage.__store__
  store = JSON.parse(store)
  delete store[id]
  window.localStorage.__store__ = JSON.stringify(store)
}
