const CACHE = 'solar-202608190833';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => clients.claim())
     .then(() => self.clients.matchAll({type: 'window'}))
     .then(cs => cs.forEach(c => c.navigate(c.url)))
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request, {cache: 'no-store'})
      .catch(() => caches.match(e.request))
  );
});
setInterval(() => self.registration.update(), 60 * 60 * 1000);