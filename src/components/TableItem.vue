<template>
  <div class="w-full overflow-x-auto mt-13.5">
    <table class="w-[68%] min-w-170 table-fixed border-collapse mx-auto">
      <thead
        class="border-b h-11 border-b-[#EAECF0] rounded-tl-lg rounded-bl-lg px-6 py-3 bg-[#F1F4F9] text-[0.75rem] font-medium inter-500 leading-4.5 text-[#202224]"
      >
        <tr class="border-b-[#EAECF0]">
          <th class="text-left font-medium px-3 py-2">Hétfő</th>
          <th class="text-left font-medium px-3 py-2">Kedd</th>
          <th class="text-left font-medium px-3 py-2">Szerda</th>
          <th class="text-left font-medium px-3 py-2">Csütörtök</th>
          <th class="text-left font-medium px-3 py-2">Péntek</th>
          <th class="text-left font-medium px-3 py-2">Összeg</th>
          <th class="text-left font-medium px-3 py-2">Hét</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-b-[#EAECF0]" v-for="item in sortItems" :key="item.week">
          <td class="px-3 py-2 text-left wrap-break-word">
            <div v-for="entry in item[1]" :key="entry" class="mb-2 gap-1">
              <p
                v-if="entry.time !== undefined"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#202224]"
              >
                {{ entry.time + ' ' + 'óra' }}
              </p>
              <p
                v-if="entry.comment"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#898989]"
              >
                {{ entry.comment }}
              </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left wrap-break-word">
            <div v-for="entry in item[2]" :key="entry" class="mb-1">
              <p
                v-if="entry.time !== undefined"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#202224]"
              >
                {{ entry.time + ' ' + 'óra' }}
              </p>
              <p
                v-if="entry.comment"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#898989]"
              >
                {{ entry.comment }}
              </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left wrap-break-word">
            <div v-for="entry in item[3]" :key="entry" class="mb-2 gap-2">
              <p
                v-if="entry.time !== undefined"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#202224]"
              >
                {{ entry.time + ' ' + 'óra' }}
              </p>
              <p
                v-if="entry.comment"
                class="font-jakarta font-medium text-[0.875rem] leading-5 text-[#898989]"
              >
                {{ entry.comment }}
              </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left wrap-break-word">
            <div v-for="entry in item[4]" :key="entry" class="mb-2 gap-2">
              <p
                v-if="entry.time !== undefined"
                class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]"
              >
                {{ entry.time + ' ' + 'óra' }}
              </p>
              <p
                v-if="entry.comment"
                class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]"
              >
                {{ entry.comment }}
              </p>
            </div>
          </td>
          <td class="px-3 py-2 text-left wrap-break-word break-all">
            <div v-for="entry in item[5]" :key="entry" class="mb-1">
              <p
                v-if="entry.time !== undefined"
                class="font-jakarta font-medium text-[14px] leading-5 text-[#202224]"
              >
                {{ entry.time + ' ' + 'óra' }}
              </p>
              <p
                v-if="entry.comment"
                class="font-jakarta font-medium text-[14px] leading-5 text-[#898989]"
              >
                {{ entry.comment }}
              </p>
            </div>
          </td>
          <td
            class="px-3 py-2 text-left font-jakarta font-extrabold text-[14px] leading-5 text-[#202224]"
          >
            {{ item.amount }}
          </td>
          <td
            class="px-3 py-2 text-left font-jakarta font-extrabold text-[14px] leading-5 text-[#202224]"
          >
            {{ item.week }}
          </td>
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
