require('mithril/test-utils/browserMock')(global)

import Mitts from 'mitts'
import { express as MittsExpress } from 'mitts/loader'
import path from 'path'
import consola from 'consola'
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import configuration from '@feathersjs/configuration'

import client from '../src/index'

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config/')

async function start() {
  const app = express(feathers())

  const buildDir = path.resolve(__dirname, '../build')

  const mitts = MittsExpress({
    html: `${buildDir}/app.html`,
    manifest: `${buildDir}/mitts.json`,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  })

  app
    .configure(configuration())
    .use(express.static(buildDir))
    .use(mitts.middleware())

  const host = app.get('host')
  const port = app.get('port')

  await Mitts.preloadAll()

  app.listen(port, host)

  consola.ready({
    message: `Feathers application started on ${host}:${port}`,
    badge: true,
  })
}

start()
