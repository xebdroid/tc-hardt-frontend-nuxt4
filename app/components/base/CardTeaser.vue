<script setup lang="ts">
/**
 * CardTeaser - Universelle Karte für News, Events oder Blog-Beiträge.
 */

interface Props {
  image: string
  title: string
  to: string
  date?: string
  description?: string
  linkText?: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group text-brand-dark-900 flex flex-col h-full"
  >
    <div class="h-56 overflow-hidden relative shrink-0">
      <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
      <img
        :src="image"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        :alt="title"
      >
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <div
        v-if="date"
        class="flex items-center gap-2 mb-3"
      >
        <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-highlight-500" />
        <span class="text-xs font-bold text-gray-500 uppercase">{{ date }}</span>
      </div>

      <h3 class="text-xl font-bold mb-3 text-brand-dark-900 dark:text-white group-hover:text-highlight-600 transition-colors line-clamp-2">
        {{ title }}
      </h3>

      <p
        v-if="description"
        class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4"
      >
        {{ description }}
      </p>

      <div v-if="linkText" class="mt-auto pt-4 flex justify-end">
        <div class="inline-flex items-center text-highlight-600 text-sm font-bold">
          <span>{{ linkText }}</span>
          <UIcon
            name="i-heroicons-arrow-small-right"
            class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
