
/**
 *  @fileOverview Provides an asynchronous service worker to manage application behavior. 
 * 
 * Service workers are capable of intercepting and adjusting all requests before they are sent and after they return.
 * 
 * Services workers can manage caching files to improve performance, provide offline app experiences, 
 * enable 'home page' installation on devices, and provide push notifications to your users.
 * 
 * - Service worker will download (upon page access, every 24 hours)
 * - Will install (if new) and yield the install event
 * - Yields activate event after pages load and old service worker is no longer used
 *  
 * Use Chrome Dev Tools / Application to clear storage.
 * 
 * Use Chrome Dev Tools / Application / ServiceWorker to debug.
 * Check "update on reload" to force service worker update on page reload.
 * 
 * Use Chrome Dev Tools / Audit to evaluate.
 * 
 * JSDoc comments are written in Markdown.
 * 
 *  @author       Denise Case
 * 
 * @requires     EXTERNAL:@link{https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js}
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {

  console.log('Service worker Workbox loaded', workbox.routing)

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

  // use stale cached cdn font files while downloading new

  workbox.routing.registerRoute(reCdnFont,
    new workbox.strategies.StaleWhileRevalidate()
  )

  // use stale cached cdn style files while downloading new

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

  // Use stale local static files (js/css) while downloading new

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

  // Fetch images, try local cache first

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

  // Define a common handler if any of the fetching methods fail

  workbox.routing.setCatchHandler(({ event }) => {
    console.error(`Error: ${event.error}`)
    if (event.request.mode === 'navigate') {
      return caches.match('/error-page.html')
    }
    return Response.error()
  })

  // respond with 200 (ok) even when offline 

  self.addEventListener('install', function (event) {
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
