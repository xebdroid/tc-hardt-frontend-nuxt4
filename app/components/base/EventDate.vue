<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  dateEnd: {
    type: String,
    default: null
  }
})

const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

const parseDate = (dateString: string) => {
  const date = new Date(dateString)
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: months[date.getMonth()],
    year: date.getFullYear().toString()
  }
}

const startDate = computed(() => parseDate(props.date))
const endDate = computed(() => props.dateEnd ? parseDate(props.dateEnd) : null)

</script>

<template>
  <div class="flex items-center gap-x-4">
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
