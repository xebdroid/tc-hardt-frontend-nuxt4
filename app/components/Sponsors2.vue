<script setup lang="ts">
const { t } = useI18n()

// Die Bilder müssen in 'public/img/sponsors/' liegen.
const items = [
  {
    src: '/img/sponsors/logo_fsd_fruhen_schulze_dupuis.jpg',
    url: 'https://www.fsd-metallbau.de',
    alt: 'FSD Fruhen Schulze Dupuis GmbH'
  },
  {
    src: '/img/sponsors/logo_ansgar_mertens_immobilien.png',
    url: '#',
    alt: 'Ansgar Mertens Immobilien'
  },
  {
    src: '/img/sponsors/logo_consys.png',
    url: '#',
    alt: 'Consys Group'
  },
  {
    src: '/img/sponsors/logo_moll_bedachungen.png',
    url: '#',
    alt: 'Moll Bedachungen'
  },
  {
    src: '/img/sponsors/logo_kroker.png',
    url: '#',
    alt: 'Kroker Werbeprofi'
  },
  {
    src: '/img/sponsors/logo_fuchsbau.jpg',
    url: '#',
    alt: 'Gaststätte Fuchsbau 54'
  },
  {
    src: '/img/sponsors/logo_volksbank_immobilien.jpg',
    url: 'https://www.vobaimmo.de',
    alt: 'VOBA Immobilien eG'
  },
  {
    src: '/img/sponsors/logo_gs_metallbau_goelden_seewal.png',
    url: '#',
    alt: 'G+S Metallbau Gölden u. Seewald'
  },
  {
    src: '/img/sponsors/logo_tieves_schreinerei.png',
    url: '#',
    alt: 'Tieves Schreinerei'
  }
]
</script>

<template>
  <div class="py-12">

    <div class="text-center mb-10 px-4">
      <h2 class="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2">
        {{ t('sponsors.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {{ t('sponsors.subtitle') }}
      </p>
    </div>

    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      :autoplay="{ delay: 3000 }"
      :items="items"
      :ui="{
        item: 'basis-1/2 md:basis-1/4 lg:basis-1/6 px-6'
      }"
      class="w-full"
    >
      <NuxtLink
        :to="item.url"
        target="_blank"
        class="block group rounded-lg overflow-hidden shadow-sm"
      >
        <div class="aspect-[4/3] flex items-center justify-center bg-white dark:bg-gray-800 p-4">
          <img
            :src="item.src"
            :alt="item.alt"
            class="max-w-full max-h-full w-auto h-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
          >
        </div>
      </NuxtLink>
    </UCarousel>
  </div>
</template>
