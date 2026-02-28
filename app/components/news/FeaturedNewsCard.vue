<script setup lang="ts">
import { NuxtImg } from '#components'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

interface Props {
  image: string
  title: string
  to: string
  date?: string
  description?: string
  linkText?: string
  imagePosition?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  imagePosition: 'left'
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 p-4"
  >
    <div
      class="flex flex-col md:flex-row items-center gap-6"
      :class="{ 'md:flex-row-reverse': imagePosition === 'right' }"
    >
      <div class="relative w-full h-48 md:w-[200px] md:h-[200px] flex-none rounded-lg overflow-hidden">
        <NuxtImg
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </div>
      <div class="py-4 flex-grow flex flex-col justify-center">
        <div
          v-if="date"
          class="flex items-center gap-2 mb-3"
        >
          <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-highlight-500" />
          <span class="text-xs font-bold text-gray-500 uppercase">{{ date }}</span>
        </div>
        <Headline
          :title="title"
          tag="h2"
          size="h4"
          margin-bottom="sm"
          :title-class="`text-brand-dark-900 dark:text-white group-hover:text-highlight-600 transition-colors line-clamp-2`"
        />
        <p
          v-if="description"
          class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6"
        >
          {{ description }}
        </p>
        <div class="mt-auto">
          <Button
            :label="linkText"
            variant="ghost"
            size="sm"
            icon="i-heroicons-arrow-small-right"
            :ui="{ icon: { trailing: true } }"
            class="text-highlight-600 group-hover:text-highlight-700 -ml-2.5"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
