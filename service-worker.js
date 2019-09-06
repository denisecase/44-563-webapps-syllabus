/**
 *  @fileOverview Provides an asynchronous service worker to manage application behavior.
 *
 * Service workers are capable of intercepting and adjusting all requests
 * before they are sent and after they return.
 *
 * Services workers can manage caching files to improve performance,
 * provide offline app experiences, enable 'home page' installation on devices,
 * and provide push notifications to your users.
 *
 * An updated Service worker will download (upon first page access, or every 24 hours).
 * If new, it will yield the install event.
 * It will yield the activate event after pages load and old service worker is no longer used.
 *
 * Use Chrome Dev Tools / Application to clear storage.
 *
 * Use Chrome Dev Tools / Application / ServiceWorker to debug.
 *
 * Check "update on reload" to force service worker update on page reload.
 *
 * Use Chrome Dev Tools / Audit to evaluate.
 *
 * JSDoc comments are written in Markdown.
 *
 * @author       Denise Case
 *
 */

// eslint-disable-next-line no-undef
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)

if (workbox) {
  console.log(`Service worker Workbox loaded: ${workbox.routing}`)

  const appName = '44-563-webapps-syllabus'
  const appVersion = 'v1'
  const maxAgeDay = 1 * 24 * 60 * 60
  const maxAgeWeek = maxAgeDay * 7
  const maxEntries = 60 // limit to 60 items
  // eslint-disable-next-line no-unused-vars
  const httpResponseOpaque = 0 // CORS
  const httpReponseOk = 200 // good

  // test Regular Expressions at https://regexr.com/
  const reStatic = /\.(?:js|css|html)$/
  const reImages = /\.(?:png|gif|jpg|jpeg|webp|svg)$/
  const reCdnFont = /https:\/\/use\.fontawesome\.com\/.*all\.css$/
  const reCdnStyles = /https:\/\/cdnjs\.cloudflare\.com\/.*\.css$/

  // set a prefix & suffix so local host caches remain unique
  workbox.core.setCacheNameDetails({
    prefix: appName,
    suffix: appVersion,
    precache: 'install-cache',
    runtime: 'runtime-cache'
  })

  const precacheCacheName = workbox.core.cacheNames.precache
  const runtimeCacheName = workbox.core.cacheNames.runtime

  console.log(`precacheCacheName=${precacheCacheName}`)
  console.log(`runtimeCacheName=${runtimeCacheName}`)

  // use stale cached cdn font files while downloading new

  workbox.routing.registerRoute(
    reCdnFont,
    new workbox.strategies.StaleWhileRevalidate()
  )

  console.log(
    `Workbox registered fonts ${reCdnFont} with Stale While Revalidate strategy`
  )

  // use stale cached cdn style files while downloading new
  // set the max age of the cached files and the max number of entries it can hold

  workbox.routing.registerRoute(
    reCdnStyles,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${appName}-cdn-css`,
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeWeek,
          maxEntries: maxEntries,
          purgeOnQuotaError: true
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [httpReponseOk]
        })
      ]
    })
  )

  console.log(
    `Workbox registered styles ${reCdnStyles} with Stale While Revalidate strategy`
  )

  // Use stale local static files (js/css) while downloading new

  workbox.routing.registerRoute(
    reStatic,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${appName}-static-css-js`,
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeDay,
          maxEntries: maxEntries,
          purgeOnQuotaError: true
        })
      ]
    })
  )

  console.log(
    `Workbox registered static assets ${reStatic} with Stale While Revalidate strategy`
  )

  // Fetch images, try local cache first

  workbox.routing.registerRoute(
    reImages,
    new workbox.strategies.CacheFirst({
      cacheName: `${appName}-images`,
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: maxAgeWeek, // keep images for a week
          maxEntries: maxEntries,
          purgeOnQuotaError: true
        })
      ]
    })
  )
  console.log(
    `Workbox registered static images ${reImages} with Cache First strategy`
  )

  // Define a common handler if any of the fetching methods fail

  workbox.routing.setCatchHandler(({ event }) => {
    console.error(`Error: ${event.error}`)
    if (event.request.mode === 'navigate') {
      return caches.match('/error-page.html')
    }
    return Response.error()
  })

  // respond with 200 (ok) even when offline

  self.addEventListener('install', event => {
    event.waitUntil(
      caches
        .open(`${appName}-static`)
        .then(cache => {
          console.log(`Workbox got content from cache ${appName}-static `)
          return cache.addAll([
            '.',
            'index.html',
            'styles/case-syllabus.css',
            'styles/active-checks.css',
            'scripts/main.js',
            'scripts/register-sw.js',
            'scripts/active-checks.js'
          ])
        })
        .catch(error => {
          console.error(`Error in install event: ${error} `)
        })
    )
  })

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => {
          if (response) {
            console.log(`Workbox got fetch response ${response} `)
            return response
          }
          return fetch(event.request)
        })
        .catch(error => {
          console.error(`Error on fetch: ${error} `)
        })
    )
  })
} else {
  console.log(`Error: Workbox didn't load.`)
}
