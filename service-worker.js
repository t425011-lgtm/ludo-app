// service-worker.js
const CACHE_NAME = "dice-game-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./home.html",
  "./manifest.json",
  "./dice1.png",
  "./dice2.png",
  "./dice3.png",
  "./dice4.png",
  "./dice5.png",
  "./dice6.png"
];

// インストール（初回）
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 有効化
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// オフライン対応
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response ||
        fetch(event.request).catch(() => caches.match("./index.html"));
    })
  );
});
