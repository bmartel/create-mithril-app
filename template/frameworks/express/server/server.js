require("mithril/test-utils/browserMock")(global)

import Mitts from "mitts"
import { express as MittsExpress } from "mitts/loader"
import bodyParser from "body-parser"
import express from "express"
import morgan from "morgan"
import consola from 'consola';
import path from "path"
import cookieParser from "cookie-parser"

import client from "../src/index"

async function start() {
  const app = express()
  const port = process.env.PORT || 3000
  const host = process.env.HOST || 'localhost'
  const buildDir = path.resolve(__dirname, "../build")

  const mitts = MittsExpress({
    html: `${buildDir}/app.html`,
    manifest: `${buildDir}/mitts.json`,
    createSession(cookies) {},
    createStore: client.store,
    routes: client.routes,
  })

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(express.static(buildDir))
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
