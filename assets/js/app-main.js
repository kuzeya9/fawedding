/**
 * Fawedding Main Application Script
 * Handles Guest Personalization, Audio, Countdown, RSVP, Wishes, and Navigation.
 */

(function($) {
  'use strict';

  // 1. Parse Guest Name from URL (?to=... or pathname /...)
  function getGuestNameFromUrl() {
    // Check query params: ?to=Nama or ?u=Nama or ?nama=Nama
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to') || urlParams.get('u') || urlParams.get('nama');

    if (guestName) {
      return decodeURIComponent(guestName.replace(/\+/g, ' ')).trim();
    }

    // Check pathname: e.g. /Budi%20Santoso or /Prof.%20Dr.%20Bambang
    const path = window.location.pathname;
    const staticExtRegex = /\.(html|js|css|png|jpe?g|gif|svg|ico|webp|mp3|wav|ogg|woff2?|ttf|eot|json|map)$/i;
    if (
      path &&
      path !== '/' &&
      !path.startsWith('/admin') &&
      !staticExtRegex.test(path) &&
      !path.startsWith('/assets') &&
      !path.startsWith('/@') &&
      !path.startsWith('/node_modules')
    ) {
      const cleanPath = path.replace(/^\/+|\/+$/g, '');
      if (cleanPath) {
        return decodeURIComponent(cleanPath.replace(/\+/g, ' ')).trim();
      }
    }

    return null;
  }

  // 2. LocalStorage Keys
  const STORAGE_KEY_WISHES = 'fawedding_wishes_data';
  const STORAGE_KEY_RSVP = 'fawedding_rsvp_data';

  // Seed sample wishes if empty
  const defaultWishes = [
    {
      id: 'wish_1',
      name: 'Rian & Sarah',
      presence: 'Hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair. Selamat menempuh hidup baru untuk Dilah & Fadil! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai akhir hayat!',
      time: '1 jam yang lalu'
    },
    {
      id: 'wish_2',
      name: 'Budi Santoso',
      presence: 'Hadir',
      message: 'Selamat berbahagia Dilah dan Fadil! Semoga lancar dan berkah setiap langkah dalam membina rumah tangga.',
      time: '3 jam yang lalu'
    },
    {
      id: 'wish_3',
      name: 'Anisa & Dimas',
      presence: 'Tidak Hadir',
      message: 'Selamat ya Dilah dan Fadil! Mohon maaf kami berhalangan hadir langsung karena berada di luar kota, namun doa terbaik kami selalu menyertai kalian.',
      time: '6 jam yang lalu'
    },
    {
      id: 'wish_4',
      name: 'Keluarga Besar Alm. H. Sanusi',
      presence: 'Hadir',
      message: 'Selamat menempuh babak baru kehidupan untuk Dilah & Fadil. Semoga Allah senantiasa melimpahkan rezeki, kesehatan, dan keharmonisan.',
      time: '1 hari yang lalu'
    }
  ];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WISHES);
      if (data !== null) return JSON.parse(data);
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(defaultWishes));
      return defaultWishes;
    } catch(e) {}
    return defaultWishes;
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
      window.dispatchEvent(new Event('storage'));
    } catch(e) {}
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.toString().replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

  function renderWishesList(wishesData) {
    const $container = $('#wishes-list-container');
    if (!$container.length) return;

    const wishes = Array.isArray(wishesData) ? wishesData : getStoredWishes();
    $container.empty();

    wishes.forEach(w => {
      let badgeClass = 'bg-success';
      if (w.presence === 'Tidak Hadir') badgeClass = 'bg-danger';
      else if (w.presence === 'Ragu-ragu') badgeClass = 'bg-warning text-dark';

      const card = `
        <div class="wishes-card">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <strong class="text-dark">${escapeHtml(w.name)}</strong>
            <span class="badge ${badgeClass} text-white" style="font-size: 0.72rem;">${escapeHtml(w.presence || 'Hadir')}</span>
          </div>
          <p class="mb-1 text-secondary" style="font-size: 0.9rem; line-height: 1.5;">${escapeHtml(w.message)}</p>
          <small class="text-muted" style="font-size: 0.75rem;">${escapeHtml(w.time || 'Baru saja')}</small>
        </div>
      `;
      $container.append(card);
    });

    $('#wishes-count-badge').text(wishes.length);
  }

  // 3. Countdown Timer
  function initCountdown() {
    const targetStr = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.events && window.WEDDING_CONFIG.events.countdownTarget) || "2026-11-01T09:00:00";
    const targetDate = new Date(targetStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        $('#cd-days').text('00');
        $('#cd-hours').text('00');
        $('#cd-mins').text('00');
        $('#cd-secs').text('00');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      $('#cd-days').text(days < 10 ? '0' + days : days);
      $('#cd-hours').text(hours < 10 ? '0' + hours : hours);
      $('#cd-mins').text(mins < 10 ? '0' + mins : mins);
      $('#cd-secs').text(secs < 10 ? '0' + secs : secs);
    }, 1000);
  }

  // 4. Copy to Clipboard Utility
  function copyTextToClipboard(text, successMessage = 'Berhasil disalin!') {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.iziToast) {
          iziToast.success({
            title: 'Tersalin',
            message: successMessage,
            position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
          });
        } else {
          alert(successMessage);
        }
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (window.iziToast) {
        iziToast.success({
          title: 'Tersalin',
          message: successMessage,
          position: 'bottomRight'
        });
      }
    }
  }

  // 5. Document Ready Initialization
  $(document).ready(function() {
    const guestName = getGuestNameFromUrl();

    // Set guest name on cover screen & in hero (desktop & mobile)
    if (guestName) {
      $('#cover-guest-name').text(guestName);
      $('#hero-guest-name').text(guestName);
      $('#mobile-hero-guest-name').text(guestName);
      // Autofill guest name on send a wish form
      $('#wish-name').val(guestName);
      $('#rsvp-name').val(guestName);
    } else {
      $('#cover-guest-name').text('Bapak / Ibu / Saudara/i');
      $('#hero-guest-name').text('Bapak / Ibu / Saudara/i');
      $('#mobile-hero-guest-name').text('Bapak / Ibu / Saudara/i');
    }

    // Initialize Countdown & Real-time Wishes
    initCountdown();
    if (window.FaweddingDB) {
      window.FaweddingDB.subscribeWishes(function(wishes) {
        renderWishesList(wishes);
      });
    } else {
      renderWishesList();
    }

    // Audio setup
    const audio = document.getElementById('wedding-audio');
    let isPlaying = false;

    function playAudio() {
      if (audio) {
        audio.play().then(() => {
          isPlaying = true;
          $('#floating-music-btn').addClass('playing');
          $('#floating-music-btn i').attr('class', 'fa-solid fa-pause');
        }).catch(e => {
          console.log('Autoplay audio blocked:', e);
        });
      }
    }

    function pauseAudio() {
      if (audio) {
        audio.pause();
        isPlaying = false;
        $('#floating-music-btn').removeClass('playing');
        $('#floating-music-btn i').attr('class', 'fa-solid fa-play');
      }
    }

    // Toggle Audio button
    $('#floating-music-btn').on('click', function() {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });

    // "Buka Undangan" Button
    $('#btn-open-invitation').on('click', function() {
      $('#cover-screen').addClass('opened');
      $('body').css('overflow-y', 'auto');
      $('#floating-music-btn').removeClass('d-none');
      $('#floating-nav-bar').removeClass('d-none');

      playAudio();

      // Trigger scroll event or refresh AOS
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    });

    // Copy Account Number button
    $('.btn-copy-account').on('click', function() {
      const num = $(this).data('number');
      const bank = $(this).data('bank') || 'rekening';
      let msg = bank === 'DANA' ? 'Nomor DANA berhasil disalin!' : `Nomor rekening ${bank} berhasil disalin!`;
      if (window.FaweddingI18n) {
        msg = bank === 'DANA' 
          ? window.FaweddingI18n.getTranslation('toast_dana_copied') 
          : window.FaweddingI18n.getTranslation('toast_rekening_copied');
      }
      copyTextToClipboard(num, msg);
    });

    // Copy Address button
    $('#btn-copy-address').on('click', function() {
      const addr = $(this).data('address');
      const msg = (window.FaweddingI18n && window.FaweddingI18n.getTranslation('toast_address_copied')) 
        || 'Alamat pengiriman kado berhasil disalin!';
      copyTextToClipboard(addr, msg);
    });

    // Toggle Turut Mengundang Accordion
    $('#btn-toggle-turut').on('click', function() {
      const $wrap = $('#turut-expandable-wrap');
      const isExpanded = $wrap.hasClass('expanded');
      const moreText = (window.FaweddingI18n && window.FaweddingI18n.getTranslation('btn_turut_more')) || 'Lihat Selengkapnya';
      const lessText = (window.FaweddingI18n && window.FaweddingI18n.getTranslation('btn_turut_less')) || 'Sembunyikan';

      if (isExpanded) {
        $wrap.removeClass('expanded');
        $('#turut-toggle-text').text(moreText);
        $('#turut-toggle-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      } else {
        $wrap.addClass('expanded');
        $('#turut-toggle-text').text(lessText);
        $('#turut-toggle-icon').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }
    });

    // RSVP Form Submit
    $('#form-rsvp').on('submit', function(e) {
      e.preventDefault();
      const name = $('#rsvp-name').val().trim();
      const status = $('input[name="rsvp_presence"]:checked').val() || 'Hadir';
      const guestCount = $('#rsvp-count').val() || '1';

      if (!name) return;

      const rsvpEntry = {
        name,
        status,
        guestCount,
        date: new Date().toISOString()
      };

      try {
        localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(rsvpEntry));
      } catch(e) {}

      // Synchronize RSVP with wishes stream so it appears in Admin Dashboard
      if (window.FaweddingDB) {
        window.FaweddingDB.addWish({
          name: name,
          presence: status,
          guestCount: guestCount,
          message: `Konfirmasi Kehadiran: ${status} (${guestCount} Orang).`,
          time: 'Baru saja'
        });
      } else {
        const wishes = getStoredWishes();
        const existingIdx = wishes.findIndex(w => w.name && w.name.trim().toLowerCase() === name.toLowerCase());
        if (existingIdx >= 0) {
          wishes[existingIdx].presence = status;
          wishes[existingIdx].guestCount = guestCount;
        } else {
          wishes.unshift({
            id: 'rsvp_' + Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6),
            name: name,
            presence: status,
            guestCount: guestCount,
            message: `Konfirmasi Kehadiran: ${status} (${guestCount} Orang).`,
            time: 'Baru saja'
          });
        }
        saveWishes(wishes);
        renderWishesList();
      }

      const isJp = window.FaweddingI18n && window.FaweddingI18n.currentLang === 'jp';
      const successTitle = isJp ? '出欠の送信が完了しました' : 'Konfirmasi Kehadiran Berhasil';
      const successMsg = isJp
        ? `<strong>${escapeHtml(name)}</strong> 様、ご出欠のご連絡をいただき誠にありがとうございます。（${status} &bull; ${guestCount}名様）`
        : `Terima kasih <strong>${escapeHtml(name)}</strong> telah mengonfirmasi kehadiran Anda (${status} &bull; ${guestCount} Orang).`;
      const toastMsg = isJp
        ? 'ご出欠のご連絡を承りました。誠にありがとうございます。'
        : 'Terima kasih atas konfirmasi kehadiran Anda.';
      const toastTitle = isJp ? '送信完了' : 'Konfirmasi Diterima';

      $('#rsvp-form-container').html(`
        <div class="text-center py-4">
          <div class="text-success mb-3" style="font-size: 3.2rem;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h5 class="fw-bold mb-2">${successTitle}</h5>
          <p class="text-muted mb-0">${successMsg}</p>
        </div>
      `);

      if (window.iziToast) {
        iziToast.success({
          title: toastTitle,
          message: toastMsg,
          position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
        });
      }
    });

    // Send a Wish Form Submit
    $('#form-wish').on('submit', function(e) {
      e.preventDefault();
      const name = $('#wish-name').val().trim();
      const message = $('#wish-message').val().trim();
      const presence = $('#wish-presence').val() || 'Hadir';

      const isJp = window.FaweddingI18n && window.FaweddingI18n.currentLang === 'jp';

      if (!name || !message) {
        if (window.iziToast) {
          iziToast.warning({
            title: isJp ? 'ご注意' : 'Perhatian',
            message: isJp ? 'お名前とお祝いメッセージをご入力ください。' : 'Mohon isi nama dan ucapan Anda.',
            position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
          });
        }
        return;
      }

      const newWish = {
        name: name,
        presence: presence,
        message: message,
        time: 'Baru saja'
      };

      if (window.FaweddingDB) {
        window.FaweddingDB.addWish(newWish);
      } else {
        newWish.id = 'wish_' + Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6);
        const wishes = getStoredWishes();
        wishes.unshift(newWish);
        saveWishes(wishes);
        renderWishesList();
      }

      $('#wish-message').val('');

      if (window.iziToast) {
        iziToast.success({
          title: isJp ? '送信完了' : 'Terkirim',
          message: (window.FaweddingI18n && window.FaweddingI18n.getTranslation('toast_wish_sent')) || 'Terima kasih atas doa dan ucapan hangat Anda!',
          position: window.innerWidth < 768 ? 'topCenter' : 'bottomRight'
        });
      }
    });

    // Listen to storage events from admin or other tabs to keep wishes synced
    window.addEventListener('storage', function(e) {
      if (!e.key || e.key === STORAGE_KEY_WISHES) {
        renderWishesList();
      }
    });

    // Active link highlighting in floating nav on scroll
    $(window).on('scroll', function() {
      const scrollPos = $(document).scrollTop() + 200;
      $('.nav-pill-btn').each(function() {
        const currLink = $(this);
        const refElement = $(currLink.attr('href'));
        if (refElement.length) {
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-pill-btn').removeClass('active');
            currLink.addClass('active');
          }
        }
      });
    });
  });

})(jQuery);
