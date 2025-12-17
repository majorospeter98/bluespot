<template>
  <div class="flex flex-col items-center justify-center">
    <button
      class="flex items-center justify-center mt-12.25 ml-auto mr-36.75 px-8 py-4 gap-2 bg-[#2B2A2A] text-white rounded-lg leading-[150%] .font-jakarta font-bold"
      @click="modal = true"
    >
      <img :src="PlusIcon" class="h-5 w-5"> <span class="font-jakarta leading-[150%]" >Új óra </span>
    </button>
    <div v-if="modal" class="fixed inset-0 flex items-center justify-center bg-gray-700 ">
      <div class="bg-white rounded-lg w-106.5 min-h-123.5 relative">
               <div class="flex justify-end items-center mt-6 mr-8">
          <img :src="closeIcon" @click="close" class="h-6 w-6 cursor-pointer" />
        </div>
                <form @submit.prevent="formSubmit" ref="form" class="flex flex-col items-center">
                 <div class="mt-9">
            <label class="poppins-400 text-[13px] leading-4.5 text-[#242731] block mb-2 font-normal"
              >Dátum</label
            >
            <div class="relative">
              <img :src="dateIcon" class="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <flat-pickr
                v-model="pickedDate"
                :config="{
                  altInput: false,
                  altFormat: 'Y-m-d',
                  dateFormat: 'Y-m-d',
                  enable: [allowedDates],
                  maxDate: '2025-12-30',
                }"
                class="flex items-center justify-center w-74.25 h-11 border rounded-md pl-10 border-[#D4D4D4] roboto-400 placeholder:leading-7 placeholder:text-[#242731] placeholder:text-[18px]"
                placeholder="Choose date"
                name="pickedDate"
                :required="true"
              />
            </div>
              <p v-if="pickedDateError" class="poppins-400 leading-4.5 text-[13px] text-[#CE2625] self-start mt-2">{{ pickedDateError }}</p> 
          </div>

            <div>
            <label
              class="poppins-400 text-[13px] leading-4.5 text-[#242731] block mt-3 mb-2 font-normal"
              >Óra</label
            >
            <input
              type="number"
              v-model.number="time"
              min="1"
              max="24"
              placeholder="Óra"
              class="w-74.25 h-11 border rounded-md px-3 border-[#D4D4D4]"
              required
            />
          </div>

          <div>
            <label
              class="poppins-400 text-[13px] leading-4.5 text-[#242731] block mt-3 mb-2 font-normal"
              >Megjegyzés</label
            >
            <textarea
              v-model="comment"
              rows="10"
              placeholder="Megjegyzés"
              class="w-74.25 h-24 border border-[#D4D4D4] rounded-md px-4 py-6 pl-4 pr-2 leading-6"
              required
            ></textarea>
          <p v-if="commentError" class="poppins-400 leading-4.5 text-[13px] text-[#CE2625] self-start mt-2">{{ commentError }}</p> 
          </div>
  
          <div class="flex justify-center gap-6 mt-9 mb-8">
            <button
              type="submit"
              class="text-white px-7.5 py-4.25 rounded-lg bg-[#2B2A2A] w-38.75 inter-500 text-[18px] leading-[100%]"
            >
              Mentés
            </button>
            <button
              type="button"
              @click="close"
              class="text-white px-7.5 py-4.25 rounded-lg bg-[#CE2625] w-38.75 inter-500 text-[18px] leading-[100%]"
            >
              Mégse
            </button>
          </div>
        </form>
      </div>
    </div>
    <TableItem :items="items"></TableItem>
  </div>
</template>

<script setup>
import PlusIcon from '@/assets/+.png'
import closeIcon from '@/assets/close.png'
import dateIcon from '@/assets/date.png'
import TableItem from './TableItem.vue'
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'
import { onMounted } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router'
import { useToast } from 'vue-toastification'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
const toast = useToast()
const modal = ref(false)
const items = ref([])
const pickedDate = ref(null)
const pickedDateError = ref('')
const formIsValid= ref('')
const time = ref(null)
const comment = ref('')
const commentError = ref('')
const router = useRouter()
const isLoggedIn = useLoginStore()
onMounted(() => {
  if (!isLoggedIn.currentUser) {
    console.log(isLoggedIn.isLoggedIn)
    router.push('/login')
    toast.error('Nincs jogosultságod', { timeout: 3000 })
  }
})
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
function formSubmit() {
  if (pickedDate.value == null) {
   pickedDateError.value= 'Kötelező választani'
   formIsValid.value= false
    }
    else{
      formIsValid.value= true
      pickedDateError.value= ''
    }
  if (comment.value.length < 10) {
   commentError.value= 'Legalább 10 karakternek kell lennie'
   formIsValid.value= false
    }
    else{
       commentError.value= ''
    }
  if (!formIsValid.value) {
    toast.error('Az adatok mentése sikertelen!', { timeout: 2400 })
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
    weekRow[dayIndex].push({time:time.value}, {comment:comment.value})
    weekRow.amount += Number(time.value)
    toast.success('Az adatok mentése sikeres!', { timeout: 1200 })
  comment.value="",
  pickedDate.value= null
  time.value= null
    modal.value = false
  }
}
function close() {
  modal.value = false
}
</script>
