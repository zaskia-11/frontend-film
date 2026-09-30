<template>
  <div class="container">
    <div class="page-title">
      <RouterLink to="/dashboard" class="btn-back">← Dashboard</RouterLink>
      <div class="title-row">
        <h1>🎭 Kelola Genre</h1>
        <RouterLink to="/tambah-genre" class="btn btn-primary">➕ Tambah Genre</RouterLink>
      </div>
    </div>

    <div v-if="successMsg" class="alert alert-success">✅ {{ successMsg }}</div>
    <p v-if="loading" class="loading-text">⏳ Memuat data genre...</p>

    <div v-else class="table-wrapper">
      <table class="film-table">
        <thead><tr><th>No</th><th>Nama Genre</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr v-if="genres.length === 0">
            <td colspan="3" class="empty-row">Belum ada data genre.</td>
          </tr>
          <tr v-for="(genre, index) in genres" :key="genre.id">
            <td>{{ index + 1 }}</td>
            <td class="film-title-cell">{{ genre.nama_genre }}</td>
            <td>
              <div class="action-btns">
                <RouterLink :to="'/edit-genre/' + genre.id" class="btn-action btn-edit">✏️ Edit</RouterLink>
                <button @click="hapusGenre(genre.id, genre.nama_genre)"
                  :disabled="deletingId === genre.id" class="btn-action btn-delete">
                  <span v-if="deletingId === genre.id">⏳</span>
                  <span v-else>🗑️ Hapus</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Hapus -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box">
        <h3>⚠️ Konfirmasi Hapus</h3>
        <p>Yakin menghapus genre: <strong>{{ genreToDelete?.nama_genre }}</strong>?</p>
        <p class="modal-warning">Tindakan ini tidak bisa dibatalkan!</p>
        <div class="modal-actions">
          <button @click="showModal = false" class="btn-modal-cancel">Batal</button>
          <button @click="konfirmasiHapus" class="btn-modal-delete">🗑️ Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted }        from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api                       from '../../../utils/api'

const router        = useRouter()
const genres        = ref([])
const loading       = ref(true)
const successMsg    = ref('')
const deletingId    = ref(null)
const showModal     = ref(false)
const genreToDelete = ref(null)

onMounted(async () => { await ambilGenre() })

const ambilGenre = async () => {
  try {
    loading.value = true
    const res = await api.get('/genres')
    genres.value = res.data.data
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}

const hapusGenre = (id, nama_genre) => {
  genreToDelete.value = { id, nama_genre }
  showModal.value     = true
}

const konfirmasiHapus = async () => {
  const id = genreToDelete.value.id
  showModal.value = false
  try {
    deletingId.value = id
    await api.delete(`/genres/${id}`)
    genres.value = genres.value.filter(g => g.id !== id)
    successMsg.value = `Genre "${genreToDelete.value.nama_genre}" berhasil dihapus!`
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (err) {
    alert('Gagal menghapus genre!')
  } finally {
    deletingId.value = null
    genreToDelete.value = null
  }
}
</script>

```css
<style scoped>

/* =========================
   PAGE TITLE
========================= */

.page-title {
  margin-bottom: 24px;
}

.page-title h1 {
  font-size: 28px;
  color: #1a1a2e;
  margin: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
}

.btn-back {
  color: #666;
  font-size: 14px;
  text-decoration: none;
}

.btn-back:hover {
  color: #e94560;
  text-decoration: none;
}


/* =========================
   BUTTON PRIMARY
========================= */

.btn-primary {
  background: #e94560;
  color: white;

  padding: 10px 18px;

  border-radius: 10px;

  text-decoration: none;

  font-size: 14px;
  font-weight: 600;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;
}

.btn-primary:hover {
  background: #d93650;
  color: white;
  text-decoration: none;
}

.btn-primary:active {
  transform: scale(0.98);
}


/* =========================
   ALERT
========================= */

.alert {
  padding: 12px 16px;

  border-radius: 10px;

  margin-bottom: 20px;

  font-size: 14px;
}

.alert-success {
  background: #ecfdf5;
  color: #047857;

  border: 1px solid #a7f3d0;
}

.alert-error {
  background: #fef2f2;
  color: #b91c1c;

  border: 1px solid #fecaca;
}


/* =========================
   LOADING
========================= */

.loading-text {
  text-align: center;

  padding: 40px 0;

  color: #777;

  font-size: 14px;
}


/* =========================
   TABLE WRAPPER
========================= */

.table-wrapper {
  background: white;

  border-radius: 16px;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08);

  overflow-x: auto;
}


/* =========================
   TABLE
========================= */

.film-table {
  width: 100%;

  border-collapse: collapse;

  font-size: 14px;
}

.film-table thead {
  background: #f8f8fb;
}

.film-table th {
  padding: 15px 18px;

  text-align: left;

  font-size: 13px;
  font-weight: 700;

  color: #555;

  border-bottom: 2px solid #eeeeee;

  white-space: nowrap;
}

.film-table td {
  padding: 15px 18px;

  color: #444;

  border-bottom: 1px solid #f0f0f0;

  vertical-align: middle;
}

.film-table tbody tr:last-child td {
  border-bottom: none;
}

.film-table tbody tr {
  transition: background 0.2s;
}

.film-table tbody tr:hover {
  background: #fafafa;
}


/* =========================
   NO
========================= */

.film-table th:first-child,
.film-table td:first-child {
  width: 70px;

  text-align: center;
}


/* =========================
   GENRE NAME
========================= */

.film-title-cell {
  font-weight: 600;

  color: #1a1a2e;

  text-transform: capitalize;
}


/* =========================
   ACTION BUTTONS
========================= */

.action-btns {
  display: flex;

  align-items: center;

  gap: 8px;
}


/* =========================
   ACTION BUTTON
========================= */

.btn-action {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 7px 12px;

  border-radius: 8px;

  font-size: 12px;

  font-weight: 600;

  text-decoration: none;

  border: none;

  cursor: pointer;

  transition:
    background 0.2s,
    color 0.2s,
    transform 0.2s;
}

.btn-action:active {
  transform: scale(0.97);
}


/* EDIT */

.btn-edit {
  background: #fff4e5;

  color: #d97706;
}

.btn-edit:hover {
  background: #ffedd5;

  color: #b45309;

  text-decoration: none;
}


/* DELETE */

.btn-delete {
  background: #fee2e2;

  color: #dc2626;
}

.btn-delete:hover {
  background: #fecaca;

  color: #b91c1c;
}

.btn-delete:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}


/* =========================
   EMPTY DATA
========================= */

.empty-row {
  text-align: center !important;

  padding: 40px 20px !important;

  color: #999 !important;

  font-size: 14px;
}


/* =========================
   MODAL OVERLAY
========================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px;

  z-index: 9999;

  animation: fadeIn 0.2s ease;
}


/* =========================
   MODAL BOX
========================= */

.modal-box {
  width: 100%;

  max-width: 420px;

  background: white;

  border-radius: 16px;

  padding: 28px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.18);

  animation: modalIn 0.2s ease;
}

.modal-box h3 {
  margin: 0 0 14px;

  font-size: 20px;

  color: #1a1a2e;
}

.modal-box p {
  margin: 8px 0;

  font-size: 14px;

  line-height: 1.6;

  color: #555;
}

.modal-box strong {
  color: #1a1a2e;
}


/* =========================
   MODAL WARNING
========================= */

.modal-warning {
  color: #dc2626 !important;

  font-size: 13px !important;

  background: #fef2f2;

  border: 1px solid #fecaca;

  padding: 10px 12px;

  border-radius: 8px;

  margin-top: 14px !important;
}


/* =========================
   MODAL ACTIONS
========================= */

.modal-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 24px;
}


/* BATAL */

.btn-modal-cancel {
  background: #f0f0f0;

  color: #555;

  border: none;

  padding: 10px 18px;

  border-radius: 10px;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition: background 0.2s;
}

.btn-modal-cancel:hover {
  background: #e5e5e5;
}


/* HAPUS */

.btn-modal-delete {
  background: #e94560;

  color: white;

  border: none;

  padding: 10px 18px;

  border-radius: 10px;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;
}

.btn-modal-delete:hover {
  background: #d93650;
}

.btn-modal-delete:active {
  transform: scale(0.97);
}


/* =========================
   ANIMATION
========================= */

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 600px) {

  .title-row {
    align-items: flex-start;

    flex-direction: column;

    gap: 12px;
  }

  .title-row .btn-primary {
    width: 100%;
  }

  .film-table {
    min-width: 600px;
  }

  .table-wrapper {
    border-radius: 12px;
  }

  .film-table th,
  .film-table td {
    padding: 12px 14px;
  }

  .action-btns {
    flex-direction: column;

    align-items: stretch;
  }

  .btn-action {
    width: 100%;
  }

  .modal-box {
    padding: 22px;

    border-radius: 14px;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .btn-modal-cancel,
  .btn-modal-delete {
    width: 100%;
  }
}

</style>
```
