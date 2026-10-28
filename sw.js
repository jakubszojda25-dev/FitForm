/* Forma – działanie offline. Podnieś numer wersji przy każdej zmianie plików. */
const V = 'forma-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './config.js', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
const CDN = ['www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(V).then(x => x.put(req, c)); } return res; };
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === location.origin) {
    if (req.mode === 'navigate' || u.pathname.endsWith('.html') || u.pathname.endsWith('config.js') || u.pathname.endsWith('/')) {
      e.respondWith(fetch(req).then(r => put(req, r)).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    } else {
      e.respondWith(caches.match(req).then(r => r || fetch(req).then(r2 => put(req, r2))));
    }
    return;
  }
  if (CDN.includes(u.hostname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(r2 => put(req, r2))));
  }
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => l.length ? l[0].focus() : self.clients.openWindow('./')));
});
