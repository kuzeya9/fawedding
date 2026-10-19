/**
 * Firebase Firestore Realtime Sync Service for Fawedding
 * Mendukung dual-mode: Realtime Cloud Firestore saat config terisi,
 * dan fallback otomatis ke LocalStorage saat offline / config belum disetel.
 */

(function(window) {
  'use strict';

  const STORAGE_KEY_WISHES = 'fawedding_wishes_data';
  const COLLECTION_NAME = 'wishes';

  let db = null;
  let isFirebaseReady = false;
  let listeners = [];

  function isConfigValid() {
    return window.FIREBASE_CONFIG &&
           window.FIREBASE_CONFIG.apiKey &&
           window.FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY' &&
           window.FIREBASE_CONFIG.projectId &&
           window.FIREBASE_CONFIG.projectId !== 'YOUR_PROJECT_ID';
  }

  function initFirebase() {
    if (!isConfigValid()) {
      console.log('[Fawedding DB] Firebase config belum disetel. Menggunakan mode LocalStorage.');
      return false;
    }

    try {
      if (typeof firebase !== 'undefined' && firebase.apps) {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
        }
        db = firebase.firestore();
        isFirebaseReady = true;
        console.log('[Fawedding DB] Terhubung ke Firebase Cloud Firestore secara Real-Time!');
        return true;
      }
    } catch(err) {
      console.warn('[Fawedding DB] Inisialisasi Firebase gagal, fallback ke LocalStorage:', err);
    }
    return false;
  }

  // Fallback LocalStorage Handlers
  function getLocalWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WISHES);
      if (data) return JSON.parse(data);
    } catch(e) {}
    return [];
  }

  function saveLocalWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
      window.dispatchEvent(new Event('storage'));
    } catch(e) {}
  }

  window.FaweddingDB = {
    isReady: function() {
      return isFirebaseReady;
    },

    /**
     * Berlangganan (subscribe) ke stream ucapan secara realtime
     * Callback akan dipanggil setiap ada ucapan baru, hapus ucapan, dll.
     */
    subscribeWishes: function(onUpdate) {
      if (typeof onUpdate !== 'function') return;

      if (!isFirebaseReady && !initFirebase()) {
        // Mode LocalStorage
        onUpdate(getLocalWishes());
        const localHandler = function() {
          onUpdate(getLocalWishes());
        };
        window.addEventListener('storage', localHandler);
        return function unsubscribe() {
          window.removeEventListener('storage', localHandler);
        };
      }

      // Mode Firestore Real-Time
      try {
        const unsubscribe = db.collection(COLLECTION_NAME)
          .orderBy('createdAt', 'desc')
          .onSnapshot(function(snapshot) {
            const wishes = [];
            snapshot.forEach(function(doc) {
              const data = doc.data();
              wishes.push({
                id: doc.id,
                name: data.name || 'Anonim',
                presence: data.presence || 'Hadir',
                message: data.message || '',
                time: data.time || 'Baru saja',
                createdAt: data.createdAt ? data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt : new Date().toISOString()
              });
            });

            // Mirror ke localStorage sebagai cache offline
            saveLocalWishes(wishes);
            onUpdate(wishes);
          }, function(error) {
            console.error('[Fawedding DB] Error snapshot Firestore:', error);
            onUpdate(getLocalWishes());
          });

        return unsubscribe;
      } catch(err) {
        console.error('[Fawedding DB] Subscribe error:', err);
        onUpdate(getLocalWishes());
      }
    },

    /**
     * Tambah Ucapan Baru ke Firestore & LocalStorage
     */
    addWish: async function(wish) {
      const wishData = {
        name: wish.name || '',
        presence: wish.presence || 'Hadir',
        message: wish.message || '',
        time: wish.time || 'Baru saja',
        createdAt: isFirebaseReady && firebase.firestore.FieldValue 
          ? firebase.firestore.FieldValue.serverTimestamp() 
          : new Date().toISOString()
      };

      if (isFirebaseReady && db) {
        try {
          const docRef = await db.collection(COLLECTION_NAME).add(wishData);
          wishData.id = docRef.id;
          return wishData;
        } catch(err) {
          console.error('[Fawedding DB] Gagal kirim ke Firestore, fallback local:', err);
        }
      }

      // Local fallback
      wishData.id = 'wish_' + Date.now().toString() + '_' + Math.random().toString(36).substring(2, 6);
      const wishes = getLocalWishes();
      wishes.unshift(wishData);
      saveLocalWishes(wishes);
      return wishData;
    },

    /**
     * Hapus Ucapan dari Firestore & LocalStorage
     */
    deleteWish: async function(id) {
      if (!id) return;

      if (isFirebaseReady && db) {
        try {
          await db.collection(COLLECTION_NAME).doc(id).delete();
        } catch(err) {
          console.error('[Fawedding DB] Gagal hapus dari Firestore:', err);
        }
      }

      // Local mirror
      const wishes = getLocalWishes().filter(w => w.id !== id);
      saveLocalWishes(wishes);
    },

    /**
     * Hapus Semua Ucapan
     */
    clearAllWishes: async function() {
      if (isFirebaseReady && db) {
        try {
          const snapshot = await db.collection(COLLECTION_NAME).get();
          const batch = db.batch();
          snapshot.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
        } catch(err) {
          console.error('[Fawedding DB] Gagal hapus semua dari Firestore:', err);
        }
      }

      saveLocalWishes([]);
    }
  };

  // Inisialisasi awal saat script dimuat
  $(document).ready(function() {
    initFirebase();
  });

})(window);
