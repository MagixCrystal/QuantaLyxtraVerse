# Quantalyxtra Verse

Quantalyxtra Verse membantu menata akses digital dalam satu ruang. Beranda berisi informasi umum; katalog hanya dapat dibuka setelah pengguna masuk atau membuat akun.

## Halaman

- `index.html` — beranda dan informasi umum.
- `auth.html` — halaman masuk dan pendaftaran akun.
- `catalog.html` — halaman katalog yang berisi kategori. Pilih kartu kategori untuk membuka daftar aplikasinya.
- `category.html` — halaman aplikasi dalam kategori yang dipilih.
- `admin.html` — panel khusus untuk mengelola isi katalog.

## Cara menjalankan

Ekstrak ZIP, buka folder proyek, lalu jalankan melalui server lokal atau alamat HTTPS. Buka `index.html` melalui alamat server tersebut. Membuka berkas secara langsung dapat membuat fitur akun tidak tersedia. Apache dapat digunakan, tetapi layanan MySQL tidak diperlukan.

## Akun admin demo

- Email: `admin@quantalyxtra.com`
- Kata sandi: `QxVerseAdmin!2026`

Pengguna yang mendaftar mendapat akses user dan diarahkan ke katalog. Akun admin diarahkan ke panel pengelolaan dan dapat menambah, mengedit, atau menghapus aplikasi. Kategori produktivitas dan pembelajaran tersedia di katalog serta panel admin.

## Logo dan tautan

Logo Quantalyxtra Verse memakai gambar brand dan lambang yang disertakan. Kartu katalog membuka halaman kategori. Di halaman kategori, setiap aplikasi memiliki tautan aplikasi dan tautan terpisah menuju situs resminya. Kartu LMS membuka halaman kursus Infinite Learning yang memuat materi belajar mandiri. Tautan untuk Assets Management, Webmail, Pritunl, dan Zabbix saat ini menuju situs produk resminya. Jika tersedia portal internal khusus, admin dapat mengganti alamatnya dari panel pengelolaan.

## Penyimpanan

Tidak ada basis data. Akun, sesi, nama pemilik, dan perubahan katalog disimpan di penyimpanan lokal browser pada perangkat yang digunakan. Data tidak otomatis berpindah ke browser atau perangkat lain. Karena pemeriksaan akses admin berlangsung di browser, panel ini ditujukan untuk penggunaan lokal atau prototipe.

Untuk mengatur ulang data demo, hapus `qv.apps.v1`, `qv.users.v1`, dan `qv.session.v1` dari penyimpanan lokal browser, lalu muat ulang situs.
