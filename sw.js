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
  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
  console.log("Service worker finished fetch");
});

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE_NAME).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}