<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHero from '~/components/sections/PageHero.vue'
import Section from '~/components/base/Section.vue'
import BaseGrid from '~/components/base/Grid.vue'
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
  <div class="gallery-page">
    <PageHero
      title="Bildergalerie"
      description="Impressionen von unseren Turnieren, Events und dem Vereinsleben."
    />

    <Section
      variant="secondary-light"
      card
      spacing="compact"
    >
      <!-- Jahrgangs-Filter-Tabs -->
      <div
        v-if="years.length > 0"
        class="filter-tabs"
      >
        <button
          type="button"
          class="filter-tab"
          :class="{ 'is-active': selectedYear === 'all' }"
          @click="selectedYear = 'all'"
        >
          <span>Alle</span>
          <span class="tab-count">
            {{ galleries.length }}
          </span>
        </button>

        <button
          v-for="year in years"
          :key="year"
          type="button"
          class="filter-tab"
          :class="{ 'is-active': selectedYear === year }"
          @click="selectedYear = year"
        >
          <span>{{ year }}</span>
          <span class="tab-count">
            {{ getYearCount(year) }}
          </span>
        </button>
      </div>

      <!-- 3-Spalten-Alben-Grid -->
      <BaseGrid
        v-if="filteredGalleries.length > 0"
        :cols="3"
      >
        <GalleryAlbumCard
          v-for="album in filteredGalleries"
          :key="album.id"
          :album="album"
          :to="localePath(`/galerie/${album.slug}`)"
        />
      </BaseGrid>

      <div v-else class="empty-state">
        <p class="empty-text">
          Für diesen Jahrgang sind aktuell noch keine Alben vorhanden.
        </p>
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin-bottom: var(--space-10);

  @include up('sm') {
    gap: var(--space-3);
  }
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  transition: all var(--transition-fast);
  cursor: pointer;
  background-color: var(--color-pure-white);
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-200);

  @include dark {
    background-color: var(--color-gray-800);
    color: var(--color-gray-300);
    border-color: var(--color-gray-700);
  }

  &:hover:not(.is-active) {
    border-color: var(--color-accent-400);
    color: var(--color-accent-600);
  }

  &.is-active {
    background-color: var(--color-brand-dark-800);
    color: var(--color-pure-white);
    border-color: var(--color-brand-dark-800);
    box-shadow: var(--shadow-sm);

    .tab-count {
      background-color: rgb(255 255 255 / 0.2);
      color: var(--color-pure-white);
    }
  }
}

.tab-count {
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  line-height: 1rem;
  background-color: var(--color-gray-100);
  color: var(--color-gray-600);

  @include dark {
    background-color: var(--color-gray-700);
    color: var(--color-gray-300);
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
</style>
