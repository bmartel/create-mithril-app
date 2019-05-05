import 'core-js/stable'
import 'regenerator-runtime/runtime'
import m from 'mithril'
import hydrate from 'mitts/hydrate'
import routes from '@/routes'
import store from '@/store'

import '@/index.scss'

export default hydrate(m, routes, store)
