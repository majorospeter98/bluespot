<template>
  <div>
    <header
      class="flex h-24 items-center border-2 border-solid justify-between background: #FFFFFF66 backdrop-blur-[80px]"
    >
           <img :src="Logo" class="ml-12 h-12 w-37.5" />

          <div class="hidden md:flex gap-4 items-center justify-center">
        <router-link
          v-if="!user"
          class="px-6 py-3 rounded-lg border-2 border-[#E0DEF7] font-jakarta font-bold leading-[150%] text-[#000929] gap-2.5"
          :to="'/login'"
          >Bejelentkezés</router-link
        >
        <router-link
          v-if="!user"
          class="bg-[#3CA8F0] px-6 py-3 rounded-lg text-white gap-2.5 font-jakarta font-bold leading-[150%] mr-8.5"
          :to="'/register'"
          >Regisztráció</router-link
        >
        <span v-if="user" class="text-black">{{ isLoggedIn.currentUser }}</span>
        <img :src="Exit" v-if="user" class="w-6 h-6 mr-8.5" @click="logOut" />
      </div>

      <img class="md:hidden cursor-pointer mr-8.5" :src="menu" @click="isOpen = !isOpen" />
    </header>

       <nav
      :class="isOpen ? 'block' : 'hidden'"
      class="lg:hidden flex flex-col items-center justify-center gap-4 p-4 bg-white ml-auto min-h-50 w-60 shadow-[0px_0px_4px_0px_#00000040]"
    >
      <router-link
        v-if="!user"
        class="inline-flex px-6 py-3 rounded-lg border-2 border-[#E0DEF7] font-bold text-[#000929]"
        to="/login"
      >
        Bejelentkezés
      </router-link>
      <router-link
        v-if="!user"
        class="bg-[#3CA8F0] px-6 py-3 rounded-lg text-white font-bold"
        to="/register"
      >
        Regisztráció
      </router-link>
      <span v-if="user" class="text-black">{{ isLoggedIn.currentUser }}</span>
      <img :src="Exit" v-if="user" class="w-6 h-6 mr-8.5" @click="logOut" />
    </nav>
  </div>
</template>
<script setup>
import Exit from '@/assets/exit.png'
import menu from '@/assets/menu.png'
import Logo from '@/assets/logo.svg'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { computed, ref } from 'vue'
const isLoggedIn = useLoginStore()
const router = useRouter()
const user = computed(() => isLoggedIn.currentUser)
const isOpen = ref(false)

function logOut() {
  console.log(isLoggedIn)
  isLoggedIn.currentUser = null
  router.push('/login')
}
</script>
