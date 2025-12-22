<script setup lang="ts">
// Nichts Spezielles im Script
</script>

<template>
  <UFooter class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <template #left>
      <span class="text-sm text-gray-500">© {{ new Date().getFullYear() }} TC Hardt 1976 e.V.</span>
    </template>

    <template #right>
      <div class="flex gap-4">
        <NuxtLink to="/impressum" class="text-sm text-gray-500 hover:text-primary-500">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="text-sm text-gray-500 hover:text-primary-500">Datenschutz</NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
