require("mithril/test-utils/browserMock")(global)

import Koa from 'koa'
import consola from 'consola'
import Mitts from "mitts"
import { express as MittsExpress } from "mitts/loader"
import path from "path"

import client from "../src/index"

const app = new Koa()

async function start() {

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

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx
    mitts.middleware()(ctx.req, ctx.res)
  })

  await Mitts.preloadAll()

  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
