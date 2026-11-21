const CACHE_NAME = "css-guide-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./T.S. Guide page.html",
    "./styleofweb.css",
    "./darkandlighttheme.css",
    "./script.js",
    "./darkandlighttheme.js"
];

// Save website files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Use saved files when offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});