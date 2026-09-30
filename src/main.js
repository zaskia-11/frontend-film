import { createApp } from 'vue'   // Import Vue
import App from './App.vue'        // Import komponen root
import router from './router'      // Import konfigurasi routing
import './style.css'               // Import CSS global

// Buat aplikasi → pasang router → tampilkan di <div id="app">
createApp(App).use(router).mount('#app')