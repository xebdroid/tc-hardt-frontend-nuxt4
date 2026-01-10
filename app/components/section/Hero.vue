<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// --- TYPEN ---
export interface HeroSlide {
  type: 'image' | 'video'
  src: string
  poster?: string
  alt?: string
  overlayImage?: string
  overlayImageClass?: string
  title?: string
  subtitle?: string
  ctaPrimary?: { label: string; to: string }
  ctaSecondary?: { label: string; to: string }
  overlayPosition?: 'center' | 'bottom-left' | 'bottom-right'
}

// --- PROPS ---
const props = withDefaults(defineProps<{
  slides?: HeroSlide[]
  height?: 'full' | 'large' | 'small'
  fallbackClass?: string
  autoplay?: boolean | number
  loopVideo?: boolean
}>(), {
  slides: () => [],
  height: 'large',
  fallbackClass: 'bg-tennis-500',
  autoplay: 5000,
  loopVideo: false
})

const swiperInstance = ref<any>(null)

// --- HÖHEN LOGIK (KORRIGIERT) ---
const containerHeightClass = computed(() => {
  switch (props.height) {
    // KORREKTUR:
    // Mobile: h-screen (Volle Höhe)
    // Desktop (lg): 100vh minus 2rem (für das p-4 Padding oben/unten im Layout)
    case 'full': return 'h-screen lg:h-[calc(100vh-2rem)]'

    case 'large': return 'h-[600px]'
    case 'small': return 'h-[400px]'
    default: return 'h-[600px]'
  }
})

const modules = [Navigation, Pagination, Autoplay, EffectFade]

const handleVideoEnded = () => {
  if (swiperInstance.value && !props.loopVideo) {
    swiperInstance.value.slideNext()
    swiperInstance.value.autoplay.start()
  }
}

const onSlideChange = (swiper: any) => {
  swiperInstance.value = swiper
  const activeIndex = swiper.realIndex
  const currentSlide = props.slides[activeIndex]
  const videoElement = document.querySelector(`.swiper-slide-active video`) as HTMLVideoElement

  if (currentSlide?.type === 'video' && videoElement) {
    swiper.autoplay.stop()
    videoElement.currentTime = 0
    videoElement.play()
  } else {
    swiper.autoplay.start()
  }
}
</script>

<template>
  <div
    class="relative w-full overflow-hidden lg:rounded-3xl"
    :class="[containerHeightClass, !slides.length ? fallbackClass : 'bg-gray-900']"
  >
    <div v-if="!slides.length" class="relative h-full w-full flex flex-col justify-center items-center p-8 sm:p-16 text-center">
      <slot name="content" :slide="null" />
    </div>

    <component
      :is="slides.length > 1 ? Swiper : 'div'"
      v-else
      :modules="modules"
      :slides-per-view="1"
      effect="fade"
      :loop="true"
      :autoplay="slides.length > 1 ? { delay: typeof autoplay === 'number' ? autoplay : 5000, disableOnInteraction: false } : false"
      :pagination="{ clickable: true, el: '.custom-pagination' }"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
      class="h-full w-full group"
      :class="{ 'relative': slides.length === 1 }"
      @swiper="(s) => swiperInstance = s"
      @slide-change="onSlideChange"
    >
      <component
        :is="slides.length > 1 ? SwiperSlide : 'div'"
        v-for="(slide, index) in slides"
        :key="index"
        class="relative bg-gray-900 h-full w-full"
      >
        <div class="absolute inset-0 select-none">
          <video
            v-if="slide.type === 'video'"
            :src="slide.src"
            :poster="slide.poster"
            class="w-full h-full object-cover"
            muted
            playsinline
            :loop="loopVideo"
            @ended="handleVideoEnded"
          />
          <img
            v-else
            :src="slide.src"
            :alt="slide.alt"
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div
          class="relative z-10 h-full w-full flex flex-col p-8 sm:p-16 lg:px-24 transition-all duration-500"
          :class="{
            'justify-center items-center text-center': !slide.overlayPosition || slide.overlayPosition === 'center',
            'justify-end items-end text-right': slide.overlayPosition === 'bottom-right',
            'justify-end items-start text-left': slide.overlayPosition === 'bottom-left'
          }"
        >

          <slot name="content" :slide="slide">
            <img
              v-if="slide.overlayImage"
              :src="slide.overlayImage"
              class="mb-6 h-auto"
              :class="slide.overlayImageClass || 'w-24 sm:w-32'"
              alt="Overlay Icon"
            >

            <h2 v-if="slide.title" class="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-heading drop-shadow-lg">
              {{ slide.title }}
            </h2>

            <p v-if="slide.subtitle" class="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              {{ slide.subtitle }}
            </p>

            <div
              v-if="slide.ctaPrimary || slide.ctaSecondary"
              class="flex flex-wrap gap-4"
              :class="{ 'justify-center': !slide.overlayPosition || slide.overlayPosition === 'center' }"
            >
              <UButton
                v-if="slide.ctaPrimary"
                :to="slide.ctaPrimary.to"
                :label="slide.ctaPrimary.label"
                size="xl"
                variant="solid"
                class="font-bold !bg-primary-500 !text-slate-900"
              />
              <UButton
                v-if="slide.ctaSecondary"
                :to="slide.ctaSecondary.to"
                :label="slide.ctaSecondary.label"
                size="xl"
                variant="ghost"
                class="font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              />
            </div>
          </slot>
        </div>
      </component>

      <div v-if="slides.length > 1" class="custom-pagination absolute bottom-8 left-0 right-0 flex justify-center z-20 hidden lg:flex [&>.swiper-pagination-bullet]:bg-white [&>.swiper-pagination-bullet-active]:bg-primary-500"/>

      <button v-if="slides.length > 1" class="custom-prev absolute top-1/2 left-4 z-20 -translate-y-1/2 text-white/70 hover:text-white lg:hidden">
        <UIcon name="i-heroicons-chevron-left" class="w-10 h-10" />
      </button>
      <button v-if="slides.length > 1" class="custom-next absolute top-1/2 right-4 z-20 -translate-y-1/2 text-white/70 hover:text-white lg:hidden">
        <UIcon name="i-heroicons-chevron-right" class="w-10 h-10" />
      </button>

    </component>
  </div>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  opacity: 0.5;
  transition: all 0.3s;
}
:deep(.swiper-pagination-bullet-active) {
  width: 24px;
  border-radius: 5px;
  opacity: 1;
}
</style>
