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
  console.log("Service worker got a fetch request");
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Check for valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream 
            // and its body can only be consumed once.
            // We need one for the browser and one for the cache.
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => {
                console.log('Error opening cache ', CACHE_NAME);
                return;
              })
            return response;
          })
          .catch(err => {
            console.log('Error fetching event request ', event.request);
            return;
          })
      })
  );
  console.log("Service worker finished fetch");
});


