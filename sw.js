console.log("Service worker starting");

var CACHE_NAME = '44-563-v1';
var urlsToCache = [
  '/',
  '/styles/case-syllabus.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  console.log("Service worker install starting");
  // Perform install steps - open cache, cache files, confirm
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache ', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Error opening cache ', CACHE_NAME);
        return;
      })
  );
  console.log("Service worker installed");
});

self.addEventListener('activate', event => {
  console.log("Service worker activated");
});

self.addEventListener('beforeinstallprompt', event => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
});

self.addEventListener('fetch', event => {
  // ref https://jakearchibald.com/2014/offline-cookbook/#on-network-response
  console.log("Service worker got a fetch request");
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  console.log("Service worker finished fetch");
});