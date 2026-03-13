<script setup lang="ts">
import Image from '~/components/base/Image.vue'
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
      class="flex flex-col md:flex-row md:items-center gap-4"
      :class="{ 'md:flex-row-reverse': imagePosition === 'right' }"
    >
      
      <!-- Top-Bereich (Bild & Texte nebeneinander auf Mobile) -->
      <div class="flex flex-row items-start gap-4 md:contents">
        <!-- Bild-Bereich -->
        <div class="flex-none">
          <Image
            :src="image"
            :alt="title"
            class="relative w-24 h-24 md:w-[150px] md:h-[150px] rounded-lg overflow-hidden"
            image-class="w-full h-full object-cover"
          >
            <template #overlay>
              <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </template>
          </Image>
        </div>

        <!-- Rechte Spalte auf Mobile: Datum & Titel -->
        <div class="flex-grow flex flex-col min-w-0 md:hidden pt-0.5">
          <!-- Datum ÜBER dem Titel auf Mobile -->
          <div v-if="date" class="flex items-center gap-1 mb-1">
            <UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5 text-highlight-500" />
            <span class="text-[10px] font-bold text-gray-500 uppercase">{{ date }}</span>
          </div>
          
          <Headline
            :title="title"
            tag="h2"
            size="h4"
            margin-bottom="none"
            title-class="text-base font-bold text-brand-dark-900 dark:text-white group-hover:text-highlight-600 transition-colors line-clamp-3 break-word-hyphens"
          />
        </div>
      </div>

      <!-- Content-Bereich (Desktop: Ganz normal daneben, Mobile: Darunter für volle Breite) -->
      <div class="flex-grow flex flex-col min-w-0">
        <!-- Titel & Datum (Nur für Desktop sichtbar) -->
        <div class="hidden md:flex flex-row justify-between items-start gap-4 mb-2">
          <Headline
            :title="title"
            tag="h2"
            size="h4"
            margin-bottom="none"
            title-class="text-xl text-brand-dark-900 dark:text-white group-hover:text-highlight-600 transition-colors line-clamp-1 break-word-hyphens"
          />
          <div v-if="date" class="flex items-center gap-2 shrink-0 mt-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-highlight-500" />
            <span class="text-xs font-bold text-gray-500 uppercase">{{ date }}</span>
          </div>
        </div>

        <!-- Beschreibung -->
        <p
          v-if="description"
          class="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 md:line-clamp-3 mb-4 md:mb-6"
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
            class="text-highlight-600 group-hover:text-highlight-700 -ml-2.5 p-0 md:p-2"
          />
        </div>
      </div>

    </div>
  </NuxtLink>
</template>
