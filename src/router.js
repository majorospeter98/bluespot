import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import DashBoard from './components/DashBoard.vue'
import Register from './components/Register.vue'
import NotFound from './components/NotFound.vue'
import { useLoginStore } from './stores/login'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const toast = useToast()
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/dashboard',
      component: DashBoard,
      beforeEnter: (_to, _from, next) => {
        const login = useLoginStore()
        if (login.isLoggedIn) {
          next()
        } else {
          toast.error('Nincs hozzáférésed, jelentkezz be', { timeout: 2000 })
          next('/login')
        }
      },
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: "/:NotFound(.*)", component: NotFound
    }
  ],
})
