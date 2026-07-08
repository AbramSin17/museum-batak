// Museum Pusaka Batak - Exhibits Configuration Data
// This file drives the dynamic generation of exhibits in the 3D Grand Hall

const EXHIBITS_DATA = [
  {
    id: "img-batak-1",
    type: "image",
    src: "assets/images/Batak1.jpg",
    title: "Ragam Motif Ukiran Gorga",
    description: "Kumpulan pola geometri dan ragam hias motif Gorga Batak yang masing-masing menyimpan makna filosofis serta nilai spiritual mendalam.",
    position: { x: -4.9, y: 2.0, z: -9 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "vid-batak-1",
    type: "video",
    src: "assets/videos/videobatak1.mp4",
    title: "Ulos: Simbol Doa, Hangat, dan Restu",
    description: "Lebih dari sekadar pakaian, Ulos adalah manifestasi restu, doa, dan perlindungan spiritual. Ulos hadir dalam setiap siklus penting kehidupan orang Batak—mulai dari kelahiran (Ulos Mangiring), pernikahan, hingga upacara kematian.",
    position: { x: 4.9, y: 2.0, z: -7.5 },
    rotation: { x: 0, y: -90, z: 0 }
  },
  {
    id: "img-batak-2",
    type: "image",
    src: "assets/images/Batak2.jpg",
    title: "Busana dan Kesenian Tradisional Batak",
    description: "Ilustrasi pakaian adat (Ulos), gerakan tari Tortor, serta kelengkapan alat musik tradisional yang digunakan dalam upacara adat Batak.",
    position: { x: -4.9, y: 2.0, z: -6 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "model-pria",
    type: "model",
    src: "assets/models/pakaian_adat_batak_cowok.glb",
    title: "Pakaian Adat Pria",
    description: "Busana pengantin laki-laki Batak Toba dengan ikat kepala Sortali dan tenun Ulos Ragi Hotang.",
    position: { x: 3.8, y: 0, z: -3 }, // Right side
    rotation: { x: 0, y: -90, z: 0 },
    scale: { x: 0.015, y: 0.015, z: 0.015 }
  },
  {
    id: "model-rumah",
    type: "model",
    src: "assets/models/rumahbolon.glb",
    title: "Miniatur Rumah Bolon",
    description: "Rumah adat besar tradisional suku Batak dengan atap melengkung khas mirip tanduk kerbau.",
    position: { x: -3.8, y: 0, z: 0 }, // Left side
    rotation: { x: 0, y: 90, z: 0 },
    scale: { x: 0.5, y: 0.5, z: 0.5 }
  },
  {
    id: "model-wanita",
    type: "model",
    src: "assets/models/pakaian_adat_batak_toba_cewek.glb",
    title: "Pakaian Adat Wanita",
    description: "Pakaian tradisional wanita Batak Toba lengkap dengan ikat kepala Sortali dan selendang Ulos.",
    position: { x: 3.8, y: 0, z: 3 }, // Right side
    rotation: { x: 0, y: -90, z: 0 },
    scale: { x: 0.015, y: 0.015, z: 0.015 }
  },
  {
    id: "img-batak-3",
    type: "image",
    src: "assets/images/Batak3.jpg",
    title: "Seni Ukir Gorga",
    description: "Ornamen ukiran khas pada dinding rumah adat Batak yang menggunakan kombinasi tiga warna tradisional (tiga bolit): merah, hitam, dan putih.",
    position: { x: -4.9, y: 2.0, z: 6 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "vid-batak-2",
    type: "video",
    src: "assets/videos/videobatak2.mp4",
    title: "Tunggal Panaluan: Tongkat Ritual Datu",
    description: "Tongkat sakral milik Datu (pemimpin spiritual Batak) yang diukir dari kayu pohon tertentu dengan motif figur manusia dan hewan yang saling bertumpuk. Tongkat ini dipercaya memiliki kekuatan supranatural untuk meminta hujan, menolak bala, dan menyembuhkan penyakit.",
    position: { x: 4.9, y: 2.0, z: 7.5 },
    rotation: { x: 0, y: -90, z: 0 }
  },
  {
    id: "img-batak-4",
    type: "image",
    src: "assets/images/Batak4.jpg",
    title: "Arsitektur & Rumah Adat Batak",
    description: "Ilustrasi ragam bentuk rumah tradisional dan simbol kebudayaan khas berbagai sub-etnis Batak di Sumatera Utara.",
    position: { x: -4.9, y: 2.0, z: 9 },
    rotation: { x: 0, y: 90, z: 0 }
  }
];
