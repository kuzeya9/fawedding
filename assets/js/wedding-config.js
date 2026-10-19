/**
 * Fawedding Configuration
 * Template: Garden Watercolor (our-wedding.link style)
 * Data disinkronkan langsung dengan Surat Undangan Fisik Resmi.
 */

window.WEDDING_CONFIG = {
  // Judul & Panggilan Utama Pasangan (sesuai kaligrafi cover fisik)
  couple: {
    title: "Dilah & Fadil",
    shortBride: "Dilah",
    shortGroom: "Fadil"
  },

  // Informasi Mempelai Wanita
  bride: {
    fullName: "Siti Padilah",
    shortName: "Dilah",
    daughterOf: "Putri pertama dari",
    father: "Bapak Japar",
    mother: "Ibu Herlina",
    origin: "Ciomas, Bogor",
    avatar: "./assets/images/bride_avatar.jpg",
    bio: "Putri pertama yang penuh kehangatan, keanggunan, serta berbakti kepada kedua orang tua dan keluarga."
  },

  // Informasi Mempelai Pria
  groom: {
    fullName: "Fadilah",
    shortName: "Fadil",
    sonOf: "Putra ke-4 dari",
    father: "Bapak H. Otong (Alm)",
    mother: "Ibu Neneng Khodijah (Almh)",
    origin: "Bogor",
    avatar: "./assets/images/groom_avatar.jpg",
    bio: "Pria yang gigih, berhati tulus, dan senantiasa berikhtiar mencari ridho Allah dalam membina keluarga sakinah."
  },

  // Foto Utama & Galeri
  photos: {
    cover: "./assets/images/couple_hero.jpg",
    story: "./assets/images/couple_story.jpg",
    groom: "./assets/images/groom_avatar.jpg",
    bride: "./assets/images/bride_avatar.jpg",
    gallery: [
      "./assets/images/couple_hero.jpg",
      "./assets/images/couple_story.jpg",
      "./assets/images/bride_avatar.jpg",
      "./assets/images/groom_avatar.jpg"
    ]
  },

  // Kutipan Suci / Ayat Pernikahan (QS. Ar-Rum: 21)
  quote: {
    surah: "Surat Ar-Ruum : 21",
    arabic: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
    translation: "Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu cenderung dan merasa tentram kepadanya dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu menjadi tanda-tanda bagi kaum yang berfikir."
  },

  // Rangkaian Acara (Minggu, 1 November 2026)
  events: {
    countdownTarget: "2026-11-01T09:00:00",
    
    akad: {
      title: "Akad Pernikahan",
      day: "Minggu",
      date: "1 November 2026",
      time: "09.00 WIB",
      venueName: "Kediaman Mempelai Wanita",
      address: "Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",
      mapsUrl: "https://maps.app.goo.gl/zZxQb4jtHbRUW8Xa9",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Pernikahan+Dilah+%26+Fadil&dates=20261101T020000Z/20261101T040000Z&details=Akad+Pernikahan+Dilah+%26+Fadil&location=Kp.+Cipayung+Rt+02+05+Desa+Sukaharja+Ciomas+Bogor"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      day: "Minggu",
      date: "1 November 2026",
      time: "10.00 WIB - Selesai",
      venueName: "Kediaman Mempelai Wanita",
      address: "Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",
      mapsUrl: "https://maps.app.goo.gl/zZxQb4jtHbRUW8Xa9",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Dilah+%26+Fadil&dates=20261101T030000Z/20261101T090000Z&details=Resepsi+Pernikahan+Dilah+%26+Fadil&location=Kp.+Cipayung+Rt+02+05+Desa+Sukaharja+Ciomas+Bogor"
    }
  },

  // Keluarga yang Berbahagia
  families: {
    bride: "Kel. Bapak Japar & Ibu Herlina",
    groom: "Kel. Bapak H. Otong (Alm) & Ibu Neneng Khodijah (Almh)"
  },

  // Daftar Turut Mengundang (Sesuai Surat Undangan Fisik)
  turutMengundang: [
    "KH. Ali Dimyati",
    "Ustadz Abdul Fatah",
    "Ustadz Ansori",
    "Bpk. Rahmat Jebeng (Kades Sukaharja)",
    "Bpk. Sulaiman (Ket. Rt 02)",
    "Bpk. Iwan Tarmidzi (Ket. RW 05)",
    "Kel. Besar Alm Abah H. Asrin",
    "Kel. Besar Alm Abah Sain",
    "Kel. Besar Bani Sahari",
    "Kel. Besar Alm Bapak Enjam",
    "Kiyai Ahmad Hidayatullah (Pimpinan Pondok Pesantren Nurul Kamilah)",
    "Ustadz Memed Kosasih (Pimpinan Paud Qur'an Al-Mutadiin)",
    "Grup Manakib D'kopian",
    "Pahri (Adinda)",
    "Segenap Pemuda/i Cipayung",
    "Kel. Besar (Alm) Abah H. Tabroni",
    "Kel. Besar (Alm) Abah H. Rais",
    "Akang Cece Bustomi (Pimpinan Ponpes Al-Adjrumi)",
    "Kel. Besar Ponpes Al-Adjrumi",
    "PT. Bestari Property"
  ],

  // Kisah Cinta / Love Story
  stories: [
    {
      year: "2022",
      title: "Awal Pertemuan",
      desc: "Pertama kali dipertemukan dalam suasana silaturahmi penuh keakraban. Dari perbincangan sederhana tumbuh keserasian hati dan rasa saling mengagumi."
    },
    {
      year: "2024",
      title: "Menata Niat & Ta'aruf",
      desc: "Dengan bimbingan keluarga dan ikhtiar yang tulus, kami melangkah melalui proses ta'aruf untuk menyatukan visi dan komitmen dalam bingkai ketaatan kepada Sang Pencipta."
    },
    {
      year: "2026",
      title: "Menuju Hari Bahagia",
      desc: "Alhamdulillah, ikrar suci lamaran telah terucap dengan restu kedua orang tua. Kini kami siap melangkah bersama menapaki lembaran baru kehidupan dalam ikatan pernikahan yang berkah."
    }
  ],

  // Hadiah & Tanda Kasih Digital (Angpao)
  gifts: {
    bankAccounts: [
      {
        bankName: "Bank Syariah Indonesia",
        shortName: "BSI",
        accountNumber: "7182747267",
        holderName: "FADILAH",
        logo: "./assets/images/logo-bsi.png",
        badge: "Mempelai Pria"
      },
      {
        bankName: "DANA",
        shortName: "DANA",
        accountNumber: "085811589346",
        displayNumber: "+62 858-1158-9346",
        holderName: "Siti Padilah",
        logo: "./assets/images/logo-dana.png",
        badge: "Mempelai Wanita"
      }
    ],
    physicalGift: {
      recipient: "Dilah & Fadil",
      phone: "+62 858-1158-9346",
      address: "Kediaman Mempelai Wanita, Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor"
    }
  },

  // Audio Musik Latar
  music: {
    src: "./assets/audio/wedding_bgm.mp3",
    title: "Wedding Nasheed - Muhammad Al Muqit",
    autoplayOnOpen: true
  }
};
