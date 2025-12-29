self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("translation-cache").then((cache) => {
            return cache.addAll([assets]);
        })
    );
});
 
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

var assets = [
    '/',
    '/index.html',
    "/translationScreen.html",
    "/languageSelectionScreen.html",
    "/SavedConversationsScreen.html",

    '/style.css',
    
    '/app.js',
    '/translation.js',

    'activeMicrophone.png',
    'bin.png',
    'chat.png',
    'error.png',
    'globe.png',
    'home.png',
    'microphone.png',
    'save.png',
    'Spain.png',
    'text.png',
    'united-kingdom.png'
];