<script setup lang="ts">
import type { ResolvedGalleryAlbum } from '~/composables/useGallery'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'

interface Props {
  album: ResolvedGalleryAlbum
  to: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1"
  >
    <!-- 4:3 Cover-Bild mit Badges -->
    <div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <NuxtImg
        :src="album.coverImage"
        :alt="album.title"
        sizes="sm:100vw md:50vw lg:400px"
        loading="lazy"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

      <!-- Jahrgangs-Badge oben links -->
      <div class="absolute top-3 left-3">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-brand-dark-900/85 text-white backdrop-blur-xs">
          {{ album.year }}
        </span>
      </div>

      <!-- Foto- & Video-Anzahl oben rechts -->
      <div class="absolute top-3 right-3 flex items-center gap-1.5">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/65 text-white backdrop-blur-xs">
          <UIcon name="i-heroicons-photo" class="w-4 h-4 text-accent-400" />
          {{ album.photoCount }} {{ album.photoCount === 1 ? 'Foto' : 'Fotos' }}
        </span>
        <span
          v-if="album.videoCount > 0"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/65 text-white backdrop-blur-xs"
        >
          <UIcon name="i-heroicons-video-camera" class="w-4 h-4 text-accent-400" />
          {{ album.videoCount }}
        </span>
      </div>
    </div>

    <!-- Karten-Inhalt -->
    <div class="flex flex-col flex-grow p-5">
      <div v-if="album.date" class="flex items-center gap-1.5 mb-2">
        <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-accent-500 shrink-0" />
        <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {{ album.date }}
        </span>
      </div>

      <Headline
        :title="album.title"
        tag="h2"
        size="h4"
        margin-bottom="none"
        title-class="text-xl font-bold text-brand-dark-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2 mb-2"
      />

      <p
        v-if="album.description"
        class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4"
      >
        {{ album.description }}
      </p>

      <div class="mt-auto pt-2">
        <Button
          label="Album ansehen"
          variant="ghost"
          size="sm"
          trailing-icon="i-heroicons-arrow-small-right"
          class="text-accent-600 group-hover:text-accent-700 -ml-2.5 p-0"
        />
      </div>
    </div>
  </NuxtLink>
</template>
