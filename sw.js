console.log("Service worker starting");

var CACHE_NAME = '44-563-v1';
var urlsToCache = [
  '/',
  '/styles/case-syllabus.css',
  '/scripts/main.js'
];

self.addEventListener('install', function (ev) {
  console.log("Service worker install starting");
  // Perform install steps - open cache, cache files, confirm
  ev.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  console.log("Service worker installed");
});

self.addEventListener('activate', function (ev) {
  console.log("Service worker activated");
});

self.addEventListener('beforeinstallprompt', (ev) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  ev.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = ev;
});

self.addEventListener('fetch', function (ev) {
  console.log("Service worker got a fetch request");
  ev.respondWith(
    caches.match(ev.request)
      .then(function (res) {
        // Cache hit - return response
        if (res) {
          return res;
        }
        return fetch(ev.request).then(
          function (res) {
            // Check for valid response
            if (!res || res.status !== 200 || res.type !== 'basic') {
              return res;
            }

            // IMPORTANT: Clone the response. A response is a stream 
            // and its body can only be consumed once.
            // We need one for the browser and one for the cache.
            var responseToCache = res.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(ev.request, responseToCache);
              });
            return res;
          }
        );
      })
  );
  console.log("Service worker finished fetch");
});


