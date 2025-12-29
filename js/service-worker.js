const cacheName = 'translation_cache';
var assets = [
    '/',
    'index.html',
    "pages/translationScreen.html",
    "pages/languageSelectionScreen.html",
    "pages/savedConversationsScreen.html",

    'css/style.css',
    'css/bootstrap.min.css',

    'js/app.js',
    'js/translation.js',
    'js/bootstrap.bundle.min.js',

    'images/LynxLogo.png',
    'images/icons/activeMicrophone.png',
    'images/icons/bin.png',
    'images/icons/chat.png',
    'images/icons/error.png',
    'images/icons/globe.png',
    'images/icons/home.png',
    'images/icons/microphone.png',
    'images/icons/save.png',
    'images/icons/Spain.png',
    'images/icons/text.png',
    'images/icons/united-kingdom.png'
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});