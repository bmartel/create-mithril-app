/* eslint-disable */
workbox.core.skipWaiting()
workbox.core.clientsClaim()

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(/\/static\/.*\.(?:png|gif|jpg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-images'
  })
);

workbox.routing.registerRoute(/\/static\/.*\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
);

workbox.routing.registerRoute(/.*(?:googleapis)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis'
  })
);

workbox.routing.registerRoute(/.*(?:gstatic)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'gstatic'
  })
);

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
  blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
})
