<template>
  <div class="overflow-x-auto">
    <table class="min-w-200 shadow-[6px_6px_54px_0px_#0000000D] w-full mt-6 py-7.5 px-4.75 bg-white">
      <thead class= "mt-12 h-11 border-b border-b-[#EAECF0] rounded-tl-lg rounded-bl-lg  px-6 py-3 bg-[#F1F4F9] font-medium inter-500 text-[12px] leading-4.5 text-[#202224]">
        <tr>
          <th class="text-left font-medium px-3 py-2">Hétfő</th>
          <th class="text-left  font-medium px-3 py-2">Kedd</th>
          <th class="text-left  font-medium px-3 py-2">Szerda</th>
          <th class="text-left  font-medium px-3 py-2">Csütörtök</th>
          <th class="text-left  font-medium px-3 py-2">Péntek</th>
          <th class="text-left  font-medium px-3 py-2">Összeg</th>
          <th class="text-left  font-medium px-3 py-2">Hét</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr 
          v-for="item in sortItems"
          :key="item.week"
          
        >
          <td class="px-3 py-2 text-left align-top">
            <div v-for="entry in item[1]" :key="entry" class="mb-1">
          <p class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]">  {{ entry.time }} </p>
             <p class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]">  {{ entry.comment }} </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left align-top">
            <div v-for="entry in item[2]" :key="entry" class="mb-1">
     <p class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]">  {{ entry.time }} </p>
             <p class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]">  {{ entry.comment }} </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left align-top">
            <div v-for="entry in item[3]" :key="entry" class="mb-1"> 
          <p class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]">  {{ entry.time }} </p>
             <p class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]">  {{ entry.comment }} </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left align-top">
            <div v-for="entry in item[4]" :key="entry" class="mb-1">
         <p class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]">  {{ entry.time }} </p>
             <p class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]">  {{ entry.comment }} </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left align-top">
            <div v-for="entry in item[5]" :key="entry" class="mb-1">
            <p class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]">  {{ entry.time }} </p>
             <p class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]">  {{ entry.comment }} </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left font-jakarta font-extrabold text-[14px] leading-5 text-[#202224]">{{ item.amount }}</td>
          <td class="px-3 py-2 text-left font-jakarta font-extrabold text-[14px] leading-5 text-[#202224]">{{ item.week }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const items = ref('')
const props = defineProps(['items'])
items.value = props.items

const sortItems = computed(() => {
  return items.value.sort((a, b) => a.week - b.week)
})
</script>
