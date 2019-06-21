import { createStore } from '@/store/store'

import counter from '@/store/modules/counter'
import page from '@/store/modules/page'

const storeInstance = (initialState = {}) => createStore([page(initialState.page), counter(initialState.counter)])

export const store = storeInstance({})

export default () => store
