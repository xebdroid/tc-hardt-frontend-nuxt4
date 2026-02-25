<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import type { ButtonVariant } from './Button.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export interface HeroSlide {
  type: 'image' | 'video' | 'color'
  src?: string
  color?: string
  colorClass?: string
  poster?: string
  alt?: string

  // Content & Layout
  overlayClass?: string
  contentImage?: string
  contentImageClass?: string
  title?: string
  titleClass?: string
  subtitle?: string
  subtitleClass?: string
  description?: string
  descriptionClass?: string
  ctaPrimary?: { label: string; to: string, variant?: ButtonVariant, class?: string }
  ctaSecondary?: { label: string; to: string, variant?: ButtonVariant, class?: string }
  contentPosition?:
    'top-left' | 'top-center' | 'top-right' |
    'center-left' | 'center' | 'center-right' |
    'bottom-left' | 'bottom-center' | 'bottom-right'

  // NEU: Eigener Slot-Name für komplett freies HTML
  slotName?: string

  // Theme for text color
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<{
  slides?: HeroSlide[]
  height?: 'full' | 'large' | 'medium' | 'small'
  fallbackClass?: string
  autoplay?: boolean | number
  loopVideo?: boolean
  theme?: 'light' | 'dark',
  removeTopPadding?: boolean
}>(), {
  slides: () => [],
  height: 'large',
  fallbackClass: 'bg-primary-900',
  autoplay: 5000,
  loopVideo: false,
  theme: 'light',
  removeTopPadding: false
})

const swiperInstance = ref<any>(null);

// --- HÖHEN BERECHNUNG ---
const containerHeightClass = computed(() => {
  switch (props.height) {
    case 'full': return 'h-[100svh] lg:h-[calc(100vh-2rem)]'
    case 'large': return 'h-[800px]'
    case 'medium': return 'h-[450px]'
    case 'small': return 'h-[300px]'
    default: return 'h-[450px]'
  }
})

// --- POSITIONIERUNGS-HELFER ---
const getContentClass = (position?: string) => {
  switch (position) {
    case 'top-left':      return 'justify-start items-start text-left'
    case 'top-center':    return 'justify-start items-center text-center'
    case 'top-right':     return 'justify-start items-end text-right'

    case 'center-left':   return 'justify-center items-start text-left'
    case 'center':        return 'justify-center items-center text-center'
    case 'center-right':  return 'justify-center items-end text-right'

    case 'bottom-left':   return 'justify-end items-start text-left'
    case 'bottom-center': return 'justify-end items-center text-center'
    case 'bottom-right':  return 'justify-end items-end text-right'

    default:              return 'justify-center items-center text-center'
  }
}

const modules = [Navigation, Pagination, Autoplay, EffectFade]

// --- VIDEO LOGIK ---
const handleVideoLoaded = (e: Event) => {
  const video = e.target as HTMLVideoElement
  if (swiperInstance.value && swiperInstance.value.autoplay.running) {
    swiperInstance.value.autoplay.stop()
  }
  video.play().catch(() => console.log('Autoplay blocked'))
}

const handleVideoEnded = () => {
  if (swiperInstance.value && !props.loopVideo) {
    swiperInstance.value.slideNext()
    swiperInstance.value.autoplay.start()
  }
}

const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper
  const firstSlide = props.slides[0]
  if (firstSlide && firstSlide.type === 'video') {
    swiper.autoplay.stop()
  }
}

const onSlideChange = (swiper: any) => {
  swiperInstance.value = swiper
  const activeIndex = swiper.realIndex
  const currentSlide = props.slides[activeIndex]

  const activeSlideEl = swiper.slides[swiper.activeIndex]
  const videoElement = activeSlideEl ? activeSlideEl.querySelector('video') : null

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
    :class="[containerHeightClass, !slides.length ? fallbackClass : 'bg-gray-900', `theme-${props.theme}`, { 'pt-[100px]': !removeTopPadding }]"
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
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
    >
      <component
        :is="slides.length > 1 ? SwiperSlide : 'div'"
        v-for="(slide, index) in slides"
        :key="index"
        class="relative bg-gray-900 h-full w-full"
      >
        <div class="absolute inset-0 select-none">
          <div
            v-if="slide.type === 'color'"
            class="w-full h-full"
            :class="slide.colorClass"
            :style="{ backgroundColor: slide.color }"
          />
          <video
            v-else-if="slide.type === 'video'"
            :src="slide.src"
            :poster="slide.poster"
            class="w-full h-full object-cover"
            muted
            playsinline
            :loop="loopVideo"
            @loadeddata="handleVideoLoaded"
            @ended="handleVideoEnded"
          />
          <img
            v-else-if="slide.type === 'image'"
            :src="slide.src"
            :alt="slide.alt"
            class="w-full h-full object-cover"
          >
        </div>

        <div
          v-if="slide.overlayClass"
          class="absolute inset-0 z-[5]"
          :class="slide.overlayClass"
        />

        <div
          class="relative z-10 h-full w-full flex flex-col p-8 sm:p-16 lg:px-24 transition-all duration-500"
          :class="getContentClass(slide.contentPosition)"
        >
          <slot :name="slide.slotName || 'content'" :slide="slide">
            <img
              v-if="slide.contentImage"
              :src="slide.contentImage"
              class="mb-6 h-auto"
              :class="slide.contentImageClass || 'w-24 sm:w-32'"
              alt="Content Icon"
            >

            <h2
              v-if="slide.title"
              class="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 font-heading drop-shadow-lg"
              :class="[slide.titleClass ? slide.titleClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-white')]"
            >
              {{ slide.title }}
            </h2>

            <p
              v-if="slide.subtitle"
              class="text-xl sm:text-2xl font-bold mb-4 max-w-2xl drop-shadow-md"
              :class="[slide.subtitleClass ? slide.subtitleClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-gray-200')]"
            >
              {{ slide.subtitle }}
            </p>

            <p
              v-if="slide.description"
              class="text-base sm:text-lg mb-8 max-w-2xl leading-relaxed drop-shadow-md"
              :class="[slide.descriptionClass ? slide.descriptionClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-gray-300')]"
            >
              {{ slide.description }}
            </p>

            <div
              v-if="slide.ctaPrimary || slide.ctaSecondary"
              class="flex flex-wrap gap-4"
              :class="{
                'justify-start': slide.contentPosition?.includes('left'),
                'justify-end': slide.contentPosition?.includes('right'),
                'justify-center': !slide.contentPosition || slide.contentPosition.includes('center')
              }"
            >
              <BaseButton
                v-if="slide.ctaPrimary"
                :to="slide.ctaPrimary.to"
                :label="slide.ctaPrimary.label"
                size="xl"
                :variant="slide.ctaPrimary.variant || 'primary'"
                cta
                :class="slide.ctaPrimary.class"
              />
              <BaseButton
                v-if="slide.ctaSecondary"
                :to="slide.ctaSecondary.to"
                :label="slide.ctaSecondary.label"
                size="xl"
                :variant="slide.ctaSecondary.variant || 'ghost'"
                cta
                class="backdrop-blur-sm"
                :class="slide.ctaSecondary.class"
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
