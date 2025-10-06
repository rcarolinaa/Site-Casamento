const CACHE_NAME = "casamento-v1"; // define o nome do cache que o service worker vai criar. Sse atualizar o site, muda para "casamento-v2" para o sw criar um novo cache e descartar o antigo no evento activate.
const FILES_TO_CACHE = [ // É um array com todos os arquivos que salvar no cache durante o install.
  "./",
  "./index.html",
  "./manifest.json",
  "./imagem1.jpg",
  "./cobertor.jpg",
  "./jacquin.jpg",
  "./ronaldo.jpg",
  "./buque.jpg",
  "./naiara.jpg",
  "./wepink.jpg",
  "./gata.jpg",
  "./divino.jpg",
  "./icon-192.png",
  "./icon-512.png"
];

// Instala e salva no cache
self.addEventListener("install", (event) => { // garante que o navegador espere o cache ser criado antes de considerar o sw instalado.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => { // abre um cache (ou cria um novo) com o nome definido em CACHE_NAME.
      return cache.addAll(FILES_TO_CACHE); // adiciona todos os arquivos essenciais do site ao cache, permitindo que o site funcione offline.
    })
  );
  self.skipWaiting(); // força o novo service worker a assumir imediatamente, sem esperar que o antigo seja encerrado.
});

// Ativa e remove caches antigos, esse evento é chamado quando o sw entra em operação ativa. Serve para limpar caches antigos desnecessarios.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim(); // garante que o service worker comece a controlar todas as páginas abertas imediatamente, sem precisar recarregá-las.
});

// Responde às requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
