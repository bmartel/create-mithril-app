require('mithril/test-utils/browserMock')(global)

import path from 'path'
import consola from 'consola'
import Mitts from 'mitts'
import Loader from 'mitts/loader'
import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'

import client from '../src/index'

const buildDir = path.resolve(__dirname, '../build')

const server = new Hapi.Server({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
  routes: {
    files: {
      relativeTo: buildDir,
    },
  },
})

const mitts = new Loader(
  (request, h) => ({
    request: request.raw.req,
    response: request.raw.res,
    next: h.continue,
  }),
  {
    html: `${buildDir}/index.html`,
    manifest: `${buildDir}/mitts.json`,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  }
)

async function start() {
  try {
    await server.register(Inert)

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
        },
      },
    })

    server.ext('onPostHandler', mitts.middleware())

    await Mitts.preloadAll()

    await server.start()

    consola.ready({
      message: `Server running at: ${server.info.uri}`,
      badge: true,
    })
  } catch (err) {
    consola.error(err)
    throw err
  }
}

start()
