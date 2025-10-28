/*
  Service Worker — Cache long pour /assets/*
  Stratégies:
  - HTML (navigations): network-first
  - Assets (/assets/*, images/fonts/css/js): cache-first (immutables ok)
*/

const SW_VERSION = 'v1.0.0';
const RUNTIME_CACHE = `sf-runtime-${SW_VERSION}`;

self.addEventListener('install', (event) => {
  // Prend immédiatement le contrôle
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== RUNTIME_CACHE).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isNavigationRequest(request) {
  return request.mode === 'navigate' || (request.destination === '' && request.headers.get('accept')?.includes('text/html'));
}

function isAssetRequest(url) {
  try {
    const u = new URL(url);
    if (!u.pathname.startsWith('/assets/')) return false;
    return /\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?|ttf|otf)$/i.test(u.pathname);
  } catch { return false; }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;

  // HTML -> Network First
  if (isNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(RUNTIME_CACHE);
          const cached = await cache.match(request);
          return cached || fetch(request);
        }
      })()
    );
    return;
  }

  // Assets -> Cache First (stale-while-revalidate-like)
  if (isAssetRequest(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        const fetchAndUpdate = fetch(request).then((resp) => {
          // Cache seulement si 200
          if (resp && resp.status === 200) {
            cache.put(request, resp.clone());
          }
          return resp;
        }).catch(() => undefined);

        // Retourne le cache si existant, et rafraîchit en arrière-plan
        if (cached) {
          event.waitUntil(fetchAndUpdate);
          return cached;
        }
        // Sinon, network puis cache
        const network = await fetchAndUpdate;
        return network || new Response('', { status: 504 });
      })()
    );
    return;
  }
});


