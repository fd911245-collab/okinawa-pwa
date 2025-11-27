const CACHE_NAME = okinawa-trip-cache-v1;
const ASSETS = [
  .,
  .index.html,
  .manifest.webmanifest
   如果之後有 css  圖片檔，也可以加進來
];

self.addEventListener(install, (event) = {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) = {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener(activate, (event) = {
  event.waitUntil(
    caches.keys().then((keys) =
      Promise.all(
        keys
          .filter((key) = key !== CACHE_NAME)
          .map((key) = caches.delete(key))
      )
    )
  );
});

self.addEventListener(fetch, (event) = {
  const request = event.request;
   只處理 GET
  if (request.method !== GET) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) = {
      if (cached) {
        return cached;
      }
      return fetch(request).catch(() = cached);
    })
  );
});
