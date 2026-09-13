// Service worker minimo per rendere il gioco installabile (PWA) e avviabile
// anche offline. Strategia network-first: finche' c'e' rete si scarica sempre
// la versione fresca (coerente con i meta no-cache di index.html — il gioco e'
// in sviluppo attivo, nessuna build vecchia deve sopravvivere), la copia in
// cache serve solo come ripiego quando la rete manca. Le richieste ad altre
// origini non vengono toccate.
const CACHE = "nimbus-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: req.mode === "navigate" })),
  );
});
