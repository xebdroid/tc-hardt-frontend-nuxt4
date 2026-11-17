<script setup lang="ts">
import { ref, computed } from 'vue'
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import GalleryAlbumCard from '~/components/gallery/GalleryAlbumCard.vue'
import { useGallery } from '~/composables/useGallery'

useSeoMeta({
  title: 'Bildergalerie',
  ogTitle: 'Bildergalerie | TC Hardt e.V.',
  description: 'Impressionen aus unserem Vereinsleben: Fotos von Turnieren, Veranstaltungen und gemeinsamen Momenten beim TC Hardt.',
  ogDescription: 'Impressionen aus unserem Vereinsleben: Fotos von Turnieren, Veranstaltungen und gemeinsamen Momenten beim TC Hardt.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

const localePath = useLocalePath()
const { galleries, years } = useGallery()

const selectedYear = ref<number | 'all'>('all')

const filteredGalleries = computed(() => {
  if (selectedYear.value === 'all') {
    return galleries.value
  }
  return galleries.value.filter(album => album.year === selectedYear.value)
})

const getYearCount = (year: number) => {
  return galleries.value.filter(album => album.year === year).length
}
</script>

<template>
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Bildergalerie"
          description="Impressionen von unseren Turnieren, Events und dem Vereinsleben."
          tag="h1"
          size="h1"
          mode="light"
          alignment="center"
          margin-bottom="sm"
        />
      </template>
    </Hero>

    <Section
      variant="secondary-light"
      margin-top="sm"
      margin-bottom="xl"
      :padding-top="{ base: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      :outer-container="{ base: false, md: true }"
      rounded
    >
      <!-- Jahrgangs-Filter-Tabs -->
      <div
        v-if="years.length > 0"
        class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
      >
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer border"
          :class="selectedYear === 'all'
            ? 'bg-brand-dark-800 text-white border-brand-dark-800 shadow-sm'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent-400 hover:text-accent-600'"
          @click="selectedYear = 'all'"
        >
          <span>Alle</span>
          <span
            class="px-2 py-0.5 rounded-full text-xs"
            :class="selectedYear === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'"
          >
            {{ galleries.length }}
          </span>
        </button>

        <button
          v-for="year in years"
          :key="year"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer border"
          :class="selectedYear === year
            ? 'bg-brand-dark-800 text-white border-brand-dark-800 shadow-sm'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-accent-400 hover:text-accent-600'"
          @click="selectedYear = year"
        >
          <span>{{ year }}</span>
          <span
            class="px-2 py-0.5 rounded-full text-xs"
            :class="selectedYear === year ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'"
          >
            {{ getYearCount(year) }}
          </span>
        </button>
      </div>

      <!-- 3-Spalten-Alben-Grid -->
      <div
        v-if="filteredGalleries.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <GalleryAlbumCard
          v-for="album in filteredGalleries"
          :key="album.id"
          :album="album"
          :to="localePath(`/galerie/${album.slug}`)"
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500">
          Für diesen Jahrgang sind aktuell noch keine Alben vorhanden.
        </p>
      </div>
    </Section>
  </div>
</template>
