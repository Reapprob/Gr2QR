//js for offline support of the website
const CACHE_NAME = "css-guide-v4";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./T.S. Guide page.html",
    "./styleofweb.css",
    "./styleofweb2.css",
    "./darkandlighttheme.css",
    "./script.js",
    "./darkandlighttheme.js",
    "./offlineindicator.js",
    "./xHproblem1.html"
];

// Install and save important files of the web
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Remove old cache versions when online again
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

// Load pages and resources
self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // Only cache files from our own website
    if (url.origin !== self.location.origin) return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const copy = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(request, copy));

                    return response;
                })
                .catch(async () => {
                    return await caches.match(request) ||
                           await caches.match("./index.html");
                })
        );
    } else {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;

                return fetch(request).then(response => {
                    if (response.ok) {
                        const copy = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(request, copy));
                    }

                    return response;
                });
            })
        );
    }
});
