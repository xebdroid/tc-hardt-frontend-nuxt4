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
  { src: '/img/sponsors/logo_tieves_schreinerei.png', url: 'https://www.schreinerei-tieves.de/', alt: 'Tieves Schreinerei' },
  { src: '/img/sponsors/logo_heister.jpg', url: 'https://www.sport-heister.de/filiale-3193.asp?shoID=3193', alt: 'Sport Heister' },
  { src: '/img/sponsors/logo_sparkasse_moenchengladbach.jpg', url: 'https://www.sparkasse-moenchengladbach.de/', alt: 'Sparkasse Mönchengladbach' },
]
</script>

<template>
  <div class="overflow-x-hidden pb-12">
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      dots
      :autoplay="{ delay: 3000 }"
      :items="items"
      :ui="{
        viewport: 'md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        container: 'md:overflow-visible -ms-4 px-8 sm:px-0',
        item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/7 py-2 snap-center ps-4',
        arrows: 'flex md:hidden',
        dots: 'hidden sm:flex',
      }"
    >
      <NuxtLink
        :to="item.url"
        target="_blank"
        class="block group h-full"
      >
        <div
          class="
            aspect-[4/3] flex items-center justify-center p-6
            bg-[#fff] rounded-xl
            border border-gray-300 dark:border-gray-800
            transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-brand-dark-300
          "
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="
              max-w-full max-h-full w-auto h-auto object-contain
              grayscale-0 opacity-100
              lg:grayscale lg:opacity-90 lg:contrast-125 lg:brightness-95
              lg:group-hover:grayscale-0 lg:group-hover:opacity-100 lg:group-hover:contrast-100 lg:group-hover:brightness-100
              transition-all duration-300
            "
          >
        </div>
      </NuxtLink>
    </UCarousel>
  </div>
</template>
