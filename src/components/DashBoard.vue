<template>
  <div class="text-center pa-4 d-flex justify-center flex-column">
    <v-btn width="200px" class="ml-auto mt-5" v-if="isLoggedin" @click="logOut" color="#DD2C00">
      Logout
    </v-btn>
    <v-btn width="200px" class="mx-auto mt-5" @click="dialog = true" color="primary">
      New time
    </v-btn>

    <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      class="mx-auto mt-7"
      width="80%"
    >
      <v-card width="90%">
        <v-sheet class="mx-auto mt-4" max-width="600" width="80%">
          <v-form @submit.prevent="submit">
            <v-text-field :rules="datePickerRule"
              ><v-date-picker
                :allowed-dates="allowedDates"
                color="primary"
                width="90%"
                v-model="pickedDate"
              ></v-date-picker
            ></v-text-field>

            <v-text-field min=1 max=22 v-model="time" label="Time" type="number"></v-text-field>
            <v-textarea
              :rules="commentRules"
              label="Megjegyzés"
              variant="outlined"
              v-model="comment"
            ></v-textarea>
            <v-btn class="mt-2" color="primary" text="Submit" type="submit" block></v-btn>
          </v-form>
        </v-sheet>
        <template v-slot:actions>
          <v-btn color="error" class="ms-auto m-4" text="Close" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-table class="mt-6">
      <thead>
        <tr>
          <th class="text-center">Hétfő</th>
          <th class="text-center">Kedd</th>
          <th class="text-center">Szerda</th>
          <th class="text-center">Csütörtök</th>
          <th class="text-center">Péntek</th>
          <th class="text-center">Összeg</th>
          <th class="text-center">Hét</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortItems" :key="item.week">
          <td>
            <div v-for="entry in item[1]" :key="entry">{{ entry }}</div>
          </td>
          <td>
            <div v-for="entry in item[2]" :key="entry">{{ entry }}</div>
          </td>
          <td>
            <div v-for="entry in item[3]" :key="entry">{{ entry }}</div>
          </td>
          <td>
            <div v-for="entry in item[4]" :key="entry">{{ entry }}</div>
          </td>
          <td>
            <div v-for="entry in item[5]" :key="entry">{{ entry }}</div>
          </td>
          <td>{{ item.amount }}</td>
          <td>{{ item.week }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
const isLoggedin = useLoginStore()
const toast= useToast()
const router = useRouter()
const dialog = ref(false)
const items = ref([])
const pickedDate = ref(null)
const time = ref(1)
const comment = ref('')

const datePickerRule = [
  (value) => {
    if (value) return true
    return "It's required"
  },
]
const commentRules = [
  (value) => {
    if (value.length >= 8) return true
    return 'Comment should be atleast 10 character'
  },
]
function allowedDates(val) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selected = new Date(val)
  selected.setHours(0, 0, 0, 0)

  const day = selected.getDay() // 0 = vasárnap, 6 = szombat

  const isWeekend = day === 0 || day === 6
  const isFutureOrToday = selected >= today

  return isFutureOrToday && !isWeekend
}
function getWeekOfMonth(dateObj) {
  const firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)
  const weekNumber = Math.ceil((dateObj.getDate() + firstDay.getDay()) / 7)
  return weekNumber
}
function submit() {
  console.log(pickedDate.value)
  console.log(isLoggedin)
  console.log(isLoggedin.currentUser)
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
}
const sortItems = computed(() => {
  return items.value.sort((a, b) => a.week - b.week)
})
function logOut() {
  isLoggedin.currentUser = null
  console.log(isLoggedin.currentUser)
  router.push('/login')
}

</script>
