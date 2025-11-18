<template>
  <v-table class="mt-10">
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
