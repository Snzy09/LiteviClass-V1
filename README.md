# Litevi Class 💻

Ini adalah website untuk Litevi Class, yang menampilkan informasi kelas, jadwal, portofolio siswa, dan fitur interaktif lainnya. Proyek ini dibangun dengan Next.js dan TypeScript, serta menggunakan Tailwind CSS untuk styling.

## Contributor 👥

Para Developer yang ikut mengembangkan project ini

 * Aden Fathul Fatonah
 * M.Ikhsan Candra Putra
 * M. Hasbi Al-As'ariy

## Fitur 🔔

  * **Jadwal Pelajaran & Piket**: Menampilkan jadwal pelajaran dan daftar piket harian untuk siswa.
  * **Portofolio Siswa**: Setiap siswa memiliki halaman portofolio sendiri yang menampilkan keahlian, hobi, dan proyek yang pernah dikerjakan.
  * **Galeri Kelas**: Carousel yang menampilkan foto-foto kegiatan kelas.
  * **Obrolan Anonim**: Fitur obrolan real-time di mana siswa dapat berinteraksi secara anonim.
  * **Desain Responsif**: Didesain agar dapat diakses dengan baik di perangkat desktop maupun mobile.
  * **Mode Terang & Gelap**: Dilengkapi dengan tombol untuk mengubah tema antara mode terang dan gelap.

## Tech Stack 📣

  * **Framework**: Next.js
  * **Bahasa**: TypeScript
  * **Styling**: Tailwind CSS
  * **UI Komponen**: shadcn/ui, Radix UI
  * **Animasi**: Framer Motion, GSAP
  * **Backend (untuk Obrolan)**: Supabase

## Starter 🪽

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/sanzz-md/liteviclass-v1.git
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd liteviclass-v1
    ```
3.  **Install dependensi:**
    ```bash
    npm install
    ```
4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Struktur Proyek 🕹

  * `/app`: Berisi semua halaman dan rute aplikasi.
  * `/components`: Komponen React yang dapat digunakan kembali.
  * `/components/ui`: Komponen UI dari shadcn/ui.
  * `/data`: Berisi data statis seperti daftar siswa, jadwal, dll.
  * `/lib`: Berisi fungsi utilitas.
  * `/public`: Aset statis seperti gambar.
  * `/styles`: File CSS global.
