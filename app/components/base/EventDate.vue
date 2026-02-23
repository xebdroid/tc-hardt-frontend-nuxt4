<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  dateString: {
    type: String,
    required: true
  }
})

const parsedDate = computed(() => {
  if (!props.dateString) {
    return {
      type: 'single',
      day: '00',
      month: '???',
      year: '0000'
    }
  }

  const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

  if (props.dateString.includes('–')) {
    const [start, end] = props.dateString.split('–').map(s => s.trim())
    const startParts = start.split('.')
    const endParts = end.split('.')
    return {
      type: 'range',
      startDay: startParts[0],
      startMonth: months[parseInt(startParts[1], 10) - 1],
      endDay: endParts[0],
      endMonth: months[parseInt(endParts[1], 10) - 1],
      year: endParts[2]
    }
  }

  if (props.dateString.includes('/')) {
    const parts = props.dateString.split('.')
    const days = parts[0]
    const [day1, day2] = days.split('/')
    return {
      type: 'multiday',
      day1,
      day2,
      month: months[parseInt(parts[1], 10) - 1],
      year: parts[2]
    }
  }

  const parts = props.dateString.split('.')
  return {
    type: 'single',
    day: parts[0],
    month: months[parseInt(parts[1], 10) - 1],
    year: parts[2]
  }
})
</script>

<template>
  <div class="mb-4 text-center">
    <template v-if="parsedDate.type === 'single'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-2">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.day }}.</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.month }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedDate.year }}
        </div>
      </div>
    </template>
    <template v-else-if="parsedDate.type === 'multiday'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-2">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.day1 }}/{{ parsedDate.day2 }}.</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.month }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedDate.year }}
        </div>
      </div>
    </template>
    <template v-else-if="parsedDate.type === 'range'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-3">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.startDay }}. {{ parsedDate.startMonth }}</span>
          <span class="text-2xl font-light text-gray-400">→</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedDate.endDay }}. {{ parsedDate.endMonth }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedDate.year }}
        </div>
      </div>
    </template>
  </div>
</template>
