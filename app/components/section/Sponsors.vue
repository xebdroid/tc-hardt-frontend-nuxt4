<script setup lang="ts">
const { t } = useI18n()

const items = [
  { src: '/img/sponsors/logo_fsd_fruhen_schulze_dupuis.jpg', url: 'https://www.fsd-metallbau.de', alt: 'FSD Fruhen Schulze Dupuis GmbH' },
  { src: '/img/sponsors/logo_ansgar_mertens_immobilien.png', url: 'https://immobilienvermittlung.nrw/', alt: 'Ansgar Mertens Immobilien' },
  { src: '/img/sponsors/logo_consys.png', url: 'https://zollsoftware-atlas.de/', alt: 'Consys Group' },
  { src: '/img/sponsors/logo_moll_bedachungen.png', url: 'https://moll-bedachungen.de/', alt: 'Moll Bedachungen' },
  { src: '/img/sponsors/logo_kroker.png', url: 'https://www.xn--werbeprofi-mnchengladbach-9rc.de/', alt: 'Kroker Werbeprofi' },
  { src: '/img/sponsors/logo_fuchsbau.jpg', url: 'https://fuchsbau-mg.de/', alt: 'Gaststätte Fuchsbau 54' },
  { src: '/img/sponsors/logo_volksbank_immobilien.jpg', url: 'https://www.vobaimmo.de', alt: 'VOBA Immobilien eG' },
  { src: '/img/sponsors/logo_gs_metallbau_goelden_seewal.png', url: 'https://www.goelden-seewald.de/', alt: 'G+S Metallbau Gölden u. Seewald' },
  { src: '/img/sponsors/logo_tieves_schreinerei.png', url: 'https://www.schreinerei-tieves.de/', alt: 'Tieves Schreinerei' }
]
</script>

<template>
  <div class="py-12 relative group/carousel">
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
      :autoplay="{ delay: 113000 }"
      :items="items"
      :ui="{
        container: 'gap-4 px-8 sm:px-0',
        item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/6 py-8 snap-center'
      }"
      class="w-full"
    >
      <NuxtLink
        :to="item.url"
        target="_blank"
        class="block group h-full"
      >
        <div
          class="
          aspect-4/3 flex items-center justify-center p-6
          bg-white rounded-xl
          border border-gray-100 dark:border-none
          transition-transform duration-300 group-hover:scale-105
        "
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="max-w-full max-h-full w-auto h-auto object-contain grayscale-0 opacity-100 lg:grayscale lg:opacity-60 lg:group-hover:grayscale-0 lg:group-hover:opacity-100 transition-all duration-300"
          >
        </div>
      </NuxtLink>
    </UCarousel>
  </div>
</template>
