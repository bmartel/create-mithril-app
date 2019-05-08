# Create Mithril App

[![NPM version](https://img.shields.io/npm/v/create-mithriljs-app.svg?style=flat)](https://npmjs.com/package/create-mithriljs-app)
[![NPM downloads](https://img.shields.io/npm/dm/create-mithriljs-app.svg?style=flat)](https://npmjs.com/package/create-mithriljs-app)

> Create a [Mithril.js](https://github.com/MithrilJS/mithril.js) project in seconds

## Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since [npm](https://www.npmjs.com/get-npm) `5.2.0`)

```bash
npx create-mithriljs-app <my-project>
```

Or starting with npm v6.1 you can do:

```bash
npm init mithriljs-app <my-project>
```

Or with [yarn](https://yarnpkg.com/en/):

```bash
yarn create mithriljs-app <my-project>
```

## Features :tada:

1. Choose between integrated server-side frameworks:
    - None (Mithril default server)
    - [Express](https://github.com/expressjs/express)
    - [Koa](https://github.com/koajs/koa)
    - [Feathers](https://github.com/feathersjs/feathers)
    - [Hapi](https://github.com/hapijs/hapi) _(work in progress)_
    - [Micro](https://github.com/zeit/micro) _(work in progress)_
    - [Fastify](https://github.com/fastify/fastify) _(work in progress)_
2. Check the features needed for your project:
    - PWA
    - Linter / Formatter
    - [Prettier](https://prettier.io/)
    - [Typescript](https://github.com/Microsoft/TypeScript)
3. Choose your favorite UI framework:
    - None (feel free to add one later)
    - [Material](https://github.com/material-components/material-components-web)
    - [Tailwind](https://github.com/tailwindcss/tailwindcss)
    - [Tachyons](https://tachyons.io)
4. Choose your favorite test framework:
    - None
    - [Jest](https://github.com/facebook/jest)
    - [AVA](https://github.com/avajs/ava)
    - [Mocha](https://github.com/mochajs/mocha)
5. Choose a state management framework
    - None
    - [Mirtx](https://github.com/bmartel/mirtx) _(experimental)_
    - [Redux](https://github.com/reduxjs/redux)

## Optional

To install [mithril@latest](https://www.npmjs.com/package/mithril) instead of [mithril](https://www.npmjs.com/package/mithril), add the command line flag `--edge`:

```bash
npx create-mithriljs-app <my-project> --edge
```

Or

```bash
npm init mithriljs-app <my-project> --edge
```

Or

```bash
yarn create mithriljs-app <my-project> --edge
```
