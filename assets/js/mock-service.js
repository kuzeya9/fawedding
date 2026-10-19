/**
 * Fawedding Local Interactive Mock Service
 * Handles RSVP, Guestbook / Wishes, QR Code generation, and LocalStorage persistence.
 */

(function($) {
  'use strict';

  const STORAGE_KEY_WISHES = 'fawedding_wishes_data';
  const STORAGE_KEY_RSVP = 'fawedding_rsvp_data';

  // Seed initial sample wishes if empty
  const defaultWishes = [
    {
      name: 'Rian & Sarah',
      presence: 'Hadir',
      message: 'Selamat menempuh hidup baru untuk Pria & Wanita! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Bahagia selalu sampai kakek nenek! ❤️',
      time: '1 jam yang lalu'
    },
    {
      name: 'Budi Santoso',
      presence: 'Hadir',
      message: 'Happy wedding! Semoga lancar sampai hari H dan selalu diberikan keberkahan dalam setiap langkah kehidupan baru kalian.',
      time: '3 jam yang lalu'
    },
    {
      name: 'Anisa & Dimas',
      presence: 'Tidak Hadir',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Selamat ya Wanita & Pria, mohon maaf belum bisa hadir secara langsung namun doa terbaik kami selalu menyertai.',
      time: '5 jam yang lalu'
    },
    {
      name: 'Keluarga Besar Alm. H. Ahmad',
      presence: 'Hadir',
      message: 'Selamat berbahagia untuk kedua mempelai dan keluarga besar. Semoga langgeng dan selalu dalam lindungan Allah SWT.',
      time: '1 hari yang lalu'
    }
  ];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WISHES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading localStorage wishes:', e);
    }
    return defaultWishes;
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
    } catch (e) {
      console.error('Error saving localStorage wishes:', e);
    }
  }

  function renderWishes() {
    const $wrapper = $('#wishes_wrapper');
    if (!$wrapper.length) return;

    const wishes = getStoredWishes();
    let html = '<div class="wishes-list d-flex flex-column gap-3">';

    wishes.forEach(item => {
      const badgeClass = item.presence === 'Hadir' ? 'bg-success' : (item.presence === 'Tidak Hadir' ? 'bg-danger' : 'bg-secondary');
      html += `
        <div class="card p-3 shadow-sm border-0" style="border-radius: 12px; background: rgba(255, 255, 255, 0.95); text-align: left;">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0 fw-bold" style="color: #333;">${escapeHtml(item.name)}</h6>
            <span class="badge ${badgeClass} text-white px-2 py-1" style="font-size: 0.75rem; border-radius: 8px;">${escapeHtml(item.presence || 'Hadir')}</span>
          </div>
          <p class="mb-1 text-muted" style="font-size: 0.9rem; line-height: 1.5;">${escapeHtml(item.message)}</p>
          <small class="text-secondary" style="font-size: 0.75rem;">${escapeHtml(item.time || 'Baru saja')}</small>
        </div>
      `;
    });

    html += '</div>';
    $wrapper.html(html);

    if (window.ScrollTrigger) {
      setTimeout(() => {
        window.ScrollTrigger.refresh();
      }, 100);
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
  }

  $(document).ready(function() {
    // Render initial wishes
    renderWishes();

    // Override reload_guestbook_data
    window.reload_guestbook_data = function() {
      renderWishes();
    };

    // Override Wishes Form Submit
    const guestbookForm = document.getElementById('guestbook_form');
    if (guestbookForm) {
      $(guestbookForm).off('submit');
      $(guestbookForm).on('submit', function(e) {
        e.preventDefault();

        const name = $(this).find('[name="nama"]').val() || $(this).find('[name="name"]').val() || 'Tamu Undangan';
        const presence = $(this).find('[name="kehadiran"]').val() || $(this).find('[name="presence"]').val() || 'Hadir';
        const message = $(this).find('[name="komentar"]').val() || $(this).find('[name="message"]').val() || $(this).find('textarea').val();

        if (!message || !message.trim()) {
          if (window.iziToast) {
            iziToast.warning({
              title: 'Perhatian',
              message: 'Mohon tuliskan ucapan atau doa Anda.',
              position: 'bottomRight'
            });
          }
          return;
        }

        const newWish = {
          name: name.trim(),
          presence: presence,
          message: message.trim(),
          time: 'Baru saja'
        };

        const existing = getStoredWishes();
        existing.unshift(newWish);
        saveWishes(existing);

        renderWishes();

        // Reset form textarea
        $(this).find('textarea').val('');

        if (window.iziToast) {
          iziToast.success({
            title: 'Berhasil!',
            message: 'Ucapan dan doa Anda telah berhasil dikirimkan.',
            position: 'bottomRight'
          });
        }
      });
    }

    // Override RSVP Form Submit
    const rsvpForm = document.getElementById('tambahdata');
    if (rsvpForm) {
      $(rsvpForm).off('submit');
      $(rsvpForm).on('submit', function(e) {
        e.preventDefault();

        const name = $(this).find('[name="name"]').val() || $(this).find('[name="nama"]').val() || 'Tamu Terhormat';
        const email = $(this).find('[name="email"]').val() || '-';
        const phone = $(this).find('[name="phone"]').val() || $(this).find('[name="whatsapp"]').val() || '-';
        const count = $(this).find('[name="total_guest"]').val() || $(this).find('[name="guest"]').val() || '1';
        const status = $(this).find('[name="status"]').val() || 'Hadir';

        const rsvpData = { name, email, phone, count, status, submittedAt: new Date().toISOString() };
        try {
          localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(rsvpData));
        } catch(e) {}

        const $card = $('#cardRSVP');
        if ($card.length) {
          $card.html(`
            <div class="text-center p-4">
              <div class="mb-3">
                <i class="icofont-check-circled text-success" style="font-size: 3rem;"></i>
              </div>
              <h5 class="fw-bold mb-2">Konfirmasi Kehadiran Berhasil!</h5>
              <p class="text-muted mb-0">Terima kasih atas konfirmasi kehadiran Anda, <strong>${escapeHtml(name)}</strong> (${status} - ${count} Tamu).</p>
            </div>
          `);
        }

        if (window.iziToast) {
          iziToast.success({
            title: 'RSVP Diterima!',
            message: 'Terima kasih telah mengkonfirmasi kehadiran Anda.',
            position: 'bottomRight'
          });
        }

        if (window.ScrollTrigger) {
          setTimeout(() => window.ScrollTrigger.refresh(), 200);
        }
      });
    }

    // Envelope open triggers music autoplay reliably
    $('#btn-envelope').on('click', function() {
      const audio = document.getElementById('audio_file');
      if (audio) {
        audio.play().then(() => {
          $('#playPause').removeClass('icofont-ui-play icofont-music-alt').addClass('icofont-ui-pause');
        }).catch(err => {
          console.log('Audio autoplay prevented:', err);
        });
      }
    });

    // Music control toggle button
    $('#musicControl').on('click', function() {
      const audio = document.getElementById('audio_file');
      if (!audio) return;

      if (audio.paused) {
        audio.play().then(() => {
          $('#playPause').removeClass('icofont-ui-play icofont-music-alt').addClass('icofont-ui-pause');
        }).catch(err => console.log('Audio play error:', err));
      } else {
        audio.pause();
        $('#playPause').removeClass('icofont-ui-pause').addClass('icofont-ui-play');
      }
    });
  });

})(jQuery);
