const REQUIRED_FILES = [
    "/favicon.ico",
    "/index.html",
    "/manifest.webmanifest",
    "/*.css",
    "/*.js"
];
const CACHE_NAME = "getAllData";
self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(REQUIRED_FILES);
    self.skipWaiting();
  })
});

self.addEventListener("fetch", (event) => {
    event.respondWith(async () => {
      const response = await caches.open(event.request);
        return response ? response : await fetch(event.request);
    })
  });
  