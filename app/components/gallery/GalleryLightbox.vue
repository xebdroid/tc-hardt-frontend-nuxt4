<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
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

const $img = useImage()

const isOpen = computed(() => props.modelValue !== null && props.images.length > 0)
const currentIndex = computed(() => props.modelValue ?? 0)
const currentImage = computed(() => props.images[currentIndex.value])

const thumbBarRef = ref<HTMLElement | null>(null)
const loadedThumbIndices = ref<Set<number>>(new Set())

const THUMB_WINDOW = 12

const getLightboxThumbUrl = (src: string) => {
  return $img(src, {
    width: 120,
    height: 90,
    fit: 'cover',
    format: 'webp',
    quality: 70
  })
}

const shouldRenderThumb = (idx: number) => {
  if (Math.abs(idx - currentIndex.value) <= THUMB_WINDOW) {
    return true
  }
  return loadedThumbIndices.value.has(idx)
}

const updateLoadedWindow = (centerIdx: number) => {
  const total = props.images.length
  if (!total) return
  const start = Math.max(0, centerIdx - THUMB_WINDOW)
  const end = Math.min(total - 1, centerIdx + THUMB_WINDOW)
  for (let i = start; i <= end; i++) {
    loadedThumbIndices.value.add(i)
  }
}

const scrollActiveThumbIntoView = (behavior: ScrollBehavior = 'smooth') => {
  if (!import.meta.client || !thumbBarRef.value) return
  const activeBtn = thumbBarRef.value.querySelector<HTMLElement>(`[data-thumb-idx="${currentIndex.value}"]`)
  if (activeBtn) {
    activeBtn.scrollIntoView({
      behavior,
      inline: 'center',
      block: 'nearest'
    })
  }
}

const preloadAdjacentImages = (centerIdx: number) => {
  if (!import.meta.client || props.images.length <= 1) return
  const total = props.images.length
  const adjacentIndices = [
    (centerIdx + 1) % total,
    (centerIdx - 1 + total) % total
  ]
  for (const idx of adjacentIndices) {
    const item = props.images[idx]
    if (item && item.type !== 'video') {
      const preloadImg = new window.Image()
      preloadImg.src = item.src
    }
  }
}

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

watch(isOpen, async (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      updateLoadedWindow(currentIndex.value)
      preloadAdjacentImages(currentIndex.value)
      await nextTick()
      scrollActiveThumbIntoView('instant' as ScrollBehavior)
    }
  }
})

watch(currentIndex, async (newIdx) => {
  if (!isOpen.value) return
  updateLoadedWindow(newIdx)
  preloadAdjacentImages(newIdx)
  await nextTick()
  scrollActiveThumbIntoView('smooth')
})

watch(() => props.images, () => {
  loadedThumbIndices.value.clear()
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
  <ClientOnly>
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
              decoding="async"
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
        <div
          v-if="images.length > 1"
          ref="thumbBarRef"
          class="thumb-bar"
        >
          <button
            v-for="(img, idx) in images"
            :key="img.src"
            type="button"
            :data-thumb-idx="idx"
            class="thumb-btn"
            :class="{ 'is-active': idx === currentIndex }"
            :aria-label="`Medium ${idx + 1} anzeigen`"
            @click.stop="selectIndex(idx)"
          >
            <template v-if="img.type === 'video'">
              <div class="thumb-video-tile">
                <BaseIcon name="i-heroicons-play-solid" class="play-icon" />
              </div>
            </template>
            <img
              v-else-if="shouldRenderThumb(idx)"
              :src="getLightboxThumbUrl(img.src)"
              :alt="img.alt || ''"
              class="thumb-media"
              loading="lazy"
              decoding="async"
            >
            <span v-else class="thumb-placeholder">
              {{ idx + 1 }}
            </span>
          </button>
        </div>
        <div v-else class="bottom-spacer" />
      </div>
      </Transition>
    </Teleport>
  </ClientOnly>
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
  justify-content: safe center;
  overflow-x: auto;
  gap: var(--space-2);
  scrollbar-width: thin;

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
  display: flex;
  align-items: center;
  justify-content: center;

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

.thumb-video-tile {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-brand-dark-900), var(--color-gray-900));
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-placeholder {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-gray-400);
}

.play-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent-400);
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
