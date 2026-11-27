// Service worker: la página se abre al instante desde la copia guardada (y se actualiza sola); los datos NUNCA se guardan: siempre en vivo.
const C="panel-v11";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","manifest.json"]).catch(()=>{})));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  // solo la página y sus íconos; los datos (estado, velas, pc) van siempre directo a la PC (antes se guardaban: datos viejos y de la otra cuenta)
  if(e.request.method!=="GET"||u.origin!==location.origin||!/(\/|\.html|\.png|manifest\.json)$/.test(u.pathname))return;
  e.respondWith(caches.open(C).then(async c=>{const h=await c.match(e.request,{ignoreSearch:true});
    const red=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>h);
    return h||red}));
});
