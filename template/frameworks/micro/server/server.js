require('mithril/test-utils/browserMock')(global)

import micro from 'micro'
import dispatch from 'micro-route/dispatch'
import consola from 'consola'
import Mitts from 'mitts'
import { express as MittsExpress } from 'mitts/loader'
import path from 'path'

async function start() {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'localhost'
  const buildDir = path.resolve(__dirname, '../build')

  const mitts = MittsExpress({
    html: `${buildDir}/app.html`,
    manifest: `${buildDir}/mitts.json`,
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
