<template>
      <header class="flex h-24 items-center border-2 border-solid justify-between background: #FFFFFF66 backdrop-blur-[80px]">
  <img :src="Logo" class="ml-12 h-12 w-37.5" />
  <div class="flex gap-4 items-center justify-center">
    <router-link v-if="!user" class="px-6 py-3 rounded-lg border-2 border-[#E0DEF7] font-jakarta font-bold leading-[150%] text-[#000929] gap-2.5" :to="'/login'">Bejelentkezés</router-link>
    <router-link v-if="!user" class="bg-[#3CA8F0] px-6 py-3 rounded-lg text-white gap-2.5 font-jakarta font-bold leading-[150%] mr-8.5" :to="'/register'">Regisztráció</router-link>
     <span v-if="user" class=" text-black">{{ isLoggedIn.currentUser }}</span>
       <img :src="Exit" v-if="user" class="mr-9.25"  @click="logOut" >
     
   

  </div>
</header>
</template>

<script setup>
  import Exit from '@/assets/exit.png'
    import Logo from '@/assets/Logo.svg'
  import { useLoginStore } from '@/stores/login'
  import { useRouter } from 'vuetify/lib/composables/router'
import { computed} from 'vue'  
      const isLoggedIn = useLoginStore()
      const router= useRouter()
         const user = computed(() => isLoggedIn.currentUser)


function logOut() {
console.log(isLoggedIn);
  isLoggedIn.currentUser = null
  router.push('/login')
}
</script>

<style>

</style>