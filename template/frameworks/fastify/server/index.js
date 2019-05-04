require('mithril/test-utils/browserMock')(global)

import Mitts from 'mitts'
import { express as MittsExpress } from 'mitts/loader'
import Fastify from 'fastify'

import client from '../src/index'

const fastify = Fastify({
  logger: true,
})

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

  fastify.use(mitts.middleware())

  await Mitts.preloadAll()

  fastify.listen(port, host, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

start()
