<script setup lang="ts">
import { NuxtLink } from '#components'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import BaseIcon from '~/components/base/Icon.vue'
import 'swiper/css'
import 'swiper/css/pagination'

export interface SponsorItem {
  src: string
  url?: string
  alt?: string
}

interface Props {
  items?: SponsorItem[]
  autoplay?: boolean | { delay: number }
  contained?: boolean
}

const defaultItems: SponsorItem[] = [
  { src: '/img/sponsors/logo_fsd_fruhen_schulze_dupuis.jpg', url: 'https://www.fsd-metallbau.de', alt: 'FSD Fruhen Schulze Dupuis GmbH' },
  { src: '/img/sponsors/logo_ansgar_mertens_immobilien.png', url: 'https://immobilienvermittlung.nrw/', alt: 'Ansgar Mertens Immobilien' },
  { src: '/img/sponsors/logo_consys.png', url: 'https://zollsoftware-atlas.de/', alt: 'Consys Group' },
  { src: '/img/sponsors/logo_moll_bedachungen.png', url: 'https://moll-bedachungen.de/', alt: 'Moll Bedachungen' },
  { src: '/img/sponsors/logo_kroker.png', url: 'https://www.kroker-werbeprofi.de/', alt: 'Kroker Werbeprofi' },
  { src: '/img/sponsors/logo_fuchsbau.jpg', url: 'https://fuchsbau-mg.de/', alt: 'Gaststätte Fuchsbau 54' },
  { src: '/img/sponsors/logo_volksbank_immobilien.jpg', url: 'https://www.vobaimmo.de', alt: 'VOBA Immobilien eG' },
  { src: '/img/sponsors/logo_gs_metallbau_goelden_seewal.png', url: 'https://www.goelden-seewald.de/', alt: 'G+S Metallbau Gölden u. Seewald' },
  { src: '/img/sponsors/logo_tieves_schreinerei.png', url: 'https://www.schreinerei-tieves.de/', alt: 'Tieves Schreinerei' },
  { src: '/img/sponsors/logo_heister.jpg', url: 'https://www.sport-heister.de/filiale-3193.asp?shoID=3193', alt: 'Sport Heister' },
  { src: '/img/sponsors/logo_sparkasse_moenchengladbach.jpg', url: 'https://www.sparkasse-moenchengladbach.de/', alt: 'Sparkasse Mönchengladbach' },
  { src: '/img/sponsors/immobilien-kellers.png', url: 'https://kellers-immobilien.de/', alt: 'Immobilien Kellers' }
]

const props = defineProps<Props>()

const carouselItems = computed(() => (props.items && props.items.length) ? props.items : defaultItems)

const swiperInstance = ref<any>(null)
const activePage = ref(0)

const breakpoints = computed(() => ({
  0: { slidesPerView: 1, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 3, spaceBetween: 16 },
  1024: { slidesPerView: props.contained ? 4 : 5, spaceBetween: 16 },
  1280: { slidesPerView: props.contained ? 4 : 7, spaceBetween: 16 }
}))

function onSwiper(swiper: any) {
  swiperInstance.value = swiper
}

function onSlideChange(swiper: any) {
  activePage.value = swiper.realIndex
}

function goPrev() {
  swiperInstance.value?.slidePrev()
}

function goNext() {
  swiperInstance.value?.slideNext()
}

function goToSlide(index: number) {
  swiperInstance.value?.slideToLoop(index)
}
</script>

<template>
  <div class="sponsors-carousel">
    <div :class="{ 'is-contained': props.contained }">
      <div class="viewport">
        <Swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :breakpoints="breakpoints"
          class="swiper-container"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <SwiperSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            class="slide"
          >
            <component
              :is="item.url ? NuxtLink : 'div'"
              :to="item.url || undefined"
              :target="item.url ? '_blank' : undefined"
              class="card-link"
            >
              <div class="card">
                <img
                  :src="item.src"
                  :alt="item.alt"
                  class="logo"
                >
              </div>
            </component>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Mobile Navigation Arrows -->
      <div class="arrows">
        <button
          type="button"
          class="arrow-btn"
          aria-label="Vorheriger Sponsor"
          @click="goPrev"
        >
          <BaseIcon name="i-heroicons-arrow-left" class="arrow-icon" />
        </button>
        <button
          type="button"
          class="arrow-btn"
          aria-label="Nächster Sponsor"
          @click="goNext"
        >
          <BaseIcon name="i-heroicons-arrow-right" class="arrow-icon" />
        </button>
      </div>

      <!-- Dots (ab sm) -->
      <div class="dots">
        <button
          v-for="(_, index) in carouselItems"
          :key="index"
          type="button"
          class="dot"
          :class="{ 'is-active': activePage === index }"
          :aria-label="`Gehe zu Sponsor ${index + 1}`"
          @click="goToSlide(index)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sponsors-carousel {
  overflow-x: hidden;
  padding-bottom: var(--space-12);
}

.is-contained {
  max-width: 64rem;
  margin-inline: auto;
  padding-inline: var(--space-4);

  @include up("sm") {
    padding-inline: var(--space-6);
  }
}

.viewport {
  padding-inline: var(--space-8);

  @include up("sm") {
    padding-inline: 0;
  }

  @include up("md") {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
}

.swiper-container {
  overflow: visible;
}

.slide {
  padding-block: var(--space-2);
  height: auto;
}

.card-link {
  display: block;
  height: 100%;
  text-decoration: none;
}

.card {
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: var(--color-pure-white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-300);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);

  @include dark {
    border-color: var(--color-gray-800);
  }

  .card-link:hover & {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-dark-300);
  }
}

.logo {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: filter var(--transition-base), opacity var(--transition-base);

  @include up("lg") {
    filter: brightness(0.95) contrast(1.25) grayscale(100%);
    opacity: 0.9;

    .card-link:hover & {
      filter: brightness(1) contrast(1) grayscale(0%);
      opacity: 1;
    }
  }
}

.arrows {
  display: flex;
  justify-content: space-between;
  padding-inline: var(--space-4);
  margin-top: var(--space-3);

  @include up("md") {
    display: none;
  }
}

.arrow-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-gray-200);
  background-color: var(--color-pure-white);
  color: var(--color-gray-700);
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-50);
  }
}

.arrow-icon {
  width: 1rem;
  height: 1rem;
}

.dots {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: var(--space-6);

  @include up("sm") {
    display: flex;
  }
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: var(--radius-full);
  border: 0;
  padding: 0;
  background-color: var(--color-gray-200);
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-700);
  }

  &.is-active {
    background-color: var(--color-gray-900);

    @include dark {
      background-color: var(--color-white);
    }
  }
}
</style>
