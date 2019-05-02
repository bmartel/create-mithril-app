# <%= name %>

> <%= description %>

## Quick start

```
$ <%= pm %> install
$ <%= pm %> run start
```

and navigate to http://localhost:9000

## Server side rendering

```
$ <%= pm %> run serve
```

and navigate to http://localhost:3000

## Commands

- `<%= pm %> run build` - production build of assets for deployment.
- `<%= pm %> run build:dev` - development build of assets.
- `<%= pm %> run start` - automatically build assets on file changes and start a development server with hot reload.
- `<%= pm %> run serve` - build production assets and start an express based nodejs server for server side rendering.
- `<%= pm %> run lint` - lint all files and fix with eslint and prettier.
- `<%= pm %> run test` - run application tests.
