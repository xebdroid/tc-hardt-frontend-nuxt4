<script setup lang="ts">
defineProps<{
  date: string
}>()
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Artikel-Info</h3>
    <div class="space-y-3 text-sm">
      <div class="flex justify-between items-center">
        <span class="text-gray-500 dark:text-gray-400">Datum:</span>
        <span class="font-medium text-gray-900 dark:text-white">{{ date }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>
