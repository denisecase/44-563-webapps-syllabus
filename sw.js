console.log("Service worker starting");

const CACHE_NAME = '44-563-v1';
const CACHE_CONTAINING_ERROR_MESSAGES = 'error-cache'
const urlsToCache = [
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
      .then(function (response) {
         if (response) { 
          console.log("Service worker got a valid response from the cache");
          return response; 
        }
        else {
          console.log("Service worker fetching updated content from the web");
          return fetch(event.request)  
            .then(function (res) {
              console.log("Service worker saving response and returning fetched data")
              return caches.open(CACHE_NAME)
                .then(function (cache) {
                  cache.put(event.request.url, res.clone());  
                  return res;
                })
            })
            .catch(function (err) {      
              console.log("Service worker fetch unsuccessful - replying with error page or message")
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function (cache) {
                  return cache.match('Error - not available');
                });
            });
        }
      })
  );
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