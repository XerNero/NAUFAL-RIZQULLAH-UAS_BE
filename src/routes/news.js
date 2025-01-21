const express = require('express');
const router = express.Router();

// Dummy data untuk berita
let news = [
  {
    id: 1,
    title: "Film Baru Resident Evil Dirumorkan Akan Hadir Dengan Sentuhan Horor Baru",
    content: `
      Sebuah kabar menarik tengah beredar di kalangan penggemar Resident Evil. Berdasarkan laporan dari Bloody Disgusting, seri video game legendaris ini kabarnya akan mendapatkan adaptasi film baru. Kali ini, film tersebut dirumorkan akan mengadaptasi prekuel game Resident Evil 0, yang pertama kali dirilis di Nintendo GameCube pada tahun 2002.

      Studio di balik film-film Resident Evil, Screen Gems dan Constantin Films, diketahui harus merilis film baru setiap lima tahun untuk mempertahankan hak adaptasi seri tersebut. Dengan film terakhir, Resident Evil: Welcome to Raccoon City, yang dirilis pada 2021 dan gagal secara kritik maupun finansial, rumor ini menjadi semakin kuat. Film terbaru ini kemungkinan besar harus dirilis sebelum awal tahun fiskal berikutnya, yang berarti proses produksi perlu segera dimulai.

      Yang membuat rumor ini semakin menarik adalah laporan bahwa Zach Cregger, sutradara film horor populer Barbarian (2022), akan mengarahkan film ini. Cregger dikenal karena kemampuannya menciptakan cerita horor yang menegangkan dan atmosferik, menjadikannya pilihan ideal untuk mengadaptasi Resident Evil 0.
    `,
    url: "https://cinemags.org/film-baru-resident-evil-dirumorkan-akan-hadir-dengan-sentuhan-horor-baru/",
    image: "https://cinemags.org/wp-content/uploads/2025/01/Resident-Evil-750x375.jpg",
    publishedAt: "2025-01-21",
  },
  {
    id: 2,
    title: "Adrien Brody Membintangi Film The Brutalist yang Berbenturan dengan Isu AI",
    content: `
      Aktor Adrien Brody dikabarkan akan memimpin film baru berjudul The Brutalist. Film ini mengeksplorasi tema arsitektur modernis dan dampaknya terhadap masyarakat kontemporer. Dalam wawancara baru-baru ini, sutradara menyebutkan bahwa film ini akan berhadapan dengan isu-isu kontroversial seperti AI dan bagaimana teknologi dapat mengubah dunia seni serta kehidupan sehari-hari.

      Film ini disutradarai oleh Zach Cregger, yang sebelumnya dikenal atas kesuksesannya dalam genre horor dengan film Barbarian (2022). Dalam proyek ini, Cregger akan mencoba menyentuh tema yang lebih serius dan introspektif. Adrien Brody, yang dikenal atas perannya di film The Pianist, diharapkan dapat membawa kedalaman emosi ke dalam karakter utama.
    `,
    url: "https://www.hollywoodreporter.com/movies/movie-news/the-brutalist-ai-backlash-adrien-brody-1236113015/",
    image: "https://www.hollywoodreporter.com/wp-content/uploads/2024/12/https___cdn.sanity.io_images_xq1bjtf4_production_54fb9ced383eea912527204dfbb105129442c238-3586x2160-H-2024.jpg?w=1296&h=730&crop=1&resize=1000%2C563",
    publishedAt: "2024-12-15",
  },
];

// GET semua berita
router.get('/', (req, res) => {
  console.log('Fetching all news'); // Debugging log
  res.json(news);
});

// GET berita berdasarkan ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const singleNews = news.find((n) => n.id === parseInt(id, 10));

  if (!singleNews) {
    return res.status(404).json({ message: 'News not found' });
  }

  console.log(`Fetching news with ID: ${id}`); // Debugging log
  res.json(singleNews);
});

module.exports = router;
