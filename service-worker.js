// handball recorder PWA - Service Worker
const CACHE_NAME = "handball-recorder-v1";

// オフラインでも開けるようにキャッシュしたいファイル
const FILES_TO_CACHE = [
  "./",
  "./handballsystem.html",
  "./manifest.json",
  "./service-worker.js"
];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// 有効化時に古いキャッシュを掃除（バージョン違い）
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
});

// 取得（ネットが無いときはキャッシュから）
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
