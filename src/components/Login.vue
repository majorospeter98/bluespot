<template>
  <div class="flex items-center justify-center h-full">
    <form @submit.prevent="submitForm" class="w-92.25 h-107.75 mt-26.5 mb-65.5 md:mb-0">
      <div class="relative mt-7 mx-auto w-[90%] lg:w-full">
        <h2 class="poppins-medium text-3xl leading-[100%] h-11.25">Bejelentkezés</h2>
        <div class="relative mt-7">
          <input
            type="text"
            class="w-full pl-6.5 h-15.5 poppins-400 rounded-lg text-[0.938rem] text-[#2B2A2A] bg-[#2B2A2A0D]"
            :class="
              emailError.length > 1 ? 'border text-[#CE2625] rounded-lg border-[#CE2625]' : ''
            "
            placeholder="Email"
            v-model="email"
            required
            autocomplete="email"
          />
          <img
            v-if="emailError.length > 1"
            :src="errorIcon"
            alt="Hiba ikon"
            class="absolute right-5.75 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
          />
        </div>
        <p
          class="mt-2 text-[#CE2625] leading-4.5 poppins-medium font-normal"
          v-if="emailError.length > 1"
        >
          {{ emailError }}
        </p>
        <div class="relative mt-9.5">
          <input
            :type="!visible ? 'password' : 'text'"
            class="w-full pl-6.5 h-15.5 text-[#2B2A2A] poppins-400 rounded-lg placeholder:text-[#2B2A2A] bg-[#2B2A2A0D]"
            :class="
              passwordError.length > 1 ? 'border text-[#CE2625] rounded-lg border-[#CE2625]' : ''
            "
            required
            placeholder="Jelszó"
            v-model="password"
            autocomplete="current-password"
          />
          <img
            :src="visible ? invisibleIcon : visibleIcon"
            alt="Jelszó megjelenítése"
            class="absolute right-8 top-1/2 -translate-y-1/2 w-4.25 h-4.25 w- cursor-pointer"
            @click="visible = !visible"
          />
        </div>
        <p
          class="mt-2 text-[#CE2625] leading-4.5 poppins-medium font-normal"
          v-if="passwordError.length > 1"
        >
          {{ passwordError }}
        </p>
        <div class="flex">
          <router-link
            class="mt-4.25 block ml-auto mr-2.5 text-[#B0B0B0] poppins-400 text-[0.813rem] leading-[100%]"
            :to="'/reset'"
          >
            Elfelejtett jelszó ?
          </router-link>
        </div>
        <div class="mt-11.5 block">
          <button
            type="submit"
            class="flex items-center justify-center w-full poppins-medium text-center shadow-[0px_4px_61px_0px_#4D47C366] bg-[#2B2A2A] text-white h-14.75 rounded-[9px]"
          >
            Bejelentkezés
          </button>
          <router-link
            :to="'/register'"
            class="block w-full poppins-medium text-center mt-7.5 text-[#2B2A2A] h-6"
          >
            Regisztráció
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import visibleIcon from '@/assets/visible.png'
import invisibleIcon from '@/assets/invisible.png'
import errorIcon from '@/assets/error.png'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
const toast = useToast()
const login = useLoginStore()
const router = useRouter()
const formIsValid = ref(true)
const visible = ref(false)
const password = ref('')
const passwordError = ref('')
const email = ref('')
const emailError = ref('')
function submitForm() {
  formIsValid.value = true
  if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = 'Helytelen email formátum'
    formIsValid.value = false
  } else {
    emailError.value = ''
  }
  if (password.value.length < 8) {
    passwordError.value = 'A jelszónak legalább 8 karakternek kell lennie'
    formIsValid.value = false
  } else {
    passwordError.value = ''
  }
  if (!formIsValid.value) {
    toast.error('Javítsd a hibát/hibákat', { timeout: 2200 })
  } else {
    const findUser = login.users.find(
      (user) => user.email === email.value && user.password === password.value,
    )
    if (findUser) {
      login.logIn(email)
      toast.success('Sikeres bejelentkezés', { timeout: 1000 })
      router.push('/dashboard')
    } else {
      toast.error('Hibás email/jelszó', { timeout: 2200 })
    }
  }
}
</script>
<style scoped>
input::placeholder {
  height: 23px;
  font-size: 15px;
  font-weight: 400;
  color: #2b2a2a;
}
</style>
