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
    event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request).then(function(response) {
            if (response) {
              return response;
            } else if (event.request.headers.get("accept").includes("text/html")) {
              return caches.match("/index-offline.html");
            }
          });
        })
      );
  });
  