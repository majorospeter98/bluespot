import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const users = ref([{ email: 'admin@gmail.com', password: 'admin12345' }])
  const currentUser = ref(null)
  console.log(currentUser.value)
  function logIn(email) {
  currentUser.value = email// csak az email kerül be
  console.log(currentUser.value)
    console.log(isLoggedIn.value)
}
  function logOut() {
    currentUser.value = null
      console.log(currentUser.value)
    console.log(isLoggedIn.value)
  }
  const isLoggedIn = computed(() => currentUser.value !== null)
  console.log(isLoggedIn.value)
  console.log(isLoggedIn.currentUser)
  return { users, currentUser, isLoggedIn, logOut, logIn}
})
