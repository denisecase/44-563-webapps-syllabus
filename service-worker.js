
// https://developers.google.com/web/tools/workbox/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {

  console.log('workbox loaded', workbox.routing)

  const appName = '44-563-webapps-syllabus'
  const appVersion = 'v1'
  const maxAgeDay = 1 * 24 * 60 * 60;
  const maxAgeMonth = maxAgeDay * 30
  const maxAgeYear = maxAgeDay * 365
  const httpResponseOpaque = 0 // CORS
  const httpReponseOk = 200  // good

  // test Regular Expressions at https://regexr.com/
  const reStatic = /\.(?:js|css)$/
  const reImages = /\.(?:png|gif|jpg|jpeg|webp|svg)$/
  const reCdnFont = /https:\/\/use\.fontawesome\.com\/.*all\.css$/
  const reCdnStyles = /https:\/\/cdnjs\.cloudflare\.com\/.*\.css$/

  workbox.core.setCacheNameDetails({
    prefix: appName,
    suffix: appVersion,
    precache: 'custom-precache-name',
    runtime: 'custom-runtime-name'
  })

  const precacheCacheName = workbox.core.cacheNames.precache;
  const runtimeCacheName = workbox.core.cacheNames.runtime;

  console.log(`precacheCacheName=${precacheCacheName}`)
  console.log(`runtimeCacheName=${runtimeCacheName}`)

  // use stale cached files while downloading new

  workbox.routing.registerRoute(reCdnFont,
    new workbox.strategies.StaleWhileRevalidate()
  )

  workbox.routing.registerRoute(reCdnStyles,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${appName}-cdn-css`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 90,
          maxAgeSeconds: maxAgeDay,
          purgeOnQuotaError: true,
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [httpReponseOk]
        })
      ]
    })
  )

  workbox.routing.registerRoute(reStatic,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${appName}-static-css-js`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 90,
          maxAgeSeconds: maxAgeDay,
          purgeOnQuotaError: true,
        })
      ]
    })
  )

  // cache-first

  workbox.routing.registerRoute(reImages,
    new workbox.strategies.CacheFirst({
      cacheName: `${appName}-images`,
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: maxAgeDay,
          purgeOnQuotaError: true
        }),
      ],
    })
  )

  workbox.routing.setCatchHandler(({ event }) => {
    console.error(`Error: ${event.error}`)
    if (event.request.mode === 'navigate') {
      return caches.match('/error-page.html')
    }
    return Response.error()
  })

  // respond with 200 (ok) even when offline 

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(`${appName}-static`)
      .then(cache => {
        return cache.addAll([
          '.',
          'index.html',
          'styles/case-syllabus.css'
        ])
      })
    )
  })

  self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
      .then(response => {
        if (response) { return response; }
        return fetch(event.request)
      })
    )
  })

}
