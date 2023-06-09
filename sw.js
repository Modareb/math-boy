
const cacheName = "mathBoy-v1.1.0";

let appShellFiles = [
    // html
    '/math-boy/',
    '/math-boy/index.html',

    // css'
    '/math-boy/styles/style.css',
    "/math-boy/styles/fonts.css",


    // JS codes
    '/math-boy/main.js',
    '/math-boy/init-sw.js',

    // images
    '/math-boy/favicon.png',

    // fonts
    '/math-boy/fonts/arvo-v20-latin-regular.woff2',
    '/math-boy/fonts/arvo-v20-latin-700.woff2',

]

self.addEventListener("install", (e) => {
    // progress into the activating state
    self.skipWaiting();

    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(appShellFiles);
        })()
    );
});

// Establish a cache name
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.open(cacheName).then((cache) => {
        // Go to the network first
        return fetch(event.request.url).then((fetchedResponse) => {
            console.log('update (put)', event.request.clone());
            cache.put(event.request, fetchedResponse.clone());
            return fetchedResponse;
        }).catch(() => {
            console.log('no network, get ', event.request.clone());
            // If the network is unavailable, get
            return cache.match(event.request);
        });
    }));
});

// used to clear out the old cache we don't need anymore
self.addEventListener("activate", (e) => {
    console.log('[Service Worker] Activate')
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                })
            );
        })
    );
});