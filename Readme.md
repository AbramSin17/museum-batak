# 🏛️ Museum Pusaka Batak

> **Museum Pusaka Batak** adalah aplikasi museum digital interaktif berbasis web yang menyajikan keindahan arsitektur, artefak, dan warisan budaya suku Batak Toba secara 3D dan imersif menggunakan teknologi **A-Frame** dan **WebXR**. Pengunjung dapat menjelajahi aula utama museum 3D, menikmati tur panorama 360°, serta mengamati detail model 3D rumah adat tradisional secara langsung melalui peramban (browser).

---

## 🌐 Demo / Live Preview

Aplikasi ini telah didemonstrasikan dan dapat diakses secara langsung tanpa instalasi tambahan melalui link berikut:

- 🚀 **Live Demo (GitHub Pages):** [https://abramsin17.github.io/museum-batak/](https://abramsin17.github.io/museum-batak/)
- 📦 **Repositori GitHub:** [https://github.com/AbramSin17/museum-batak](https://github.com/AbramSin17/museum-batak)

---

## ✨ Fitur Utama

Fitur-fitur yang ada di dalam aplikasi ini dikelompokkan berdasarkan scene dan sistem pendukungnya:

### 🏛️ Scene 1 — Aula Utama (`index.html`)
- **Ruang Utama 3D (30m x 10m x 7m):** Lingkungan interior aula museum dengan lantai kayu berarsitektur klasik, dinding ivory, serta lis dekorasi (molding) emas dan hitam.
- **Pilar Gorga Prosedural (8 Kolom):** Pilar kayu simetris yang dihiasi ukiran motifs tradisional Gorga Batak (Simeol-meol & Ipong-ipong) yang digenerasi secara dinamis melalui *procedural HTML Canvas*.
- **Sistem Pameran Dinamis (*Exhibits Generator*):** Sistem berbasis `config.js` yang secara otomatis membangun dan menata eksibit interaktif di dalam aula:
  - **Eksibit Gambar:** Lukisan/foto bertema Gorga, Ulos, dan Tari Tortor berbingkai kayu dan emas.
  - **Eksibit Video:** Layar monitor kayu yang memutar video dokumentasi kebudayaan (*Ulos* dan *Tunggal Panaluan*).
  - **Etalase Model 3D:** Model 3D busana adat pria, busana adat wanita, dan Lumbung Padi yang ditempatkan di dalam etalase kaca transparan berputar otomatis.
- **Pencahayaan & Bayangan (*Lighting & Shadows*):** Perpaduan *ambient light* hangat dan 4 *point light ceiling fixtures* yang menghasilkan pencahayaan realistis dengan bayangan lembut (*PCF Soft Shadows*).
- **Pembatas Area Jelajah (*Room Boundary Constraint*):** Sistem pembatas posisi pemain agar tidak berjalan menembus dinding aula atau melayang (ketinggian mata terkunci di Y = 1.6m).

### 🔄 Scene 2 — Tur Panorama 360° (`scene2.html`)
- **Skybox Panorama 360°:** Lingkungan foto panoramic *equirectangular* kebudayaan Batak yang dapat diputar 360 derajat.
- **Hotspot Interaktif 3D:** Titik informasi berbentuk *glowing sphere* merah berbingkai emas untuk objek kebudayaan:
  - **Sigale-gale** (Patung kayu ritual Batak Toba).
  - **Tenun Ulos** (Kain tenun sakral dan simbolis).
  - **Detail Gorga** (Ukiran hiasan pelindung rumah adat).
- **Dialog Modal Pop-up HTML:** Jendela dialog berdesain *glassmorphism* yang muncul saat hotspot ditatap/diklik, menampilkan judul, gambar detail, dan uraian edukatif.
- **Manajemen Pointer Lock:** Pelepasan kursor *pointer lock* secara otomatis ketika modal informasi terbuka untuk mempermudah interaksi pengguna.

### 🏠 Scene 3 — Detail Model 3D (`scene3-model.html`)
- **Lingkungan Terbuka (Outdoor 3D):** Area lanskap luar ruangan berumput hijau dengan pencahayaan matahari siang hari yang cerah (*directional light* dengan *shadow map* 2048x2048).
- **Showcase Model 3D Lumbung Padi:** Eksplorasi model 3D Lumbung Padi (*Sopa*) suku Batak dalam skala besar.
- **Interaksi *Spin-on-Click*:** Fitur animasi yang memutar model 3D sebesar 360° dengan cepat ketika model diklik atau ditatap (*gaze*).
- **Pembatas Area Luar (*World Boundary Constraint*):** Menjaga posisi pemain tetap berada di dalam area halaman museum.

### 🌐 Sistem Umum (Cross-Scene)
- **Interaksi Berbasis Tatapan (*Gaze-based Fuse Cursor*):** Ring kursor 3D di tengah layar yang dapat memicu klik secara otomatis (*fuse*) setelah ditatap selama 1.2 detik (mempermudah pengguna VR/WebXR).
- **Portal Navigasi Antar Scene:** Portal 3D berbentuk cincin ganda emas-merah berputar yang memungkinkan penjelajahan mulus antar scene (Aula Utama ↔ Panorama 360° ↔ Model 3D).
- **UI Overlay & Panduan HUD:** Tampilan awal (*welcome overlay*) dengan efek blur *glassmorphism* dan panel HUD di pojok layar yang menampilkan panduan kontrol (WASD, Mouse, & ESC).
- **Kontroler Video Interaktif:** Kemampuan *play/pause* video saat diklik serta otomatis mengaktifkan suara (*unmute*).

---

## 🛠️ Teknologi yang Digunakan

| Teknologi / Library | Versi / Sumber | Kegunaan |
| :--- | :--- | :--- |
| **A-Frame** | `v1.5.0` (via CDN) | Framework WebXR & 3D Web Engine berbasis HTML & Three.js |
| **Three.js** | Embedded A-Frame | Manajemen material, tekstur canvas, kalkulasi 3D Vector |
| **HTML5 & CSS3** | Native | Struktur WebXR, layout responsif, UI Glassmorphism, & modal pop-up |
| **Vanilla JavaScript** | ES6+ | Logika komponen A-Frame, generator eksibit, & tekstur Gorga prosedural |
| **Google Fonts** | Outfit & Roboto | Tipografi antarmuka museum |

---

## 📁 Struktur Folder Proyek

```text
museum-batak/
├── assets/
│   ├── hotspot-images/       # Gambar pendukung modal pop-up Scene 2 (sigale-gale, tenun-ulos, gorga-detail)
│   ├── images/               # Gambar artefak & ornamen untuk eksibit dinding Scene 1 (Batak1.jpg - Batak4.jpg)
│   ├── models/               # Model 3D format GLTF/GLB (pakaian_adat_batak_cowok, cewek, rumahbolon)
│   ├── panorama/             # Gambar panoramic 360° equirectangular untuk Scene 2 (panorama-batak-1.png)
│   └── videos/               # File video dokumentasi MP4 untuk Scene 1 (videobatak1.mp4, videobatak2.mp4)
├── config.js                 # Data konfigurasi pameran (EXHIBITS_DATA) untuk Aula Utama
├── index.html                # Scene 1: Halaman utama Aula Museum 3D
├── main.js                   # Komponen A-Frame kustom, generator eksibit, & logika interaksi
├── Readme.md                 # Dokumentasi proyek
├── scene2.html               # Scene 2: Halaman Tur Panorama 360° & Hotspot Budaya
├── scene3-model.html         # Scene 3: Halaman Eksplorasi Model 3D Lumbung Padi
└── style.css                 # Stylesheet utama (UI overlay, glassmorphism, HUD, & crosshair)
```

---

## 💻 Cara Menjalankan Secara Lokal

Proyek ini dibuat menggunakan **HTML, CSS, dan JavaScript statis** tanpa *build tool* (seperti Vite, Webpack, atau npm). Namun, karena peramban menerapkan kebijakan keamanan CORS untuk pemuatan model 3D (GLTF/GLB), gambar panorama, dan video, proyek ini **harus dijalankan menggunakan server web statis**.

### Langkah-langkah:
1. **Clone Repositori:**
   ```bash
   git clone https://github.com/AbramSin17/museum-batak.git
   cd museum-batak
   ```

2. **Jalankan via Local Web Server:**
   - **Pilihan A — VS Code Live Server (Direkomendasikan):**
     1. Buka folder `museum-batak` di Visual Studio Code.
     2. Pastikan ekstensi **Live Server** sudah terpasang.
     3. Klik kanan pada file `index.html`, lalu pilih **Open with Live Server**.
   - **Pilihan B — Python HTTP Server:**
     ```bash
     python -m http.server 8000
     ```
     Buka peramban dan akses `http://localhost:8000`.
   - **Pilihan C — Node.js `npx serve`:**
     ```bash
     npx serve .
     ```

---

## 📜 Kredit & Atribusi Aset

Aplikasi ini memanfaatkan beberapa aset pihak ketiga untuk kebutuhan edukasi dan simulasi museum 3D:
- **Model 3D (GLTF/GLB):**
  - *Rumah Bolon / Lumbung Padi Batak* (`rumahbolon.glb`) — Aset 3D Budaya Batak (Lisensi CC-BY).
  - *Pakaian Adat Batak Pria & Wanita* (`pakaian_adat_batak_cowok.glb`, `pakaian_adat_batak_toba_cewek.glb`) — Aset 3D Pakaian Tradisional (Lisensi CC-BY).
- **Gambar & Media:**
  - Dokumentasi kain Ulos, patung Sigale-gale, perhiasan Sortali, dan seni ukir Gorga Batak Toba.
  - Gambar panoramic 360° lingkungan kebudayaan Batak.

---

## 👤 Kontributor

- **Abram ([AbramSin17](https://github.com/AbramSin17))** — Pengembang Utama

> Proyek ini dikembangkan sebagai proyek pembelajaran mandiri dalam pengembangan web 3D interaktif, eksplorasi teknologi WebXR, dan pelestarian warisan budaya digital Indonesia.