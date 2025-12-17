import './assets/main.css'
import './index.css'
import App from './App.vue'
import { router } from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast)

app.mount('#app')
