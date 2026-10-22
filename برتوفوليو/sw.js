const V='abdo-v1',CORE=['./','index.html','images/me.jpg','images/favicon-48.png','images/apple-touch-icon.png','images/icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com/.test(u.host))return;
 const save=res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(save).catch(()=>caches.match('./')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(save)))});
