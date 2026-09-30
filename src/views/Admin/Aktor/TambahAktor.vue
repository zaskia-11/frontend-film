<template>
  <div class="container">
    <RouterLink to="/kelola-aktor" class="btn-back">← Kembali</RouterLink>
    <h1 style="margin: 12px 0 24px">➕ Tambah Aktor Baru</h1>

    <div class="form-wrapper">
      <form @submit.prevent="submitAktor">
        <div class="form-group">
          <label>Nama Aktor <span class="required">*</span></label>
          <input v-model="form.nama_aktor" type="text" placeholder="Contoh: Reza Rahadian" required class="form-input" />
        </div>

        <div class="form-group">
          <label>Gender <span class="required">*</span></label>
          <!-- Perhatikan: value pakai 'L' dan 'P' sesuai database ENUM -->
          <select v-model="form.jenis_kelamin" required class="form-input">
            <option value="" disabled>Pilih Gender</option>
            <option value="pria">Pria</option>
            <option value="wanita">Wanita</option>
          </select>
        </div>

        <div class="form-group">
          <label>Tanggal Lahir <span class="required">*</span></label>
          <input v-model="form.tanggal_lahir" type="date" required class="form-input" />
        </div>

        <div class="form-group">
          <label>Usia <span class="required">*</span></label>
          <input v-model="form.usia" type="number" required class="form-input" />
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          <span v-if="loading">⏳ Menyimpan...</span>
          <span v-else>💾 Simpan Aktor</span>
        </button>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref }               from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import api                   from '../../../utils/api'

const router = useRouter()
const form   = ref({ nama_aktor: '', jenis_kelamin: '', tanggal_lahir: '', usia: '' })
const loading  = ref(false)
const errorMsg = ref('')

const submitAktor = async () => {
  try {
    loading.value  = true
    errorMsg.value = ''
    await api.post('/aktors', form.value)
    router.push('/kelola-aktor')
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Terjadi kesalahan.'
  } finally {
    loading.value = false
  }
}
</script>

```css
<style scoped>

/* =========================
   CONTAINER
========================= */

.container {
  max-width: 720px;
}


/* =========================
   BACK BUTTON
========================= */

.btn-back {
  display: inline-block;

  color: #666;

  font-size: 14px;

  text-decoration: none;

  margin-bottom: 12px;

  transition: color 0.2s;
}

.btn-back:hover {
  color: #e94560;

  text-decoration: none;
}


/* =========================
   PAGE TITLE
========================= */

h1 {
  font-size: 28px;

  color: #1a1a2e;

  margin: 12px 0 24px;
}


/* =========================
   FORM WRAPPER
========================= */

.form-wrapper {
  background: white;

  border-radius: 16px;

  padding: 32px;

  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08);

  max-width: 720px;
}


/* =========================
   FORM
========================= */

.form-wrapper form {
  display: flex;

  flex-direction: column;

  gap: 20px;
}


/* =========================
   FORM GROUP
========================= */

.form-group {
  display: flex;

  flex-direction: column;

  gap: 6px;
}

.form-group label {
  font-size: 13px;

  font-weight: 600;

  color: #333;
}

.required {
  color: #e94560;

  margin-left: 2px;
}


/* =========================
   INPUT & SELECT
========================= */

.form-input {
  width: 100%;

  box-sizing: border-box;

  padding: 11px 14px;

  border: 2px solid #e0e0e0;

  border-radius: 10px;

  font-size: 14px;

  font-family: inherit;

  outline: none;

  background: white;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-input:focus {
  border-color: #e94560;

  box-shadow:
    0 0 0 3px rgba(233, 69, 96, 0.1);
}

.form-input::placeholder {
  color: #aaa;
}


/* =========================
   SUBMIT BUTTON
========================= */

.btn-submit {
  width: 100%;

  padding: 11px 18px;

  border: none;

  border-radius: 10px;

  background: #e94560;

  color: white;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s,
    opacity 0.2s;
}

.btn-submit:hover {
  background: #d93650;
}

.btn-submit:active {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.6;

  cursor: not-allowed;

  transform: none;
}


/* =========================
   ERROR MESSAGE
========================= */

.error-msg {
  margin: 0;

  padding: 10px 12px;

  border-radius: 8px;

  background: #fef2f2;

  border: 1px solid #fecaca;

  color: #b91c1c;

  font-size: 13px;

  line-height: 1.5;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 600px) {

  .container {
    max-width: 100%;
  }

  h1 {
    font-size: 24px;

    margin-bottom: 20px;
  }

  .form-wrapper {
    padding: 20px;

    border-radius: 12px;
  }

  .btn-submit {
    padding: 11px 16px;
  }
}

</style>
```
