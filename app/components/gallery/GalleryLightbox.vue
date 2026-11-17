<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import type { GalleryImage } from '~/types'

interface Props {
  images: GalleryImage[]
  modelValue: number | null
  albumTitle?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const isOpen = computed(() => props.modelValue !== null && props.images.length > 0)
const currentIndex = computed(() => props.modelValue ?? 0)
const currentImage = computed(() => props.images[currentIndex.value])

const close = () => {
  emit('update:modelValue', null)
}

const prev = () => {
  if (!props.images.length || props.modelValue === null) return
  const nextIdx = (props.modelValue - 1 + props.images.length) % props.images.length
  emit('update:modelValue', nextIdx)
}

const next = () => {
  if (!props.images.length || props.modelValue === null) return
  const nextIdx = (props.modelValue + 1) % props.images.length
  emit('update:modelValue', nextIdx)
}

const selectIndex = (index: number) => {
  emit('update:modelValue', index)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

watch(isOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && currentImage"
        class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col justify-between select-none"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <!-- Top-Leiste (Zähler, Titel & Schließen) -->
        <div class="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 text-white bg-gradient-to-b from-black/70 to-transparent z-10">
          <div class="flex items-center gap-3 min-w-0">
            <span class="px-3 py-1 rounded-full bg-white/15 text-xs md:text-sm font-bold shrink-0">
              {{ currentIndex + 1 }} / {{ images.length }}
            </span>
            <span v-if="albumTitle" class="text-sm md:text-base font-medium text-gray-200 truncate hidden sm:inline">
              {{ albumTitle }}
            </span>
          </div>

          <button
            type="button"
            class="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Schließen"
            @click="close"
          >
            <BaseIcon name="i-heroicons-x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Hauptbild-Bereich (Originalformat) -->
        <div
          class="relative flex-1 flex items-center justify-center px-4 md:px-16 min-h-0"
          @click.self="close"
        >
          <!-- Zurück-Pfeil -->
          <button
            v-if="images.length > 1"
            type="button"
            class="absolute left-2 md:left-6 z-10 p-2.5 md:p-3 rounded-full bg-black/50 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
            aria-label="Vorheriges Bild"
            @click.stop="prev"
          >
            <BaseIcon name="i-heroicons-chevron-left" class="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <div class="flex flex-col items-center max-h-full max-w-full">
            <video
              v-if="currentImage.type === 'video'"
              :key="currentImage.src"
              :src="currentImage.src"
              controls
              autoplay
              playsinline
              class="max-h-[72vh] md:max-h-[76vh] max-w-[92vw] md:max-w-[82vw] w-auto h-auto rounded-lg shadow-2xl bg-black"
            />
            <img
              v-else
              :key="currentImage.src"
              :src="currentImage.src"
              :alt="currentImage.alt || albumTitle || 'Galeriebild'"
              class="max-h-[72vh] md:max-h-[76vh] max-w-[92vw] md:max-w-[82vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
            >
            <p
              v-if="currentImage.caption"
              class="mt-3 text-center text-sm md:text-base text-gray-200 max-w-2xl px-4"
            >
              {{ currentImage.caption }}
            </p>
          </div>

          <!-- Weiter-Pfeil -->
          <button
            v-if="images.length > 1"
            type="button"
            class="absolute right-2 md:right-6 z-10 p-2.5 md:p-3 rounded-full bg-black/50 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
            aria-label="Nächstes Bild"
            @click.stop="next"
          >
            <BaseIcon name="i-heroicons-chevron-right" class="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>

        <!-- Thumbnail-Leiste unten -->
        <div
          v-if="images.length > 1"
          class="px-4 py-3 md:py-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center overflow-x-auto gap-2"
        >
          <button
            v-for="(img, idx) in images"
            :key="img.src"
            type="button"
            class="relative w-14 h-10 md:w-16 md:h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-gray-900"
            :class="idx === currentIndex ? 'border-accent-400 scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'"
            @click.stop="selectIndex(idx)"
          >
            <template v-if="img.type === 'video'">
              <video
                :src="`${img.src}#t=0.5`"
                preload="metadata"
                muted
                playsinline
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <BaseIcon name="i-heroicons-play-solid" class="w-4 h-4 text-white" />
              </div>
            </template>
            <img
              v-else
              :src="img.src"
              :alt="img.alt || ''"
              class="w-full h-full object-cover"
              loading="lazy"
            >
          </button>
        </div>
        <div v-else class="h-4" />
      </div>
    </Transition>
  </Teleport>
</template>
