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
 * @requires     EXTERNAL:@link{https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js}
 */

// eslint-disable-next-line no-undef
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);

if (workbox) {
  const appName = '44-563-webapps-syllabus';
  const appVersion = 'v1';
  const maxAgeDay = 1 * 24 * 60 * 60;
  const maxAgeWeek = maxAgeDay * 7;
  const maxEntries = 60; // limit to 60 items
  // eslint-disable-next-line no-unused-vars
  const httpResponseOpaque = 0; // CORS
  const httpReponseOk = 200; // good

  // test Regular Expressions at https://regexr.com/
  const reStatic = /\.(?:js|css|html)$/;
  const reImages = /\.(?:png|gif|jpg|jpeg|webp|svg)$/;
  const reCdnFont = /https:\/\/use\.fontawesome\.com\/.*all\.css$/;
  const reGoogleFont = /https:\/\/fonts\.googleapis\.com\/*$/;
  const reCdnStyles = /https:\/\/stackpath\.bootstrapcdn\.com\/.*\.css$/;
  const reSyllabus = /https:\/\/denisecase.github.io\/*.(?:js|css|html)$/;

  // set a prefix & suffix so local host caches remain unique
  workbox.core.setCacheNameDetails({
    prefix: appName,
    suffix: appVersion,
    precache: 'pre-cache',
    runtime: 'runtime-cache',
  });

  const precacheCacheName = workbox.core.cacheNames.precache;

  // use stale cached cdn font files while downloading new

  workbox.routing.registerRoute(
    reCdnFont,
    new workbox.strategies.StaleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    reGoogleFont,
    new workbox.strategies.StaleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    reSyllabus,
    new workbox.strategies.StaleWhileRevalidate(),
  );

  // use stale cached cdn style files while downloading new
  // set the max age of the cached files and the max number of entries it can hold

  workbox.routing.registerRoute(
    reCdnStyles,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: precacheCacheName,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          maxAgeSeconds: maxAgeWeek,
          maxEntries,
          purgeOnQuotaError: true,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [httpReponseOk],
        }),
      ],
    }),
  );

  // Use stale local static files (js/css) while downloading new

  workbox.routing.registerRoute(
    reStatic,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: precacheCacheName,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          maxAgeSeconds: maxAgeDay,
          maxEntries,
          purgeOnQuotaError: true,
        }),
      ],
    }),
  );

  // Fetch images, try local cache first

  workbox.routing.registerRoute(
    reImages,
    new workbox.strategies.CacheFirst({
      cacheName: precacheCacheName,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          maxAgeSeconds: maxAgeWeek, // keep images for a week
          maxEntries,
          purgeOnQuotaError: true,
        }),
      ],
    }),
  );

  // Define a common handler if any of the fetching methods fail

  workbox.routing.setCatchHandler(({ event }) => {
    console.error(`Error: ${event.error}`);
    if (event.request.mode === 'navigate') {
      return caches.match('/error-page.html');
    }
    return Response.error();
  });

  // respond with 200 (ok) even when offline

  this.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(precacheCacheName)
        .then((cache) =>
          cache.addAll([
            '.',
            'index.html',
            'scripts/register-sw.js',
            'web-components/nw-syllabus-outline.js',
            'init.js',
          ]),
        )
        .catch((error) => {
          console.error(`Error in install event: ${error} `);
        }),
    );
  });

  this.addEventListener('fetch', (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
        .catch((error) => {
          console.error(`Error on fetch: ${error} `);
        }),
    );
  });
} else {
  console.error('Error: Workbox did not load.');
}
