<template>
  <div>
    <header
      class="flex h-24 items-center justify-between background: #FFFFFF66 backdrop-blur-[80px]"
    >
     <router-link :to="'/login'"><img :src="Logo" class="ml-12 h-12 w-37.5" />  </router-link>
      <div class="hidden md:flex gap-4 items-center justify-center">
        <router-link
          v-if="!user"
          class="px-6 py-3 rounded-lg border-2 border-[#E0DEF7] font-jakarta font-bold leading-[150%] text-[#000929] flex items-center justify-center"
          :to="'/login'"
          >Bejelentkezés</router-link
        >
        <router-link
          v-if="!user"
          class="bg-[#3CA8F0] px-6 py-3 rounded-lg text-white font-jakarta font-bold leading-[150%] mr-8.5 flex items-center justify-center"
          :to="'/register'"
          >Regisztráció</router-link
        >
        <img :src="Profile" v-if="user" class="w-11 h-11" />
        <span v-if="user" class="text-[#404040] text-[0.875rem] nunito">{{
          isLoggedIn.currentUser
        }}</span>
        <img :src="Exit" v-if="user" class="w-6 h-6 mr-9.25" @click="logOut" />
      </div>
      <img class="md:hidden cursor-pointer mr-7 h-9 w-9" :src="menu" @click="isOpen = !isOpen" />
    </header>
    <nav
      :class="isOpen ? 'block' : 'hidden'"
      class="lg:hidden md:hidden flex flex-col items-center justify-center gap-4 bg-white ml-auto min-h-42 w-60.5 shadow-[0px_0px_4px_0px_#00000040]"
    >
      <router-link
        v-if="!user"
        class="inline-flex px-6 py-3 rounded-lg border-2 border-[#E0DEF7] font-bold text-[#000929] items-center justify-center w-39.5"
        to="/login"
      >
        Bejelentkezés
      </router-link>
      <router-link
        v-if="!user"
        class="bg-[#3CA8F0] px-6 py-3 rounded-lg text-white font-bold w-39.5 flex items-center justify-center"
        to="/register"
      >
        Regisztráció
      </router-link>
      <img :src="Profile" v-if="user" class="w-11 h-11" />
      <span v-if="user" class="text-[#404040] text-[0.875rem] nunito">{{ isLoggedIn.currentUser }}</span>
      <img :src="Exit" v-if="user" class="w-6 h-6" @click="logOut" />
    </nav>
  </div>
</template>
<script setup>
import Exit from '@/assets/exit.png'
import menu from '@/assets/menu.png'
import Logo from '@/assets/logo.svg'
import Profile from '@/assets/profile.png'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { computed, ref } from 'vue'
const isLoggedIn = useLoginStore()
const router = useRouter()
const user = computed(() => isLoggedIn.currentUser)
const isOpen = ref(false)
function logOut() {
  isLoggedIn.currentUser = null
  router.push('/login')
}
</script>
