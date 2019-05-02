require("mithril/test-utils/browserMock")(global);

import path from "path";
import consola from 'consola';
import Mitts from "mitts";
import { Loader } from "mitts/loader";
import Hapi from 'hapi'

import client from "../src/index";

const buildDir = path.resolve(__dirname, "../build");

const server = new Hapi.Server({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000
})

server
  .register({
    plugin: async function(server, options) {

      // TODO: make this work with hapi
      // app.use(mitts.middleware());

      // const mitts = MittsExpress({
      //   html: `${buildDir}/app.html`,
      //   manifest: `${buildDir}/mitts.json`,
      //   createSession(cookies) {},
      //   createStore: client.store,
      //   routes: client.routes,
      // });

      await Mitts.preloadAll()
    }
  })
  .then(() => server.start())
  .then(() =>
    consola.ready({
      message: `Server running at: ${server.info.uri}`,
      badge: true
    })
  )
  .catch(err => {
    consola.error(err)
    throw err
  })
