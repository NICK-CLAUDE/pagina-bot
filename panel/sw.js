// Service worker mínimo para que el panel se pueda instalar como app. No intercepta nada: los datos siempre son en vivo.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
