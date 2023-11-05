// service-worker.js

// Define el nombre de la caché
const cacheName = 'lista-de-compras-v1';

// Archivos que se agregarán a la caché
const cacheFiles = [
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icon.png',
    // Agrega aquí otros archivos y rutas que desees cachear
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(cacheFiles);
        })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== cacheName) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Interceptar las solicitudes y servir desde la caché si están disponibles
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
