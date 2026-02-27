<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: [String, Date],
    default: null
  },
  dateEnd: {
    type: [String, Date],
    default: null
  },
  dateString: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => 'default' | 'jubilee',
    default: 'default'
  }
})

const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

// --- Default Variant Logic ---
const parseDate = (dateInput: string | Date) => {
  if (!dateInput) return { day: '00', month: '???', year: '0000' }
  const date = new Date(dateInput)
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: months[date.getMonth()],
    year: date.getFullYear().toString()
  }
}

const startDate = computed(() => parseDate(props.date))
const endDate = computed(() => props.dateEnd ? parseDate(props.dateEnd) : null)

// --- Jubilee Variant Logic ---
const parsedJubileeDate = computed(() => {
  if (!props.dateString) {
    return {
      type: 'single',
      day: '00',
      month: '???',
      year: '0000'
    }
  }

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
  <!-- Jubilee Variant -->
  <div v-if="variant === 'jubilee'" class="mb-4 text-center">
    <template v-if="parsedJubileeDate.type === 'single'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-2">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.day }}.</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.month }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedJubileeDate.year }}
        </div>
      </div>
    </template>
    <template v-else-if="parsedJubileeDate.type === 'multiday'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-2">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.day1 }}/{{ parsedJubileeDate.day2 }}.</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.month }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedJubileeDate.year }}
        </div>
      </div>
    </template>
    <template v-else-if="parsedJubileeDate.type === 'range'">
      <div class="flex flex-col items-center">
        <div class="flex items-baseline justify-center gap-x-3">
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.startDay }}. {{ parsedJubileeDate.startMonth }}</span>
          <span class="text-2xl font-light text-gray-400">→</span>
          <span class="text-2xl font-extrabold text-accent-500 dark:text-accent-400">{{ parsedJubileeDate.endDay }}. {{ parsedJubileeDate.endMonth }}</span>
        </div>
        <div class="text-base font-medium text-gray-500 dark:text-gray-500 mt-1">
          {{ parsedJubileeDate.year }}
        </div>
      </div>
    </template>
  </div>

  <!-- Default Variant -->
  <div v-else class="flex items-center gap-x-4">
    <!-- Single Date Layout -->
    <div v-if="!endDate" class="flex items-center gap-x-3">
      <div class="text-5xl font-extrabold text-brand-dark-800 dark:text-gray-100 leading-none -mt-1">
        {{ startDate.day }}
      </div>
      <div class="flex flex-col justify-between">
        <div class="text-sm font-bold text-accent-500 dark:text-accent-400 leading-tight">
          {{ startDate.month }}
        </div>
        <div class="text-sm font-medium text-gray-400 dark:text-gray-500 leading-tight">
          {{ startDate.year }}
        </div>
      </div>
    </div>

    <!-- Date Range Layout -->
    <div v-else class="flex items-center text-sm">
      <div class="flex items-center gap-x-2">
        <div class="text-3xl font-extrabold text-brand-dark-800 dark:text-gray-100 leading-none">
          {{ startDate.day }}
        </div>
        <div class="flex flex-col justify-between">
          <div class="font-bold text-accent-500 dark:text-accent-400 leading-tight">
            {{ startDate.month }}
          </div>
          <div class="font-medium text-gray-400 dark:text-gray-500 leading-tight">
            {{ startDate.year }}
          </div>
        </div>
      </div>

      <div class="mx-2 text-gray-300 dark:text-gray-600 text-2xl">
        -
      </div>

      <div class="flex items-center gap-x-2">
        <div class="text-3xl font-extrabold text-brand-dark-800 dark:text-gray-100 leading-none">
          {{ endDate.day }}
        </div>
        <div class="flex flex-col justify-between">
          <div class="font-bold text-accent-500 dark:text-accent-400 leading-tight">
            {{ endDate.month }}
          </div>
          <div class="font-medium text-gray-400 dark:text-gray-500 leading-tight">
            {{ endDate.year }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
