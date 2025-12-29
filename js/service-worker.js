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
    '/Pages/index.html',
    "/Pages/translationScreen.html",
    "/Pages/languageSelectionScreen.html",
    "/Pages/SavedConversationsScreen.html",

    '/style.css',

    '/app.js',
    '/translation.js',

    'Images/Icons/activeMicrophone.png',
    'Images/Icons/bin.png',
    'Images/Icons/chat.png',
    'Images/Icons/error.png',
    'Images/Icons/globe.png',
    'Images/Icons/home.png',
    'Images/Icons/microphone.png',
    'Images/Icons/save.png',
    'Images/Spain.png',
    'Images/text.png',
    'Images/united-kingdom.png'
];