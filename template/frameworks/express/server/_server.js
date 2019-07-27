require("mithril/test-utils/browserMock")(global)

import Mitts from "mitts"
import { express as MittsExpress } from "mitts/loader"
import bodyParser from "body-parser"
import express from "express"
import morgan from "morgan"
import consola from 'consola';
import cookieParser from "cookie-parser"

import config from '../config/config';
import client from '../src/index<% if (typescript === "yes") { %>.ts<% } %>'

async function start() {
  const app = express()
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'localhost'

  const mitts = MittsExpress({
    html: config.paths.htmlEntry,
    manifest: config.paths.mittsManifest,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  })

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(express.static(config.output.path))
    .use(mitts.middleware())

  await Mitts.preloadAll()

  // Listen the server
  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
