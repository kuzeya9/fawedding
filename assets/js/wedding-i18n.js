/**
 * Fawedding Internationalization (i18n) Module
 * Supports: Indonesian (ID - Default) and Japanese (JP - 日本語)
 */

(function(window, document, $) {
  'use strict';

  const TURUT_ITEMS_ID = [
    "KH. Ali Dimyati",
    "Ustadz Abdul Fatah",
    "Ustadz Ansori",
    "Bpk. Rahmat Jebeng <small class=\"text-muted\">(Kades Sukaharja)</small>",
    "Bpk. Sulaiman <small class=\"text-muted\">(Ket. Rt 02)</small>",
    "Bpk. Iwan Tarmidzi <small class=\"text-muted\">(Ket. RW 05)</small>",
    "Kel. Besar Alm Abah H. Asrin",
    "Kel. Besar Alm Abah Sain",
    "Kel. Besar Bani Sahari",
    "Kel. Besar Alm Bapak Enjam",
    "Kiyai Ahmad Hidayatullah <small class=\"text-muted\">(Pimpinan Ponpes Nurul Kamilah)</small>",
    "Ustadz Memed Kosasih <small class=\"text-muted\">(Pimpinan Paud Qur'an Al-Mutadiin)</small>",
    "Grup Manakib D'kopian",
    "Pahri <small class=\"text-muted\">(Adinda)</small>",
    "Segenap Pemuda/i Cipayung",
    "Kel. Besar (Alm) Abah H. Tabroni",
    "Kel. Besar (Alm) Abah H. Rais",
    "Akang Cece Bustomi <small class=\"text-muted\">(Pimpinan Ponpes Al-Adjrumi)</small>",
    "Kel. Besar Ponpes Al-Adjrumi",
    "<strong>PT. Bestari Property</strong>"
  ];

  const TURUT_ITEMS_JP = [
    "KH. アリ・ディムヤティ（KH. Ali Dimyati）",
    "ウスタッド・アブドゥル・ファタハ（Ustadz Abdul Fatah）",
    "ウスタッド・アンソリ（Ustadz Ansori）",
    "ラフマット・ジェベン様 <small class=\"text-muted\">（スカハルジャ村長）</small>",
    "スライマン様 <small class=\"text-muted\">（RT 02地区長）</small>",
    "イワン・タルミジ様 <small class=\"text-muted\">（RW 05区長）</small>",
    "故アスリン家 ご親族一同",
    "故サイン家 ご親族一同",
    "バニ・サハリ家 ご親族一同",
    "故エンジャム家 ご親族一同",
    "アフマド・ヒダヤトゥッラー師 <small class=\"text-muted\">（ヌルル・カミラ寄宿塾 院長）</small>",
    "メメッド・コサシ師 <small class=\"text-muted\">（アル・ムタディイン幼児教育代表）</small>",
    "マナキブ D'kopian 会員一同",
    "パフリ <small class=\"text-muted\">（新婦 弟）</small>",
    "チパユン青年団 一同",
    "故タブロニ家 ご親族一同",
    "故ライス家 ご親族一同",
    "チェチェ・ブストミ師 <small class=\"text-muted\">（アル・アジュルミ寄宿塾 院長）</small>",
    "アル・アジュルミ寄宿塾 一同",
    "<strong>PT. ベスタリ・プロパティ（PT. Bestari Property）</strong>"
  ];

  const TRANSLATIONS = {
    id: {
      document_title: "The Wedding of Dilah & Fadil - Undangan Pernikahan",
      
      nav_home: "Beranda",
      nav_couple: "Mempelai",
      nav_events: "Acara",
      nav_gift: "Hadiah",
      nav_wishes: "Ucapan",
      nav_family: "Keluarga",

      cover_subtitle: "The Wedding Of",
      cover_date: "Minggu, 1 November 2026",
      cover_salutation: "Kepada Yth. Bapak/Ibu/Saudara/i:",
      cover_default_guest: "Bapak / Ibu / Saudara/i",
      cover_disclaimer: "*Mohon maaf apabila ada kesalahan dalam penulisan nama &amp; gelar",
      cover_btn: "Buka Undangan",

      sidebar_subtitle: "Undangan Pernikahan",
      hero_salutation: "Undangan Khusus Untuk:",
      hero_date_venue: "Minggu, 1 November 2026 &bull; Ciomas, Bogor",

      quote_text: "\"Dan di antara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu cenderung dan merasa tentram kepadanya dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu menjadi tanda-tanda bagi kaum yang berfikir.\"",
      quote_surah: "(Surat Ar-Ruum : 21)",

      couple_script: "Pengantin",
      couple_heading: "Mempelai Bahagia",
      couple_subtitle: "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:",
      
      bride_name: "Siti Padilah",
      bride_parents: "Putri pertama dari pasangan<br><strong>Bapak Japar</strong> &amp; <strong>Ibu Herlina</strong><br><small class=\"text-muted\">Ciomas, Bogor</small>",
      
      groom_name: "Fadilah",
      groom_parents: "Putra ke-4 dari pasangan<br><strong>Bapak H. Otong (Alm)</strong> &amp; <strong>Ibu Neneng Khodijah (Almh)</strong><br><small class=\"text-muted\">Bogor</small>",

      events_script: "Hari Bahagia",
      events_heading: "Rangkaian Acara",
      events_subtitle: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan Akad dan Resepsi Pernikahan kami pada:",
      
      cd_days: "Hari",
      cd_hours: "Jam",
      cd_mins: "Menit",
      cd_secs: "Detik",

      akad_title: "Akad Pernikahan",
      akad_date: "Minggu, 1 November 2026",
      akad_time: "09.00 WIB",
      akad_venue: "Kediaman Mempelai Wanita",
      akad_address: "Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",

      resepsi_title: "Resepsi Pernikahan",
      resepsi_date: "Minggu, 1 November 2026",
      resepsi_time: "10.00 WIB - Selesai",
      resepsi_venue: "Kediaman Mempelai Wanita",
      resepsi_address: "Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",

      btn_maps: "Buka Google Maps",
      btn_calendar: "Simpan Kalender",

      gift_script: "Tanda Kasih",
      gift_heading: "Kado &amp; Amplop Digital",
      gift_subtitle: "Doa restu Anda merupakan karunia terindah bagi kami. Namun bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:",
      
      gift_groom_badge: "Mempelai Pria",
      gift_groom_label: "Nomor Rekening (BSI):",
      gift_groom_holder: "a.n. <strong class=\"text-dark\">FADILAH</strong>",
      btn_copy_rekening: "Salin Nomor Rekening",

      gift_bride_badge: "Mempelai Wanita",
      gift_bride_label: "Nomor DANA / E-Wallet:",
      gift_bride_holder: "a.n. <strong class=\"text-dark\">Siti Padilah</strong>",
      btn_copy_dana: "Salin Nomor DANA",

      gift_physical_badge: "Kirim Kado Fisik",
      gift_physical_recipient: "Penerima: <strong>Dilah &amp; Fadil (+62 858-1158-9346)</strong>",
      gift_physical_address: "Kediaman Mempelai Wanita, Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",
      btn_copy_address: "Salin Alamat Pengiriman",

      rsvp_script: "Konfirmasi &amp; Doa",
      rsvp_heading: "Buku Tamu &amp; RSVP",
      rsvp_subtitle: "Kehadiran dan doa restu Anda merupakan kehormatan serta kebahagiaan yang tak terhingga bagi kami sekeluarga:",

      rsvp_card_title: "Konfirmasi Kehadiran (RSVP)",
      rsvp_name_label: "Nama Tamu Undangan",
      rsvp_name_placeholder: "Nama Anda",
      rsvp_presence_label: "Konfirmasi Kehadiran",
      rsvp_opt_hadir: "Hadir",
      rsvp_opt_ragu: "Ragu-ragu",
      rsvp_opt_tidak: "Tidak Hadir",
      rsvp_count_label: "Jumlah Tamu yang Hadir",
      rsvp_count_1: "1 Orang",
      rsvp_count_2: "2 Orang",
      rsvp_count_3: "3 Orang",
      rsvp_count_4: "4 Orang",
      btn_rsvp_submit: "Konfirmasi Sekarang",

      rsvp_success_title: "Konfirmasi Kehadiran Berhasil",

      wishes_card_title: "Kirim Ucapan &amp; Doa Restu",
      wish_name_label: "Nama Pengirim",
      wish_name_placeholder: "Nama Anda",
      wish_presence_label: "Konfirmasi Kehadiran",
      wish_msg_label: "Ucapan &amp; Doa",
      wish_msg_placeholder: "Tuliskan ucapan selamat &amp; doa restu untuk kedua mempelai...",
      btn_wish_submit: "Kirim Ucapan",

      turut_script: "Segenap Keluarga",
      turut_heading: "Turut Mengundang",
      turut_subtitle: "Ungkapan rasa hormat dan terima kasih yang tulus kepada segenap keluarga besar, alim ulama, tokoh masyarakat, dan handai taulan:",
      btn_turut_more: "Lihat Selengkapnya",
      btn_turut_less: "Sembunyikan",

      footer_text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
      footer_copy: "&copy; 2026 Fawedding. All Rights Reserved.",

      toast_link_copied: "Link undangan berhasil disalin!",
      toast_jp_link_copied: "Link undangan versi Bahasa Jepang berhasil disalin!",
      toast_rekening_copied: "Nomor rekening berhasil disalin!",
      toast_dana_copied: "Nomor DANA berhasil disalin!",
      toast_address_copied: "Alamat pengiriman kado berhasil disalin!",
      toast_wish_sent: "Terima kasih atas doa dan ucapan hangat Anda!",
      toast_lang_changed: "Bahasa diubah ke Bahasa Indonesia"
    },

    jp: {
      document_title: "ディラ＆ファディル 結婚式のご案内 - The Wedding of Dilah & Fadil",
      
      nav_home: "ホーム",
      nav_couple: "新郎新婦",
      nav_events: "式次第",
      nav_gift: "お祝い",
      nav_wishes: "芳名帳",
      nav_family: "親族紹介",

      cover_subtitle: "The Wedding Of",
      cover_date: "2026年11月1日（日曜日）",
      cover_salutation: "ご招待者様：",
      cover_default_guest: "ご来賓の皆様",
      cover_disclaimer: "※お名前や敬称に誤りがございましたら、謹んでお詫び申し上げます。",
      cover_btn: "招待状を開く",

      sidebar_subtitle: "結婚披露宴のご案内",
      hero_salutation: "特別ご招待状：",
      hero_date_venue: "2026年11月1日（日） &bull; 西ジャワ州 ボゴール",

      quote_text: "「また、彼があなたがた自身からあなたがたのために配偶者を創られ、あなたがたがそれに安らぎを見出すようにされ、あなたがたの間に愛と慈しみを授けられたことも、彼の御しるしの一つである。まことにこの中には、深く考える民への教訓がある。」",
      quote_surah: "（聖クルアーン ルーム章 21節）",

      couple_script: "新郎新婦",
      couple_heading: "幸せなふたり",
      couple_subtitle: "アッラーの慈悲と祝福を賜り、ここに新郎新婦の門出を祝う結婚の儀を執り行います：",
      
      bride_name: "シティ・パディラ（Siti Padilah）",
      bride_parents: "長女<br><strong>ジャパル（Japar）様</strong> ＆ <strong>ヘルリナ（Herlina）様</strong> の令嬢<br><small class=\"text-muted\">西ジャワ州 ボゴール・チオマス</small>",
      
      groom_name: "ファディラ（Fadilah）",
      groom_parents: "四男<br>故 <strong>オトン（H. Otong）様</strong> ＆ 故 <strong>ネネン・コディジャ（Neneng Khodijah）様</strong> の子息<br><small class=\"text-muted\">西ジャワ州 ボゴール</small>",

      events_script: "祝福の日",
      events_heading: "結婚式次第",
      events_subtitle: "謹んで皆様のご臨席を賜りたく、挙式および結婚披露宴を下記の通り執り行います：",
      
      cd_days: "日",
      cd_hours: "時間",
      cd_mins: "分",
      cd_secs: "秒",

      akad_title: "挙式の儀（アカッド・ニカー）",
      akad_date: "2026年11月1日（日曜日）",
      akad_time: "午前09:00 WIB（インドネシア西部時間）",
      akad_venue: "新婦実家（ボゴール）",
      akad_address: "Kp. Cipayung Rt 02 / 05 Desa Sukaharja, Kec. Ciomas, Bogor",

      resepsi_title: "結婚披露宴（レセプション）",
      resepsi_date: "2026年11月1日（日曜日）",
      resepsi_time: "午前10:00 WIB 〜 終了まで",
      resepsi_venue: "新婦実家（ボゴール）",
      resepsi_address: "Kp. Cipayung Rt 02 / 05 Desa Sukaharja, Kec. Ciomas, Bogor",

      btn_maps: "Googleマップを開く",
      btn_calendar: "カレンダーに保存",

      gift_script: "御祝儀・御祝金",
      gift_heading: "お祝い・デジタル祝儀",
      gift_subtitle: "皆様の温かいお祝いのお気持ちこそが、私たちにとって何よりの宝物です。遠方等の理由によりデジタル送金でお祝いをお贈りいただく場合は、下記口座をご利用いただけます：",
      
      gift_groom_badge: "新郎口座",
      gift_groom_label: "BSI銀行 口座番号：",
      gift_groom_holder: "口座名義：<strong class=\"text-dark\">ファディラ（FADILAH）</strong>",
      btn_copy_rekening: "口座番号をコピー",

      gift_bride_badge: "新婦電子マネー",
      gift_bride_label: "DANA電子マネー番号：",
      gift_bride_holder: "名義：<strong class=\"text-dark\">シティ・パディラ（Siti Padilah）</strong>",
      btn_copy_dana: "DANA番号をコピー",

      gift_physical_badge: "お祝いの品（配送先）",
      gift_physical_recipient: "受取人：<strong>ディラ＆ファディル（+62 858-1158-9346）</strong>",
      gift_physical_address: "Kediaman Mempelai Wanita, Kp. Cipayung Rt 02 / 05 Desa. Sukaharja, Kec. Ciomas Bogor",
      btn_copy_address: "配送先住所をコピー",

      rsvp_script: "ご出欠・お祝い",
      rsvp_heading: "芳名帳 ＆ ご出欠確認（RSVP）",
      rsvp_subtitle: "皆様とお祝いのひとときを共に過ごせますことを、心より楽しみにしております。お手数ながら出欠をお知らせください：",

      rsvp_card_title: "ご出欠のお返事（RSVP）",
      rsvp_name_label: "お名前（ご芳名）",
      rsvp_name_placeholder: "お名前をご入力ください",
      rsvp_presence_label: "ご出欠",
      rsvp_opt_hadir: "ご出席",
      rsvp_opt_ragu: "未定",
      rsvp_opt_tidak: "ご欠席",
      rsvp_count_label: "ご出席人数",
      rsvp_count_1: "1名様",
      rsvp_count_2: "2名様",
      rsvp_count_3: "3名様",
      rsvp_count_4: "4名様",
      btn_rsvp_submit: "出欠を送信する",

      rsvp_success_title: "出欠の送信が完了しました",

      wishes_card_title: "お祝いメッセージを送る",
      wish_name_label: "お名前",
      wish_name_placeholder: "お名前をご入力ください",
      wish_presence_label: "ご出欠",
      wish_msg_label: "お祝いのメッセージ",
      wish_msg_placeholder: "新郎新婦へのお祝いメッセージをご自由にお書きください...",
      btn_wish_submit: "メッセージを送信",

      turut_script: "親族・関係者一同",
      turut_heading: "ご案内申し上げます（親族・関係者）",
      turut_subtitle: "平素より温かいご厚情を賜っておりますご親族・地域の皆様より、心よりお慶びを申し上げます：",
      btn_turut_more: "すべて表示する",
      btn_turut_less: "閉じる",

      footer_text: "皆様の温かいお力添えに心より感謝申し上げます。新しく歩み始めるふたりを、どうぞ温かくお見守りください。",
      footer_copy: "&copy; 2026 Fawedding. All Rights Reserved.",

      toast_link_copied: "招待リンクがコピーされました！",
      toast_jp_link_copied: "日本語版の招待リンクがコピーされました！",
      toast_rekening_copied: "銀行口座番号がコピーされました！",
      toast_dana_copied: "DANA番号がコピーされました！",
      toast_address_copied: "配送先住所がコピーされました！",
      toast_wish_sent: "温かいお祝いメッセージをありがとうございました！",
      toast_lang_changed: "言語を日本語に切り替えました"
    }
  };

  const FaweddingI18n = {
    currentLang: 'id',

    init: function() {
      // 1. Detect language from URL (?lang=jp, ?lang=ja, ?lang=id)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = (urlParams.get('lang') || '').toLowerCase();
      
      let initialLang = 'id';
      if (urlLang === 'jp' || urlLang === 'ja') {
        initialLang = 'jp';
      } else if (urlLang === 'id') {
        initialLang = 'id';
      } else {
        // Fallback to localStorage if previously switched, default 'id'
        const savedLang = localStorage.getItem('fawedding_lang');
        if (savedLang === 'jp') {
          initialLang = 'jp';
        }
      }

      this.setLanguage(initialLang, false);
      this.bindEvents();
    },

    getTranslation: function(key, lang) {
      const l = lang || this.currentLang;
      return (TRANSLATIONS[l] && TRANSLATIONS[l][key]) || (TRANSLATIONS.id && TRANSLATIONS.id[key]) || key;
    },

    setLanguage: function(lang, updateUrl = true, forcePlay = false) {
      if (lang !== 'id' && lang !== 'jp') lang = 'id';
      this.currentLang = lang;
      
      // Update <html> lang attribute and body class
      document.documentElement.lang = lang === 'jp' ? 'ja' : 'id';
      $('body').toggleClass('lang-jp', lang === 'jp');
      $('body').toggleClass('lang-id', lang === 'id');

      // Update switcher buttons UI
      $('.lang-opt-btn').removeClass('active');
      $(`.lang-opt-btn[data-lang="${lang}"]`).addClass('active');

      // Translate all DOM elements marked with data-i18n
      const dict = TRANSLATIONS[lang];
      $('[data-i18n]').each(function() {
        const key = $(this).attr('data-i18n');
        if (dict && dict[key] !== undefined) {
          $(this).html(dict[key]);
        }
      });

      // Translate attributes (placeholder, title, alt)
      $('[data-i18n-placeholder]').each(function() {
        const key = $(this).attr('data-i18n-placeholder');
        if (dict && dict[key] !== undefined) {
          $(this).attr('placeholder', dict[key]);
        }
      });

      $('[data-i18n-title]').each(function() {
        const key = $(this).attr('data-i18n-title');
        if (dict && dict[key] !== undefined) {
          $(this).attr('title', dict[key]);
        }
      });

      // Translate Turut Mengundang list items
      const turutItems = lang === 'jp' ? TURUT_ITEMS_JP : TURUT_ITEMS_ID;
      $('.turut-mengundang-list .turut-item').each(function(index) {
        if (turutItems[index]) {
          $(this).find('span:last-child').html(turutItems[index]);
        }
      });

      // Update Guest Fallback text if no URL guest name is present
      const urlParams = new URLSearchParams(window.location.search);
      const guestFromUrl = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');
      if (!guestFromUrl) {
        const defaultGuest = dict.cover_default_guest;
        $('#cover-guest-name').text(defaultGuest);
        $('#hero-guest-name').text(defaultGuest);
        $('#mobile-hero-guest-name').text(defaultGuest);
      } else {
        // If guest has name and lang is JP, we can append 様 if desired
        const cleanName = decodeURIComponent(guestFromUrl.replace(/\+/g, ' ')).trim();
        if (lang === 'jp') {
          const jpDisplayName = cleanName.endsWith('様') || cleanName.toLowerCase().endsWith('senpai') ? cleanName : `${cleanName} 様`;
          $('#cover-guest-name').text(jpDisplayName);
          $('#hero-guest-name').text(jpDisplayName);
          $('#mobile-hero-guest-name').text(jpDisplayName);
        } else {
          $('#cover-guest-name').text(cleanName);
          $('#hero-guest-name').text(cleanName);
          $('#mobile-hero-guest-name').text(cleanName);
        }
      }

      // Save preference
      try {
        localStorage.setItem('fawedding_lang', lang);
      } catch(e) {}

      // Update URL query parameter without page reload
      if (updateUrl && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        if (lang === 'jp') {
          url.searchParams.set('lang', 'jp');
        } else {
          url.searchParams.delete('lang');
        }
        window.history.replaceState(null, '', url.toString());
      }

      // Dispatch event to switch Audio Track to match selected language (ID or JP)
      window.dispatchEvent(new CustomEvent('wedding:langchange', { detail: { lang, forcePlay } }));
    },

    getShareUrl: function(targetLang) {
      const l = targetLang || this.currentLang;
      const url = new URL(window.location.href);
      if (l === 'jp') {
        url.searchParams.set('lang', 'jp');
      } else {
        url.searchParams.delete('lang');
      }
      return url.toString();
    },

    copyShareUrl: function(targetLang) {
      const l = targetLang || this.currentLang;
      const url = this.getShareUrl(l);
      const msg = l === 'jp' ? TRANSLATIONS.jp.toast_jp_link_copied : TRANSLATIONS.id.toast_link_copied;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          if (window.iziToast) {
            iziToast.success({
              title: l === 'jp' ? 'コピー完了' : 'Tersalin',
              message: msg,
              position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
            });
          } else {
            alert(msg);
          }
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (window.iziToast) {
          iziToast.success({
            title: l === 'jp' ? 'コピー完了' : 'Tersalin',
            message: msg,
            position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
          });
        }
      }
    },

    bindEvents: function() {
      const self = this;

      // Switcher Button click
      $(document).on('click', '.lang-opt-btn', function(e) {
        e.preventDefault();
        const selectedLang = $(this).data('lang');
        if (selectedLang !== self.currentLang) {
          self.setLanguage(selectedLang, true, true);
          if (window.iziToast) {
            iziToast.info({
              title: selectedLang === 'jp' ? '言語切り替え' : 'Bahasa Diubah',
              message: TRANSLATIONS[selectedLang].toast_lang_changed,
              position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
            });
          }
        }
      });

      // Copy Language Link Button click
      $(document).on('click', '#btn-copy-lang-url', function(e) {
        e.preventDefault();
        self.copyShareUrl(self.currentLang);
      });
    }
  };

  window.FaweddingI18n = FaweddingI18n;

  $(document).ready(function() {
    FaweddingI18n.init();
  });

})(window, document, jQuery);
