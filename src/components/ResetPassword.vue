<template>
  <div class="flex items-center justify-center h-full">
    <form @submit.prevent="submitForm" class="w-92.25 min-h-73.75 mt-26.5">
      <div class="relative mt-7 mx-auto w-[90%] lg:w-full">
        <h2 class="poppins-medium text-3xl leading-[100%] h-11.25">Elfelejtett jelszó</h2>
        <div class="relative mt-7 w-full">
          <input
            type="text"
            class="w-full pl-6.5 h-15.5 poppins-medium rounded-lg bg-[#2B2A2A0D] text-[15px] text-[#2B2A2A]"
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
        <div class="mt-11.75 block">
          <button
            type="submit"
            class="flex items-center justify-center w-full poppins-medium text-center shadow-[0px_4px_61px_0px_#4D47C366] bg-[#2B2A2A] text-white h-14.75 rounded-[9px]"
          >
            Jelszó visszaállítása
          </button>
          <router-link
            :to="'/register'"
            class="block w-full poppins-medium text-center mt-7.5 leading-[100%] text-[#2B2A2A] h-6"
          >
            Bejelentkezés
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import errorIcon from '@/assets/error.png'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
const toast = useToast()
const reset = useLoginStore()
const router = useRouter()
const formIsValid = ref(true)
const email = ref('')
const emailError = ref('')
function submitForm() {
  formIsValid.value = true
  if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = 'Helytelen email formátum'
    formIsValid.value = false
  } else {
    emailError.value = ''
    formIsValid.value = true
  }
  if (formIsValid.value === false) {
    toast.error('Javítsd a hibát', { timeout: 2200 })
  } else {
    const findUser = reset.users.find((user) => user.email === email.value)
    if (findUser) {
      reset.resetPassword(email.value)
      toast.success('Jelszavad user12345-re változott', { timeout: 3400 })
      router.push('/login')
    } else {
      toast.error('Ezzel az emaillel nincs regisztrált fiók', { timeout: 2200 })
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
