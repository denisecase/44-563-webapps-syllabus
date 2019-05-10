console.log("Service worker starting");

const CACHE = '44-563-v1';
const CACHE_CONTAINING_ERROR_MESSAGES = '44-563-error-cache'
const urlsToCache = [
  '/images/N60-2Stack-Full.jpg',
  '/images/northwestlogo.jpg',
  '/images/icons/android/android-launchericon-144-144.png',
  '/images/icons/android/android-launchericon-192-192.png',
  '/images/icons/android/android-launchericon-48-48.png',
  '/images/icons/android/android-launchericon-512-512.png',
  '/images/icons/android/android-launchericon-72-72.png',
  '/images/icons/android/android-launchericon-96-96.png',
  '/styles/case-syllabus.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  console.log("Service worker install starting");
  // Perform install steps - open cache, cache files, confirm
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => {
        console.log('Opened cache ', CACHE);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Error opening cache ', CACHE);
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
        if (response) {
          console.log('Service worker found ', event.request.url, ' in the cache');
          return response;
        }
        else {
          console.log("Service worker fetching updated content from the web");
          return fetch(event.request)
            .then(res => {
              console.log("Service worker saving response and returning fetched data")
              return caches.open(CACHE)
              .then(cache => {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              console.log("Service worker fetch unsuccessful - replying with error page or message")
              return fetch(event.request);
            });
        }
      })
  );
  console.log("Service worker finished fetch");
});

