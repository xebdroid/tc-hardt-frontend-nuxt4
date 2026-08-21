<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Button from '~/components/base/Button.vue'
import type { ButtonVariant } from '~/components/base/Button.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export interface HeroSlideCTA {
  label: string
  to: string
  variant?: ButtonVariant
  class?: string
  target?: string
}

export interface HeroSlide {
  type: 'image' | 'video' | 'color'
  src?: string
  srcMobile?: string
  srcTablet?: string
  color?: string
  colorClass?: string
  poster?: string
  alt?: string
  imageClass?: string
  imageClassMobile?: string
  imageClassTablet?: string
  imageWrapperClass?: string
  contentWrapperClass?: string

  // Overlays (responsive)
  overlayClass?: string
  overlayClassMobile?: string
  overlayClassTablet?: string

  // Content Image / Logo / Badge
  contentImage?: string
  contentImageMobile?: string
  contentImageClass?: string
  contentImageClassMobile?: string

  // Title (responsive)
  title?: string
  titleMobile?: string
  titleClass?: string
  titleClassMobile?: string

  // Subtitle (responsive)
  subtitle?: string
  subtitleMobile?: string
  subtitleClass?: string
  subtitleClassMobile?: string

  // Description (responsive)
  description?: string
  descriptionMobile?: string
  descriptionClass?: string
  descriptionClassMobile?: string

  // CTAs (responsive)
  ctaPrimary?: HeroSlideCTA
  ctaPrimaryMobile?: HeroSlideCTA
  ctaSecondary?: HeroSlideCTA
  ctaSecondaryMobile?: HeroSlideCTA

  // Responsive positions
  contentPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  contentPositionMobile?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  contentPositionTablet?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

  // Eigener Slot-Name für komplett freies HTML
  slotName?: string

  // Theme for text color
  theme?: 'light' | 'dark'
  themeMobile?: 'light' | 'dark'
}

import { useUIStore } from '~/stores/ui'

const props = withDefaults(defineProps<{
  slides?: HeroSlide[]
  height?: 'full' | 'large' | 'medium' | 'small'
  fallbackClass?: string
  autoplay?: boolean | number
  loopVideo?: boolean
  theme?: 'light' | 'dark'
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

const swiperInstance = ref<any>(null)
const uiStore = useUIStore()

// Melden, ob wir einen Fullscreen Hero haben (für den Sticky CTA)
onMounted(() => {
  if (props.height === 'full' || props.height === 'large') {
    uiStore.setFullScreenHero(true)
  }
})

onUnmounted(() => {
  if (props.height === 'full' || props.height === 'large') {
    uiStore.setFullScreenHero(false)
  }
})

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
const getAlignItemsClass = (position?: string, breakpointPrefix = '') => {
  if (!position) return ''
  const p = breakpointPrefix ? `${breakpointPrefix}:` : ''
  if (position.includes('left')) return `${p}items-start ${p}text-left`
  if (position.includes('right')) return `${p}items-end ${p}text-right`
  return `${p}items-center ${p}text-center`
}

const getMarginClass = (position?: string, breakpointPrefix = '') => {
  if (!position) return ''
  const p = breakpointPrefix ? `${breakpointPrefix}:` : ''
  if (position.includes('top')) return `${p}mb-auto ${p}mt-0`
  if (position.includes('bottom')) return `${p}mt-auto ${p}mb-0`
  return `${p}my-auto`
}

const getAlignmentClasses = (slide: HeroSlide) => {
  const baseAlign = getAlignItemsClass(slide.contentPositionMobile || slide.contentPosition || 'center')
  const mdAlign = slide.contentPositionTablet ? getAlignItemsClass(slide.contentPositionTablet, 'md') : (slide.contentPositionMobile && slide.contentPosition ? getAlignItemsClass(slide.contentPosition, 'md') : '')
  const lgAlign = slide.contentPosition ? getAlignItemsClass(slide.contentPosition, 'lg') : ''
  return `${baseAlign} ${mdAlign} ${lgAlign}`
}

const getMarginClasses = (slide: HeroSlide) => {
  const baseMargin = getMarginClass(slide.contentPositionMobile || slide.contentPosition || 'center')
  const mdMargin = slide.contentPositionTablet ? getMarginClass(slide.contentPositionTablet, 'md') : (slide.contentPositionMobile && slide.contentPosition ? getMarginClass(slide.contentPosition, 'md') : '')
  const lgMargin = slide.contentPosition ? getMarginClass(slide.contentPosition, 'lg') : ''
  return `${baseMargin} ${mdMargin} ${lgMargin}`
}

// Responsiver horizontaler Textblock-Rand (für subtitle / description)
const getTextMarginClasses = (slide: HeroSlide) => {
  const getHMargin = (pos?: string, prefix = '') => {
    if (!pos) return ''
    const p = prefix ? `${prefix}:` : ''
    if (pos.includes('left')) return `${p}mr-auto ${p}ml-0`
    if (pos.includes('right')) return `${p}ml-auto ${p}mr-0`
    return `${p}mx-auto`
  }
  const baseHMargin = getHMargin(slide.contentPositionMobile || slide.contentPosition || 'center')
  const mdHMargin = slide.contentPositionTablet ? getHMargin(slide.contentPositionTablet, 'md') : (slide.contentPositionMobile && slide.contentPosition ? getHMargin(slide.contentPosition, 'md') : '')
  const lgHMargin = slide.contentPosition ? getHMargin(slide.contentPosition, 'lg') : ''
  return `${baseHMargin} ${mdHMargin} ${lgHMargin}`
}

// Responsive Ausrichtung der CTA-Buttons
const getCtaJustifyClasses = (slide: HeroSlide) => {
  const getJustify = (pos?: string, prefix = '') => {
    if (!pos) return ''
    const p = prefix ? `${prefix}:` : ''
    if (pos.includes('left')) return `${p}justify-start`
    if (pos.includes('right')) return `${p}justify-end`
    return `${p}justify-center`
  }
  const baseJustify = getJustify(slide.contentPositionMobile || slide.contentPosition || 'center')
  const mdJustify = slide.contentPositionTablet ? getJustify(slide.contentPositionTablet, 'md') : (slide.contentPositionMobile && slide.contentPosition ? getJustify(slide.contentPosition, 'md') : '')
  const lgJustify = slide.contentPosition ? getJustify(slide.contentPosition, 'lg') : ''
  return `${baseJustify} ${mdJustify} ${lgJustify}`
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
    if (props.autoplay !== false) {
      swiperInstance.value.autoplay.start()
    }
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
    if (swiper.autoplay.running) swiper.autoplay.stop()
    videoElement.currentTime = 0
    videoElement.play()
  } else if (props.autoplay !== false) {
    swiper.autoplay.start()
  }
}
</script>

<template>
  <div
    class="relative w-full overflow-hidden lg:rounded-3xl"
    :class="[containerHeightClass, !slides.length ? fallbackClass : 'bg-gray-900', `theme-${props.theme}`, { 'pt-[70px] lg:pt-[120px]': !removeTopPadding && slides.length < 1 }]"
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
      :autoplay="(slides.length > 1 && autoplay !== false) ? { delay: typeof autoplay === 'number' ? autoplay : 5000, disableOnInteraction: false } : false"
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
            :class="[slide.colorClass, slide.overlayClass]"
            :style="{ backgroundColor: slide.overlayClass ? '' : slide.color }"
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

          <div
            v-else-if="slide.type === 'image'"
            class="w-full h-full"
            :class="slide.imageWrapperClass"
          >
            <!-- Responsive Images via Tailwind hidden/block -->
            <NuxtImg
              v-if="slide.srcMobile"
              :src="slide.srcMobile"
              :alt="slide.alt || 'Hero Image Mobile'"
              class="w-full h-full object-cover block"
              :class="[(slide.srcTablet || slide.src) ? 'md:hidden' : '', slide.imageClassMobile || slide.imageClass || 'object-top']"
              sizes="360px sm:640px md:768px"
              quality="90"
              format="webp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :preload="index === 0"
            />

            <NuxtImg
              v-if="slide.srcTablet"
              :src="slide.srcTablet"
              :alt="slide.alt || 'Hero Image Tablet'"
              class="w-full h-full object-cover hidden md:block"
              :class="[slide.src ? 'lg:hidden' : '', slide.imageClass]"
              sizes="768px lg:1024px"
              quality="90"
              format="webp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />

            <NuxtImg
              v-if="slide.src"
              :src="slide.src"
              :alt="slide.alt || 'Hero Image'"
              class="w-full h-full object-cover"
              :class="[(slide.srcMobile || slide.srcTablet) ? (slide.srcTablet ? 'hidden lg:block' : 'hidden md:block') : 'block', slide.imageClass]"
              sizes="sm:100vw md:100vw lg:100vw xl:100vw xxl:1536px"
              quality="90"
              format="webp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :preload="index === 0 && !slide.srcMobile && !slide.srcTablet"
            />
          </div>
        </div>

        <!-- Overlays (unterstützt mobile & desktop getrennt oder kombiniert) -->
        <div
          v-if="slide.overlayClassMobile && slide.type !== 'color'"
          class="absolute inset-0 z-[5] md:hidden"
          :class="slide.overlayClassMobile"
        />
        <div
          v-if="slide.overlayClassTablet && slide.type !== 'color'"
          class="absolute inset-0 z-[5] hidden md:block lg:hidden"
          :class="slide.overlayClassTablet"
        />
        <div
          v-if="slide.overlayClass && slide.type !== 'color'"
          class="absolute inset-0 z-[5]"
          :class="[slide.overlayClassMobile ? 'hidden md:block' : 'block', slide.overlayClass]"
        />

        <div
          class="relative z-10 h-full w-full flex flex-col p-6 sm:p-10 lg:px-16 transition-all duration-500"
          :class="[
            { 'pt-[70px] lg:pt-[120px] pb-10 lg:pb-14': !removeTopPadding && slides.length >= 1 },
            getAlignmentClasses(slide)
          ]"
        >
          <div
            class="w-full flex flex-col shrink-0"
            :class="[
              slide.contentWrapperClass || 'max-w-7xl',
              getMarginClasses(slide),
              getAlignmentClasses(slide)
            ]"
          >
            <slot :name="slide.slotName || 'content'" :slide="slide">

              <!-- Content Image (z. B. Jubiläums-Logo / Badge) -->
              <div
                v-if="slide.contentImage || slide.contentImageMobile"
                class="min-h-[60px] sm:min-h-[100px] flex flex-col mb-[2vh]"
                :class="[
                  slide.contentPosition?.includes('left') ? 'items-start' :
                  slide.contentPosition?.includes('right') ? 'items-end' :
                  'items-center'
                ]"
              >
                <!-- Mobile Content Image (optional) -->
                <NuxtImg
                  v-if="slide.contentImageMobile"
                  :src="slide.contentImageMobile"
                  class="h-auto object-contain max-h-[25vh] md:hidden"
                  :class="[slide.contentImageClassMobile || slide.contentImageClass || 'w-24 sm:w-32']"
                  alt="Content Icon Mobile"
                  sizes="300px"
                  quality="90"
                  format="webp"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                />
                <!-- Desktop / Default Content Image -->
                <NuxtImg
                  v-if="slide.contentImage"
                  :src="slide.contentImage"
                  class="h-auto object-contain max-h-[25vh] lg:max-h-[35vh]"
                  :class="[
                    slide.contentImageMobile ? 'hidden md:block' : 'block',
                    slide.contentImageClass || 'w-24 sm:w-32'
                  ]"
                  alt="Content Icon"
                  sizes="sm:300px md:400px lg:600px"
                  quality="90"
                  format="webp"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                />
              </div>

              <!-- Title -->
              <h2
                v-if="slide.title || slide.titleMobile"
                class="text-3xl sm:text-5xl md:text-6xl font-bold mb-[2vh] font-heading drop-shadow-lg"
                :class="[
                  slide.titleClassMobile && slide.titleClass ? `${slide.titleClassMobile} md:${slide.titleClass}` :
                  (slide.titleClass ? slide.titleClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-white')),
                  getTextMarginClasses(slide)
                ]"
              >
                <!-- Mobile Title (wenn angegeben) -->
                <span v-if="slide.titleMobile" class="md:hidden">{{ slide.titleMobile }}</span>
                <!-- Desktop / Default Title -->
                <span :class="{ 'hidden md:inline': !!slide.titleMobile }">{{ slide.title }}</span>
              </h2>

              <!-- Subtitle -->
              <p
                v-if="slide.subtitle || slide.subtitleMobile"
                class="text-lg sm:text-2xl font-bold mb-[2vh] max-w-2xl drop-shadow-md"
                :class="[
                  slide.subtitleClassMobile && slide.subtitleClass ? `${slide.subtitleClassMobile} md:${slide.subtitleClass}` :
                  (slide.subtitleClass ? slide.subtitleClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-gray-200')),
                  getTextMarginClasses(slide)
                ]"
              >
                <span v-if="slide.subtitleMobile" class="md:hidden">{{ slide.subtitleMobile }}</span>
                <span :class="{ 'hidden md:inline': !!slide.subtitleMobile }">{{ slide.subtitle }}</span>
              </p>

              <!-- Description -->
              <p
                v-if="slide.description || slide.descriptionMobile"
                class="text-sm sm:text-lg mb-[4vh] max-w-2xl leading-relaxed drop-shadow-md"
                :class="[
                  slide.descriptionClassMobile && slide.descriptionClass ? `${slide.descriptionClassMobile} md:${slide.descriptionClass}` :
                  (slide.descriptionClass ? slide.descriptionClass : (slide.theme === 'dark' ? 'text-brand-dark-900' : 'text-gray-300')),
                  getTextMarginClasses(slide)
                ]"
              >
                <span v-if="slide.descriptionMobile" class="md:hidden">{{ slide.descriptionMobile }}</span>
                <span :class="{ 'hidden md:inline': !!slide.descriptionMobile }">{{ slide.description }}</span>
              </p>

              <!-- CTA Buttons (Responsive Positionierung & Buttons) -->
              <div
                v-if="slide.ctaPrimary || slide.ctaPrimaryMobile || slide.ctaSecondary || slide.ctaSecondaryMobile"
                class="flex flex-wrap gap-3 sm:gap-4"
                :class="getCtaJustifyClasses(slide)"
              >
                <!-- Primary CTA (Mobile) -->
                <Button
                  v-if="slide.ctaPrimaryMobile"
                  :to="slide.ctaPrimaryMobile.to"
                  :label="slide.ctaPrimaryMobile.label"
                  :target="slide.ctaPrimaryMobile.target"
                  size="lg"
                  :variant="slide.ctaPrimaryMobile.variant || 'primary'"
                  cta
                  class="md:hidden"
                  :class="slide.ctaPrimaryMobile.class"
                />
                <!-- Primary CTA (Desktop / Default) -->
                <Button
                  v-if="slide.ctaPrimary"
                  :to="slide.ctaPrimary.to"
                  :label="slide.ctaPrimary.label"
                  :target="slide.ctaPrimary.target"
                  size="xl"
                  :variant="slide.ctaPrimary.variant || 'primary'"
                  cta
                  :class="[
                    slide.ctaPrimaryMobile ? 'hidden md:inline-flex' : 'inline-flex',
                    slide.ctaPrimary.class
                  ]"
                />

                <!-- Secondary CTA (Mobile) -->
                <Button
                  v-if="slide.ctaSecondaryMobile"
                  :to="slide.ctaSecondaryMobile.to"
                  :label="slide.ctaSecondaryMobile.label"
                  :target="slide.ctaSecondaryMobile.target"
                  size="lg"
                  :variant="slide.ctaSecondaryMobile.variant || 'ghost'"
                  cta
                  class="backdrop-blur-sm md:hidden"
                  :class="slide.ctaSecondaryMobile.class"
                />
                <!-- Secondary CTA (Desktop / Default) -->
                <Button
                  v-if="slide.ctaSecondary"
                  :to="slide.ctaSecondary.to"
                  :label="slide.ctaSecondary.label"
                  :target="slide.ctaSecondary.target"
                  size="xl"
                  :variant="slide.ctaSecondary.variant || 'ghost'"
                  cta
                  class="backdrop-blur-sm"
                  :class="[
                    slide.ctaSecondaryMobile ? 'hidden md:inline-flex' : 'inline-flex',
                    slide.ctaSecondary.class
                  ]"
                />
              </div>
            </slot>
          </div>
        </div>
      </component>

      <div v-if="slides.length > 1" class="custom-pagination absolute bottom-8 left-0 right-0 flex justify-center z-20 hidden lg:flex [&>.swiper-pagination-bullet]:bg-white [&>.swiper-pagination-bullet-active]:bg-primary-500" />

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
