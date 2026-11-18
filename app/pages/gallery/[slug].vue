<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '~/components/base/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import GalleryLightbox from '~/components/gallery/GalleryLightbox.vue'
import { useGallery } from '~/composables/useGallery'

const PAGE_SIZE = 24

const route = useRoute()
const localePath = useLocalePath()
const { getGalleryBySlug } = useGallery()
const $img = useImage()

const album = computed(() => {
  return getGalleryBySlug(String(route.params.slug || ''))
})

const getGridThumbUrl = (src: string) => {
  return $img(src, {
    width: 480,
    height: 360,
    fit: 'cover',
    format: 'webp',
    quality: 75
  })
}

const getLightboxThumbUrl = (src: string) => {
  return $img(src, {
    width: 120,
    height: 90,
    fit: 'cover',
    format: 'webp',
    quality: 70
  })
}

// Beim statischen Build (nuxt generate) alle WebP-Thumbnails des Albums vorab registrieren,
// damit auch per Infinite Scroll nachgeladene Bilder als statische _ipx-Dateien existieren.
if (import.meta.server && import.meta.prerender && album.value) {
  const thumbRoutes: string[] = []
  for (const img of album.value.images) {
    if (img.type !== 'video') {
      thumbRoutes.push(getGridThumbUrl(img.src))
      thumbRoutes.push(getLightboxThumbUrl(img.src))
    }
  }
  if (thumbRoutes.length > 0) {
    prerenderRoutes(thumbRoutes)
  }
}

if (album.value) {
  useSeoMeta({
    title: () => `${album.value!.title} – Galerie`,
    ogTitle: () => `${album.value!.title} – Galerie`,
    description: () => album.value!.description || `Bildergalerie: ${album.value!.title} (${album.value!.date})`,
    ogDescription: () => album.value!.description || `Bildergalerie: ${album.value!.title} (${album.value!.date})`,
    ogImage: () => album.value!.coverImage || '/img/logo.png',
    twitterCard: 'summary_large_image',
  })
} else {
  useSeoMeta({
    title: 'Album nicht gefunden',
    robots: 'noindex, nofollow'
  })
}

// --- Infinite Scroll ---
const visibleCount = ref(PAGE_SIZE)
const loadMoreSentinel = ref<HTMLElement | null>(null)
let sentinelObserver: IntersectionObserver | null = null

const totalCount = computed(() => album.value?.images.length || 0)

const visibleImages = computed(() => {
  if (!album.value) return []
  return album.value.images.slice(0, visibleCount.value)
})

const hasMore = computed(() => visibleCount.value < totalCount.value)

const loadMore = () => {
  if (!hasMore.value) return
  visibleCount.value = Math.min(visibleCount.value + PAGE_SIZE, totalCount.value)
}

// --- Lazy Video Loading (Videos erst im Viewport aktivieren) ---
const visibleVideoSrcs = ref<Set<string>>(new Set())
let videoObserver: IntersectionObserver | null = null

const registerVideoTile = (el: Element | ComponentPublicInstance | null, src: string) => {
  if (!import.meta.client || !el || !(el instanceof HTMLElement)) return
  if (visibleVideoSrcs.value.has(src)) return
  el.dataset.videoSrc = src
  videoObserver?.observe(el)
}

const isVideoInView = (src: string) => {
  return visibleVideoSrcs.value.has(src)
}

const setupObservers = () => {
  if (!import.meta.client) return

  sentinelObserver?.disconnect()
  if ('IntersectionObserver' in window) {
    sentinelObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some(e => e.isIntersecting)) {
          loadMore()
        }
      },
      { rootMargin: '450px 0px' }
    )
    if (loadMoreSentinel.value) {
      sentinelObserver.observe(loadMoreSentinel.value)
    }

    if (!videoObserver) {
      videoObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement
              const src = target.dataset.videoSrc
              if (src) {
                visibleVideoSrcs.value.add(src)
              }
              videoObserver?.unobserve(target)
            }
          }
        },
        { rootMargin: '250px 0px' }
      )
    }
  }
}

watch(loadMoreSentinel, (el) => {
  if (el && sentinelObserver) {
    sentinelObserver.observe(el)
  }
})

watch(() => route.params.slug, async () => {
  visibleCount.value = PAGE_SIZE
  visibleVideoSrcs.value.clear()
  await nextTick()
  setupObservers()
})

onMounted(() => {
  setupObservers()
})

onUnmounted(() => {
  sentinelObserver?.disconnect()
  videoObserver?.disconnect()
})

// --- Lightbox ---
const activeLightboxIndex = ref<number | null>(null)

const openLightbox = (index: number) => {
  activeLightboxIndex.value = index
}

watch(activeLightboxIndex, (idx) => {
  if (idx !== null && idx >= visibleCount.value) {
    visibleCount.value = Math.min(
      Math.ceil((idx + 1) / PAGE_SIZE) * PAGE_SIZE,
      totalCount.value
    )
  }
})
</script>

<template>
  <div v-if="album" class="gallery-detail-page">
    <PageHero
      title="Bildergalerie"
      :back-to="localePath('/galerie')"
      back-label="Zurück zur Galerie"
    />

    <Section
      variant="secondary-light"
      outer-container
      rounded
      :padding-top="{ base: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      margin-bottom="xl"
      margin-top="sm"
    >
      <div class="album-container">
        <!-- Album-Header -->
        <div class="album-header">
          <div class="album-meta">
            <span class="year-badge">
              {{ album.year }}
            </span>
            <span v-if="album.date" class="meta-item">
              <BaseIcon name="i-heroicons-calendar" class="meta-icon" />
              {{ album.date }}
            </span>
            <span class="meta-item">
              <BaseIcon name="i-heroicons-photo" class="meta-icon" />
              {{ album.photoCount }} {{ album.photoCount === 1 ? 'Foto' : 'Fotos' }}
            </span>
            <span
              v-if="album.videoCount > 0"
              class="meta-item"
            >
              <BaseIcon name="i-heroicons-video-camera" class="meta-icon" />
              {{ album.videoCount }} {{ album.videoCount === 1 ? 'Video' : 'Videos' }}
            </span>
          </div>

          <Headline
            :title="album.title"
            :description="album.description"
            tag="h2"
            size="h3"
            mode="dark"
            alignment="left"
            margin-bottom="none"
          />
        </div>

        <!-- Einheitliches 4:3 Foto-Grid (Infinite Scroll) -->
        <div
          v-if="visibleImages.length > 0"
          class="media-grid"
        >
          <button
            v-for="(img, idx) in visibleImages"
            :key="img.src"
            :ref="img.type === 'video' ? (el) => registerVideoTile(el, img.src) : undefined"
            type="button"
            class="media-item"
            @click="openLightbox(idx)"
          >
            <template v-if="img.type === 'video'">
              <video
                v-if="isVideoInView(img.src)"
                :src="`${img.src}#t=0.5`"
                preload="metadata"
                muted
                playsinline
                class="media-thumb"
              />
              <div v-else class="video-placeholder" />
            </template>
            <img
              v-else
              :src="getGridThumbUrl(img.src)"
              :alt="img.alt || album.title"
              width="480"
              height="360"
              loading="lazy"
              decoding="async"
              class="media-thumb"
            >
            <!-- Video-Badge & Play-Button bei Videos -->
            <template v-if="img.type === 'video'">
              <div class="video-badge">
                <BaseIcon name="i-heroicons-video-camera" class="video-badge-icon" />
                Video
              </div>
              <div class="video-overlay">
                <div class="play-circle">
                  <BaseIcon name="i-heroicons-play-solid" class="play-icon" />
                </div>
              </div>
            </template>
            <!-- Lupen-Icon bei Fotos -->
            <div
              v-else
              class="photo-overlay"
            >
              <div class="zoom-circle">
                <BaseIcon name="i-heroicons-magnifying-glass-plus" class="zoom-icon" />
              </div>
            </div>
            <div
              v-if="img.caption"
              class="caption-bar"
            >
              <span class="caption-text">
                {{ img.caption }}
              </span>
            </div>
          </button>
        </div>

        <div v-else class="empty-state">
          <p class="empty-text">
            In diesem Album befinden sich aktuell noch keine Fotos.
          </p>
        </div>

        <!-- Infinite-Scroll Sentinel & Statusanzeige -->
        <div
          v-if="totalCount > PAGE_SIZE"
          ref="loadMoreSentinel"
          class="load-more-footer"
        >
          <p class="progress-text">
            {{ visibleImages.length }} von {{ totalCount }} Medien geladen
          </p>
          <Button
            v-if="hasMore"
            variant="outline"
            size="md"
            label="Weitere Fotos laden"
            icon="i-heroicons-arrow-down"
            @click="loadMore"
          />
        </div>
      </div>
    </Section>

    <!-- Vollbild-Lightbox -->
    <GalleryLightbox
      v-model="activeLightboxIndex"
      :images="album.images"
      :album-title="album.title"
    />
  </div>

  <div v-else class="not-found">
    <div class="not-found-box">
      <h1 class="not-found-title">Album nicht gefunden</h1>
      <NuxtLink :to="localePath('/galerie')" class="not-found-link">
        Zurück zur Galerie
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album-container {
  max-width: 72rem;
  margin-inline: auto;
}

.album-header {
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-gray-200);

  @include dark {
    border-bottom-color: var(--color-gray-700);
  }
}

.album-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.year-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  background-color: var(--color-brand-dark-800);
  color: var(--color-pure-white);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent-500);
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);

  @include up('sm') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include up('md') {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include up('lg') {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.media-item {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  padding: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-gray-100);
  box-shadow: var(--shadow-xs);
  border: 1px solid rgb(229 231 235 / 0.8);
  cursor: pointer;
  transition: box-shadow var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-accent-500);
  }

  &:hover {
    box-shadow: var(--shadow-lg);

    .media-thumb {
      transform: scale(1.05);
    }

    .video-overlay {
      background-color: rgb(0 0 0 / 0.35);
    }

    .play-circle {
      transform: scale(1.1);
    }

    .photo-overlay {
      background-color: rgb(0 0 0 / 0.25);
    }

    .zoom-circle {
      opacity: 1;
      transform: scale(1);
    }

    .caption-bar {
      opacity: 1;
    }
  }
}

.media-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-brand-dark-900), var(--color-gray-800));
}

.video-badge {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  background-color: rgb(0 0 0 / 0.7);
  color: var(--color-pure-white);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  backdrop-filter: blur(2px);
}

.video-badge-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-accent-400);
}

.video-overlay {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.2);
  transition: background-color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-circle {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: rgb(249 115 22 / 0.9);
  color: var(--color-pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: transform 200ms ease;
}

.play-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.125rem;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background-color: transparent;
  transition: background-color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background-color: rgb(0 0 0 / 0.6);
  color: var(--color-pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.9);
  transition: all 200ms ease;
}

.zoom-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.caption-bar {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 0.625rem;
  background: linear-gradient(to top, rgb(0 0 0 / 0.75), rgb(0 0 0 / 0.4), transparent);
  text-align: left;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.caption-text {
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-pure-white);
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.load-more-footer {
  margin-top: var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.progress-text {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.empty-state {
  text-align: center;
  padding-block: var(--space-12);
}

.empty-text {
  margin: 0;
  color: var(--color-gray-500);
}

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-box {
  text-align: center;
}

.not-found-title {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin: 0 0 var(--space-4);
}

.not-found-link {
  color: var(--color-accent-600);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
