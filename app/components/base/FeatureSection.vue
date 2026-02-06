<script setup lang="ts">
/**
 * FeatureSection - Eine Komponente für Bild/Text-Kombinationen
 */
import Button from '~/components/base/Button.vue'

interface Props {
  // Bild-Optionen
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'

  // Badge/Sticker-Optionen
  badgeText?: string
  badgeIcon?: string

  // Button-Optionen
  buttonLabel?: string
  buttonTo?: string
  buttonVariant?: 'primary' | 'brand-dark' | 'highlight' | 'outline' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  imagePosition: 'left',
  badgeIcon: 'i-heroicons-star',
  buttonVariant: 'brand-dark'
})

// Logik für die Grid-Reihenfolge auf Desktop
const imageOrderClass = computed(() => {
  return props.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
})

const contentOrderClass = computed(() => {
  return props.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
})
</script>

<template>
  <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

    <div
      class="w-full lg:w-1/2 relative px-4 lg:px-0"
      :class="imageOrderClass"
    >
      <div class="relative z-10 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
        >
      </div>

      <div
        v-if="badgeText"
        class="absolute top-6 right-6 z-30 bg-highlight-400 text-brand-dark-900 p-4 rounded-xl shadow-lg rotate-3 hidden sm:block"
      >
        <div class="flex items-center gap-2">
          <UIcon :name="badgeIcon" class="w-5 h-5" />
          <span class="font-bold font-heading text-sm">{{ badgeText }}</span>
        </div>
      </div>
    </div>

    <div
      class="w-full lg:w-1/2"
      :class="contentOrderClass"
    >
      <slot />

      <div v-if="buttonLabel && buttonTo" class="mt-10 flex justify-end">
        <Button
          :to="buttonTo"
          :variant="buttonVariant"
          :label="buttonLabel"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>
    </div>

  </div>
</template>
