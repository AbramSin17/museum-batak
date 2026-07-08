// Museum Pusaka Batak - Exhibits Configuration Data
// This file drives the dynamic generation of exhibits in the 3D Grand Hall

const EXHIBITS_DATA = [
  {
    id: "img-batak-1",
    type: "image",
    src: "assets/images/Batak1.jpg",
    title: "Upacara Adat Batak Toba",
    description: "Upacara spiritual adat Batak Toba yang khidmat dengan balutan Ulos khas.",
    position: { x: -4.9, y: 2.0, z: -12 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "vid-batak-1",
    type: "video",
    src: "assets/videos/videobatak1.mp4",
    title: "Tari Tortor Tradisional",
    description: "Tari seremonial sakral Batak Toba untuk menghormati leluhur dan menyampaikan doa. Klik untuk Play/Pause.",
    position: { x: 4.9, y: 2.0, z: -9 },
    rotation: { x: 0, y: -90, z: 0 }
  },
  {
    id: "img-batak-2",
    type: "image",
    src: "assets/images/Batak2.jpg",
    title: "Gondang Sabangunan",
    description: "Ansambel musik perkusi tradisional Batak yang sakral dan ikonik.",
    position: { x: -4.9, y: 2.0, z: -6 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "model-pria",
    type: "model",
    src: "assets/models/pakaian_adat_batak_cowok.glb",
    title: "Pakaian Adat Batak - Pria",
    description: "Busana pengantin laki-laki Batak Toba dengan ikat kepala Sortali dan tenun Ulos Ragi Hotang.",
    position: { x: 3.8, y: 0, z: -3 }, // Right side
    rotation: { x: 0, y: -90, z: 0 },
    scale: { x: 0.010, y: 0.010, z: 0.010 }
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
    title: "Pakaian Adat Batak - Wanita",
    description: "Pakaian tradisional wanita Batak Toba lengkap dengan ikat kepala Sortali dan selendang Ulos.",
    position: { x: 3.8, y: 0, z: 3 }, // Right side
    rotation: { x: 0, y: -90, z: 0 },
    scale: { x: 0.010, y: 0.010, z: 0.010 }
  },
  {
    id: "img-batak-3",
    type: "image",
    src: "assets/images/Batak3.jpg",
    title: "Tenunan Ulos Sadum",
    description: "Ulos berwarna cerah melambangkan kegembiraan, digunakan pada pesta adat riang.",
    position: { x: -4.9, y: 2.0, z: 6 },
    rotation: { x: 0, y: 90, z: 0 }
  },
  {
    id: "vid-batak-2",
    type: "video",
    src: "assets/videos/videobatak2.mp4",
    title: "Instrumen Kecapi Batak",
    description: "Lagu petikan tradisional Batak menggunakan alat musik dawai Kecapi. Klik untuk Play/Pause.",
    position: { x: 4.9, y: 2.0, z: 9 },
    rotation: { x: 0, y: -90, z: 0 }
  },
  {
    id: "img-batak-4",
    type: "image",
    src: "assets/images/Batak4.jpg",
    title: "Seni Ukiran Gorga",
    description: "Ornamen ukiran khas rumah adat Batak bernuansa merah, hitam, dan kuning/putih.",
    position: { x: -4.9, y: 2.0, z: 12 },
    rotation: { x: 0, y: 90, z: 0 }
  }
];
