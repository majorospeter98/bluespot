import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Login from "./components/Login.vue"
import DashBoard from "./components/DashBoard.vue"
import Register from './components/Register.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import { useLoginStore } from './stores/login';
import { useToast } from 'vue-toastification';
const toast= useToast()
const router= createRouter({
    history: createWebHistory(),
    routes: [{
path: "/", redirect: "/login"
    },
    {
    path: "/login", component:Login
},
{
    path: "/dashboard", component: DashBoard,  beforeEnter: (_to, _from, next) => {
    const login = useLoginStore()
    if (login.isLoggedIn) {
      next()
    } else {
      toast.error("Nincs hozzáférésed", {timeout:1800})
      next('/login')
    }
  }
},
{
    path: "/register", component: Register
}
]
})
const vuetify = createVuetify({
  components,
  directives,
   icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast)

app.mount('#app')
