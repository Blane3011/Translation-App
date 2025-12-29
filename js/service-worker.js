const cacheName = 'translation_cache';
var assets = [
    '/',
    'Translation-App/index.html',
    "Translation-App/pages/translationScreen.html",
    "Translation-App/pages/languageSelectionScreen.html",
    "Translation-App/pages/savedConversationsScreen.html",

    'Translation-App/css/style.css',
    'Translation-App/css/bootstrap.min.css',

    'Translation-App/js/app.js',
    'Translation-App/js/translation.js',
    'Translation-App/js/bootstrap.bundle.min.js',

    'Translation-App/images/LynxLogo.png',
    'Translation-App/images/icons/activeMicrophone.png',
    'Translation-App/images/icons/bin.png',
    'Translation-App/images/icons/chat.png',
    'Translation-App/images/icons/error.png',
    'Translation-App/images/icons/globe.png',
    'Translation-App/images/icons/home.png',
    'Translation-App/images/icons/microphone.png',
    'Translation-App/images/icons/save.png',
    'Translation-App/images/icons/Spain.png',
    'Translation-App/images/icons/text.png',
    'Translation-App/images/icons/united-kingdom.png'
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