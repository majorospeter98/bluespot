<template>
  <div class="h-screen d-flex flex-column justify-center">
    <v-card class="mx-auto pa-12 pb-8 w-100" elevation="8" max-width="448" rounded="lg">
      <v-form @submit.prevent="submitForm" ref="form">
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          density="compact"
          :rules="emailRules"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="email"
          autocomplete="current-email"
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
          autocomplete="current-password"
        ></v-text-field>

        <v-btn class="mt-4" type="submit" size="large" variant="elevated" color="success" block>
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <router-link
            to="/register"
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
          >
            Register <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
const toast = useToast()
const login = useLoginStore()
const router = useRouter()
const form = ref()
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
    if (value.length >= 8) return true
    return 'Password should be atleast 8 character'
  },
]
async function submitForm() {
  const { valid } = await form.value.validate()
  if (valid) {
    const findUser = login.users.find(
      (user) => user.email === email.value && user.password === password.value,
    )
    if (findUser) {
      login.logIn(email)
      toast.success('Successfully logged in', { timeout: 1200 })
      router.push('/dashboard')
    } else {
      toast.error('Wrong data', { timeout: 2200 })
    }
  }
}
</script>
