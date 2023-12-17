// public/service-worker.js

// 캐시할 파일들의 리스트
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

// 서비스 워커 설치 이벤트
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

// 서비스 워커 요청/응답 이벤트
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', event => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});
