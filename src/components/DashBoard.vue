<template>
  <div class="text-center pa-4 d-flex justify-center flex-column">
    <span class="ml-auto">{{ isLoggedin.currentUser }}</span>
       <v-btn width="200px" class="ml-auto" v-if="isLoggedin" @click="logOut" color="#DD2C00">
      Kijelentkezés
    </v-btn>

    <v-btn width="200px" class="mx-auto mt-10" @click="dialog = true" color="primary">
      Új óra
    </v-btn>

    <v-dialog
      max-width="500px"
      transition="dialog-bottom-transition"
      v-model="dialog"
      class="mx-auto mt-7"
      width=""
    >
      <v-card>
        <v-btn
          prepend-icon=""
          icon="mdi-close"
          color="black"
          class="ms-auto p-14"
          text="Close"
          @click="dialog = false"
        ></v-btn>
        <v-sheet class="mx-auto mt-4" width="80%">
          <v-form @submit.prevent="submit" ref="form">
            <v-date-input
              v-model="pickedDate"
              :rules="datePickerRule"
              prepend-icon=""
              prepend-inner-icon="$calendar"
            placeholder="Válaszd ki a dátumot"
              min="minDate"
              max="2025-12-30"
              clearable
              variant="outlined"
              :allowed-dates="allowedDates"
            />

            <v-text-field
            prepend-icon=""
              prepend-inner-icon="mdi-clock-outline"
              :rules="[
                (v) => !!v || 'Kötelező kitölteni',
                (v) => v >= 1 || 'Minimum érték 1',
                (v) => v <= 24 || 'Maximum érték 24',
              ]"
              variant="outlined"
              v-model="time"
              placeholder="Óra"
              type="number"
            ></v-text-field>
            <v-textarea
            prepend-icon=""
              prepend-inner-icon="mdi-comment-outline"
              :rules="commentRules"
           placeholder="Megjegyzés"
              variant="outlined"
              v-model="comment"
            ></v-textarea>
            <div class="d-flex justify-end ga-2 mb-2">
            <v-btn color="primary" text="Mentés" type="submit" ></v-btn>
          
          <v-btn
            
            color="error"
            
            text="Mégse"
            @click="dialog = false"
          ></v-btn>
            </div>
          </v-form>
        </v-sheet>
        
      </v-card>
    </v-dialog>
    <TableItem :items="items"></TableItem>
  </div>
</template>

<script setup>
import TableItem from './TableItem.vue'
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
const form = ref('')
const isLoggedin = useLoginStore()
const toast = useToast()
const router = useRouter()
const dialog = ref(false)
const items = ref([])
const pickedDate = ref(null)
const time = ref(null)
const comment = ref('')

const datePickerRule = [
  (value) => {
    if (value) return true
    return 'Kötelező kitölteni'
  },
]
const commentRules = [
  (value) => {
    if (!value || value.length < 10) {
      return 'A megjegyzésnek legalább 10 karakternek kell lennie'
    }
    return true
  },
]
function allowedDates(val) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selected = new Date(val)
  selected.setHours(0, 0, 0, 0)
  const day = selected.getDay()
  const isWeekend = day === 0 || day === 6
  const isFutureOrToday = selected >= today
  return isFutureOrToday && !isWeekend
}
function getWeekOfMonth(dateObj) {
  const firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)
  const weekNumber = Math.ceil((dateObj.getDate() + firstDay.getDay()) / 7)
  return weekNumber
}
async function submit() {
  const { valid } = await form.value.validate()
  if (!valid) {
    toast.error('Hibás a form', { timeout: 2400 })
  } else {
    const dateObj = new Date(pickedDate.value)
    const dayIndex = dateObj.getDay()
    let weekRow = items.value.find((row) => row.week === getWeekOfMonth(dateObj))
    if (!weekRow) {
      weekRow = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        amount: 0,
        week: getWeekOfMonth(dateObj),
      }
      items.value.push(weekRow)
    }
    weekRow[dayIndex].push(time.value, comment.value)
    weekRow.amount += Number(time.value)
    toast.success('Sikeres Mentés', { timeout: 1200 })
    form.value.reset()
    dialog.value = false
  }
}

function logOut() {
  isLoggedin.currentUser = null
  router.push('/login')
}
</script>
