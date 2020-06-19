if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // register returns a promise
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.warn(`Service worker registered; scope=${registration.scope}.`);
      })
      .catch((error) => {
        console.error(`Service worker registration failed with ${error}.`);
      });
  });
}
