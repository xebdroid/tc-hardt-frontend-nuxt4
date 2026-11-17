<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import type { GalleryImage } from '~/types'
import BaseIcon from '~/components/base/Icon.vue'

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
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen && currentImage"
        class="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <!-- Top-Leiste -->
        <div class="top-bar">
          <div class="top-left">
            <span class="counter">
              {{ currentIndex + 1 }} / {{ images.length }}
            </span>
            <span v-if="albumTitle" class="album-title">
              {{ albumTitle }}
            </span>
          </div>

          <button
            type="button"
            class="close-btn"
            aria-label="Schließen"
            @click="close"
          >
            <BaseIcon name="i-heroicons-x-mark" class="close-icon" />
          </button>
        </div>

        <!-- Hauptbild-Bereich -->
        <div class="stage" @click.self="close">
          <button
            v-if="images.length > 1"
            type="button"
            class="nav-btn is-prev"
            aria-label="Vorheriges Bild"
            @click.stop="prev"
          >
            <BaseIcon name="i-heroicons-chevron-left" class="nav-icon" />
          </button>

          <div class="media-box">
            <video
              v-if="currentImage.type === 'video'"
              :key="currentImage.src"
              :src="currentImage.src"
              controls
              autoplay
              playsinline
              class="media-el is-video"
            />
            <img
              v-else
              :key="currentImage.src"
              :src="currentImage.src"
              :alt="currentImage.alt || albumTitle || 'Galeriebild'"
              class="media-el is-img"
            >
            <p v-if="currentImage.caption" class="caption">
              {{ currentImage.caption }}
            </p>
          </div>

          <button
            v-if="images.length > 1"
            type="button"
            class="nav-btn is-next"
            aria-label="Nächstes Bild"
            @click.stop="next"
          >
            <BaseIcon name="i-heroicons-chevron-right" class="nav-icon" />
          </button>
        </div>

        <!-- Thumbnail-Leiste -->
        <div v-if="images.length > 1" class="thumb-bar">
          <button
            v-for="(img, idx) in images"
            :key="img.src"
            type="button"
            class="thumb-btn"
            :class="{ 'is-active': idx === currentIndex }"
            @click.stop="selectIndex(idx)"
          >
            <template v-if="img.type === 'video'">
              <video
                :src="`${img.src}#t=0.5`"
                preload="metadata"
                muted
                playsinline
                class="thumb-media"
              />
              <div class="thumb-play-overlay">
                <BaseIcon name="i-heroicons-play-solid" class="play-icon" />
              </div>
            </template>
            <img
              v-else
              :src="img.src"
              :alt="img.alt || ''"
              class="thumb-media"
              loading="lazy"
            >
          </button>
        </div>
        <div v-else class="bottom-spacer" />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.gallery-lightbox {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background-color: rgb(0 0 0 / 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  color: var(--color-white);
  background-image: linear-gradient(to bottom, rgb(0 0 0 / 0.7), transparent);
  z-index: 10;

  @include up("md") {
    padding: var(--space-4) var(--space-8);
  }
}

.top-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
}

.counter {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background-color: rgb(255 255 255 / 0.15);
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;

  @include up("md") {
    font-size: 0.875rem;
  }
}

.album-title {
  display: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-200);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @include up("sm") {
    display: inline;
  }

  @include up("md") {
    font-size: 1rem;
  }
}

.close-btn {
  padding: var(--space-2);
  border-radius: var(--radius-full);
  border: 0;
  background-color: rgb(255 255 255 / 0.1);
  color: var(--color-white);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: rgb(255 255 255 / 0.25);
  }
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--space-4);
  min-height: 0;

  @include up("md") {
    padding-inline: var(--space-16);
  }
}

.nav-btn {
  position: absolute;
  z-index: 10;
  padding: 0.625rem;
  border-radius: var(--radius-full);
  background-color: rgb(0 0 0 / 0.5);
  color: var(--color-white);
  border: 1px solid rgb(255 255 255 / 0.15);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: rgb(255 255 255 / 0.2);
  }

  &.is-prev {
    left: var(--space-2);
    @include up("md") { left: var(--space-6); }
  }

  &.is-next {
    right: var(--space-2);
    @include up("md") { right: var(--space-6); }
  }

  @include up("md") {
    padding: 0.75rem;
  }
}

.nav-icon {
  width: 1.5rem;
  height: 1.5rem;

  @include up("md") {
    width: 1.75rem;
    height: 1.75rem;
  }
}

.media-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
}

.media-el {
  max-height: 72vh;
  max-width: 92vw;
  width: auto;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2xl);

  @include up("md") {
    max-height: 76vh;
    max-width: 82vw;
  }

  &.is-video {
    background-color: var(--color-black);
  }

  &.is-img {
    object-fit: contain;
  }
}

.caption {
  margin: var(--space-3) 0 0;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-gray-200);
  max-width: 42rem;
  padding-inline: var(--space-4);

  @include up("md") {
    font-size: 1rem;
  }
}

.thumb-bar {
  padding: var(--space-3) var(--space-4);
  background-image: linear-gradient(to top, rgb(0 0 0 / 0.8), transparent);
  display: flex;
  justify-content: center;
  overflow-x: auto;
  gap: var(--space-2);

  @include up("md") {
    padding-block: var(--space-4);
  }
}

.thumb-btn {
  position: relative;
  width: 3.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid transparent;
  background-color: var(--color-gray-900);
  opacity: 0.5;
  cursor: pointer;
  transition: all var(--transition-fast);

  @include up("md") {
    width: 4rem;
    height: 3rem;
  }

  &:hover {
    opacity: 0.8;
  }

  &.is-active {
    border-color: var(--color-accent-400);
    transform: scale(1.05);
    opacity: 1;
  }
}

.thumb-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-play-overlay {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-white);
}

.bottom-spacer {
  height: var(--space-4);
}

.lightbox-fade-enter-active {
  transition: opacity 200ms ease-out;
}
.lightbox-fade-leave-active {
  transition: opacity 150ms ease-in;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
