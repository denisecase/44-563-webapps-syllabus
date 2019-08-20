if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // register returns a promise
    navigator.serviceWorker
      .register('service-worker.js')
      .then(registration => {
        console.log(
          `Service worker registered with scope=${registration.scope}.`
        )
      })
      .catch(error => {
        console.log(`Service worker registration failed with ${error}.`)
      })
  })
}
