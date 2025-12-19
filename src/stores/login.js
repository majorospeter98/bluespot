import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', () => {
  const users = ref([{ email: 'admin@gmail.com', username: 'admin', password: 'admin12345' }])
  const currentUser = ref(false)
  function logIn(email) {
    currentUser.value = email
  }
  function resetPassword(email) {
    const filteredUser = users.value.find((user) => user.email === email)
    filteredUser.password = 'user12345'
  }
  function logOut() {
    currentUser.value = null
  }
  const isLoggedIn = computed(() => currentUser.value !== null)
  return { users, currentUser, isLoggedIn, logOut, logIn, resetPassword }
})
