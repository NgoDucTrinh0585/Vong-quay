// Chỉ cần khai báo đơn giản thế này là đủ để lừa trình duyệt đây là PWA
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Đã cài đặt');
});

self.addEventListener('fetch', (e) => {
    // Bắt buộc phải có sự kiện fetch để hiện nút "Cài đặt"
});