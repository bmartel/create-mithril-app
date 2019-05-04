require('mithril/test-utils/browserMock')(global)

import micro from 'micro'
import dispatch from 'micro-route/dispatch'
import consola from 'consola'
import Mitts from 'mitts'
import { express as MittsExpress } from 'mitts/loader'

import config from '../config/config'
import client from '../src/index'

async function start() {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'localhost'

  const mitts = MittsExpress({
    html: config.paths.htmlEntry,
    manifest: config.paths.mittsManifest,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  })

  const server = micro(async (req, res) => {
    await dispatch().dispatch('*', ['GET'], (req, res) => mitts.middleware()(req, res))(req, res)
  })

  await Mitts.preloadAll()

  server.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
