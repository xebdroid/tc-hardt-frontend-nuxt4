<script setup lang="ts">
// Wir holen uns die Links zentral aus dem Composable
const { footerLinks } = useNavigation()
</script>

<template>
  <UFooter class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <template #left>
      <span class="text-sm text-gray-500">
        © {{ new Date().getFullYear() }} TC Hardt 1976 e.V.
      </span>
    </template>

    <template #right>
      <div class="flex gap-4">
        <NuxtLink
          v-for="(link, index) in footerLinks"
          :key="index"
          :to="link.to"
          class="text-sm text-gray-500 hover:text-primary-500 transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
