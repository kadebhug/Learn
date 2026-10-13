/* Runtime cache for the app shell and pages you have already opened. */
const CACHE = "grove-shell-v3";
const BASE = self.location.pathname.replace(/\/sw\.js$/, "");
const PRECACHE = [`${BASE}/`, `${BASE}/paths/`, `${BASE}/offline.html`, `${BASE}/icons/icon-192.png`, `${BASE}/icons/icon-512.png`];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith(`${BASE}/api/`)) return;
  const asset = url.pathname.startsWith(`${BASE}/_next/static`) || url.pathname.startsWith(`${BASE}/icons`);

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(request);
        if (fresh.ok && (request.mode === "navigate" || asset)) {
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const offline = await cache.match(`${BASE}/offline.html`);
          if (offline) return offline;
        }
        return Response.error();
      }
    })(),
  );
});
