/* Stellar Words — service worker
   Стратегія:
   • App shell (HTML/manifest/іконки) — precache при install.
   • Локальні запити — cache-first з фоновим оновленням (stale-while-revalidate).
   • Картинки планет з CDN — runtime-кеш (працює офлайн після першого завантаження).
   Версію кеша піднімай при кожному релізі, щоб юзери отримали оновлення. */
const VERSION = 'stellar-words-v1';
const SHELL = [
  './',
  './space-words.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Навігація → пробуємо мережу, фолбек на кешований HTML (офлайн-старт).
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./space-words.html'))
    );
    return;
  }

  // Решта (включно з картинками планет з CDN) → stale-while-revalidate.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
