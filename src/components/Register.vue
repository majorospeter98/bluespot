<template>
  <div class="h-screen d-flex flex-column justify-center">
    <v-card class="mx-auto pa-12 pb-8 w-100" elevation="8" max-width="448" rounded="lg">
      <v-form @submit.prevent="submitForm" ref="form">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          placeholder="Email address"
          :rules="emailRules"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
          autocomplete="new-email"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>
        <v-text-field
          :rules="passwordRules"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="password"
          autocomplete="new-password"
        ></v-text-field>

        <v-btn class="mt-4" type="submit" size="large" variant="elevated" color="success" block>
          Register
        </v-btn>

        <v-card-text class="text-center">
          <router-link to="/login" class="text-blue text-decoration-none" rel="noopener noreferrer">
            Login <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vuetify/lib/composables/router'
const login = useLoginStore()
const toast= useToast()
const form = ref()
const router= useRouter()
const visible = ref(false)
const password = ref('')
const email = ref('')
const emailRules = [
  (value) => {
    if (value) return true
    return "It's required"
  },
  (value) => /.+@.+\..+/.test(value) || 'Must be a valid email and contain @',
]
const passwordRules = [
  (value) => {
    if (value) return true
    return "It's required"
  },
  (value) => {
    if (value?.length >= 8) return true
    return 'Password should be atleast 8 character'
  },
]
async function submitForm() {
  const { valid } = await form.value.validate()
  if (valid) {
    const isEmailExist = login.users.find((user) => user.email === email.value)
       if (!isEmailExist) {
     toast.success("Succesful registration", {timeout:2200})
      login.users.push({ email: email.value, password: password.value })
          form.value.resetValidation()
      form.value.reset()
router.push("/login")
    } else {
    
    toast.error("The email already exist", {timeout:2200})
    }
  }
}
</script>
