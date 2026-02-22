const CACHE_NAME = 'pomo-gacha-cache-v4';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
    './apple-touch-icon.png',
    './favicon.ico',
    './favicon-16x16.png',
    './favicon-32x32.png'
];

// Bước 1: Cài đặt và tải các file vào bộ nhớ đệm (Cache)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Đã lưu cache thành công');
                return cache.addAll(urlsToCache);
            })
    );
    // Ép Service Worker bản mới này có hiệu lực ngay lập tức
    self.skipWaiting();
});

// Bước 2: Kích hoạt và DỌN DẸP BỘ NHỚ CŨ (Vũ khí bí mật để sửa lỗi mất Icon)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Nếu tên cache không phải là v3, xóa ngay lập tức!
                    if (cacheName !== CACHE_NAME) {
                        console.log('Đang xóa cache cũ:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Bước 3: Lấy file ra dùng khi web yêu cầu (Ưu tiên lấy trong Cache trước)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Nếu tìm thấy file trong cache (như file ảnh icon), lấy ra dùng luôn
                if (response) {
                    return response;
                }
                // Nếu không có, mới bắt đầu tải từ mạng về
                return fetch(event.request);
            })
    );
});
