/* eslint-disable */
import m from 'mithril'
import storeon from 'storeon'

export let store = null

export const createStore = modules => {
  if (process.env.NODE_ENV !== 'production') {
    modules.unshift(require('storeon/devtools'))
  }
  store = storeon(modules)
  return store
}

/**
 * Connect container component to redux store
 *
 * @param store
 */
export const connect = (...keys) => component => ({
  oninit() {
    this.observe = keys
    this.storeChanged = this.storeChanged.bind(this)
    this.unbind = store.on('@changed', this.storeChanged)
  },

  storeChanged(_, changed) {
    if (this.observe.some(key => key in changed)) {
      setTimeout(m.redraw)
    }
  },

  onremove() {
    if (typeof this.unbind === 'function') {
      this.unbind()
      this.unbind = null
    }
  },

  store() {
    const state = store.get()
    const data = { $dispatch: store.dispatch }
    this.observe.forEach(key => {
      data[key] = state[key]
    })
    return data
  },

  view(vnode) {
    return m(component, { ...this.store(), ...vnode.attrs }, vnode.children)
  },
})
