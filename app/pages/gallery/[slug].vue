<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import GalleryLightbox from '~/components/gallery/GalleryLightbox.vue'
import { useGallery } from '~/composables/useGallery'

const route = useRoute()
const localePath = useLocalePath()
const { getGalleryBySlug } = useGallery()

const album = computed(() => {
  return getGalleryBySlug(String(route.params.slug || ''))
})

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

const activeLightboxIndex = ref<number | null>(null)

const openLightbox = (index: number) => {
  activeLightboxIndex.value = index
}
</script>

<template>
  <div v-if="album">
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <div class="flex flex-col items-center gap-6">
          <Headline
            title="Bildergalerie"
            tag="h1"
            size="h1"
            mode="light"
            alignment="center"
            margin-bottom="none"
          />
          <Button
            :to="localePath('/galerie')"
            variant="ghost-white"
            label="Zurück zur Galerie"
            icon="i-heroicons-arrow-left"
          />
        </div>
      </template>
    </Hero>

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
      <div class="max-w-6xl mx-auto">
        <!-- Album-Header -->
        <div class="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-dark-800 text-white">
              {{ album.year }}
            </span>
            <span v-if="album.date" class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <BaseIcon name="i-heroicons-calendar" class="w-4 h-4 text-accent-500" />
              {{ album.date }}
            </span>
            <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400">
              <BaseIcon name="i-heroicons-photo" class="w-4 h-4 text-accent-500" />
              {{ album.photoCount }} {{ album.photoCount === 1 ? 'Foto' : 'Fotos' }}
            </span>
            <span
              v-if="album.videoCount > 0"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400"
            >
              <BaseIcon name="i-heroicons-video-camera" class="w-4 h-4 text-accent-500" />
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

        <!-- Einheitliches 4:3 Foto-Grid -->
        <div
          v-if="album.images.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <button
            v-for="(img, idx) in album.images"
            :key="img.src"
            type="button"
            class="group relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xs hover:shadow-lg border border-gray-200/80 dark:border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-500"
            @click="openLightbox(idx)"
          >
            <video
              v-if="img.type === 'video'"
              :src="`${img.src}#t=0.5`"
              preload="metadata"
              muted
              playsinline
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <NuxtImg
              v-else
              :src="img.src"
              :alt="img.alt || album.title"
              sizes="sm:100vw md:50vw lg:320px"
              loading="lazy"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <!-- Video-Badge & Play-Button bei Videos -->
            <template v-if="img.type === 'video'">
              <div class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 text-white text-xs font-semibold flex items-center gap-1 backdrop-blur-xs">
                <BaseIcon name="i-heroicons-video-camera" class="w-3.5 h-3.5 text-accent-400" />
                Video
              </div>
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-accent-500/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200">
                  <BaseIcon name="i-heroicons-play-solid" class="w-6 h-6 ml-0.5" />
                </div>
              </div>
            </template>
            <!-- Lupen-Icon bei Fotos -->
            <div
              v-else
              class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center"
            >
              <div class="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-200">
                <BaseIcon name="i-heroicons-magnifying-glass-plus" class="w-5 h-5" />
              </div>
            </div>
            <div
              v-if="img.caption"
              class="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/75 via-black/40 to-transparent text-left opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span class="text-xs text-white font-medium line-clamp-1">
                {{ img.caption }}
              </span>
            </div>
          </button>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-500">
            In diesem Album befinden sich aktuell noch keine Fotos.
          </p>
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

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Album nicht gefunden</h1>
      <NuxtLink :to="localePath('/galerie')" class="text-accent-600 hover:underline">
        Zurück zur Galerie
      </NuxtLink>
    </div>
  </div>
</template>
