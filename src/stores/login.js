import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const users = ref([{ email: 'admin@gmail.com', username: 'admin', password: 'admin12345' }])
  const currentUser = ref(null)
  function logIn(email) {
    currentUser.value = email // csak az email kerül be
  }
  function logOut() {
    currentUser.value = null
  }
  const isLoggedIn = computed(() => currentUser.value !== null)

  return { users, currentUser, isLoggedIn, logOut, logIn }
})
