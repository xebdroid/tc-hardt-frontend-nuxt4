<script setup lang="ts">
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import type { ButtonVariant } from '~/components/base/Button.vue'
import { useUIStore } from '~/stores/ui'

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
  icon?: string
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

  overlayClass?: string
  overlayClassMobile?: string
  overlayClassTablet?: string

  contentImage?: string
  contentImageMobile?: string
  contentImageClass?: string
  contentImageClassMobile?: string

  title?: string
  titleMobile?: string
  titleClass?: string
  titleClassMobile?: string

  subtitle?: string
  subtitleMobile?: string
  subtitleClass?: string
  subtitleClassMobile?: string

  description?: string
  descriptionMobile?: string
  descriptionClass?: string
  descriptionClassMobile?: string

  ctaPrimary?: HeroSlideCTA
  ctaPrimaryMobile?: HeroSlideCTA
  ctaSecondary?: HeroSlideCTA
  ctaSecondaryMobile?: HeroSlideCTA

  contentPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  contentPositionMobile?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  contentPositionTablet?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

  slotName?: string

  theme?: 'light' | 'dark'
  themeMobile?: 'light' | 'dark'
}

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
  fallbackClass: undefined,
  autoplay: 5000,
  loopVideo: false,
  theme: 'light',
  removeTopPadding: false
})

const swiperInstance = ref<any>(null)
const uiStore = useUIStore()

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

const getPosAlign = (pos?: string) => {
  if (!pos) return 'center'
  if (pos.includes('left')) return 'left'
  if (pos.includes('right')) return 'right'
  return 'center'
}

const getPosValign = (pos?: string) => {
  if (!pos) return 'center'
  if (pos.includes('top')) return 'top'
  if (pos.includes('bottom')) return 'bottom'
  return 'center'
}

const getPositionClasses = (slide: HeroSlide) => {
  const basePos = slide.contentPositionMobile || slide.contentPosition || 'center'
  const mdPos = slide.contentPositionTablet || slide.contentPosition || basePos
  const lgPos = slide.contentPosition || mdPos

  return [
    `pos-base-h-${getPosAlign(basePos)}`,
    `pos-base-v-${getPosValign(basePos)}`,
    `pos-md-h-${getPosAlign(mdPos)}`,
    `pos-md-v-${getPosValign(mdPos)}`,
    `pos-lg-h-${getPosAlign(lgPos)}`,
    `pos-lg-v-${getPosValign(lgPos)}`
  ]
}

const modules = [Navigation, Pagination, Autoplay, EffectFade]

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
    class="base-hero"
    :class="[
      `height-${height}`,
      `theme-${props.theme}`,
      !slides.length ? (fallbackClass || 'default-fallback-bg') : 'slides-bg',
      { 'has-top-padding': !removeTopPadding && slides.length < 1 }
    ]"
  >
    <div v-if="!slides.length" class="empty-hero-content">
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
      class="hero-slider"
      :class="{ 'is-single': slides.length === 1 }"
      @swiper="onSwiperInit"
      @slide-change="onSlideChange"
    >
      <component
        :is="slides.length > 1 ? SwiperSlide : 'div'"
        v-for="(slide, index) in slides"
        :key="index"
        class="hero-slide"
      >
        <div class="media-wrap">
          <div
            v-if="slide.type === 'color'"
            class="media-fill"
            :class="[slide.colorClass, slide.overlayClass]"
            :style="{ backgroundColor: slide.overlayClass ? '' : slide.color }"
          />
          <video
            v-else-if="slide.type === 'video'"
            :src="slide.src"
            :poster="slide.poster"
            class="media-video"
            muted
            playsinline
            :loop="loopVideo"
            @loadeddata="handleVideoLoaded"
            @ended="handleVideoEnded"
          />

          <div
            v-else-if="slide.type === 'image'"
            class="media-fill"
            :class="slide.imageWrapperClass"
          >
            <NuxtImg
              v-if="slide.srcMobile"
              :src="slide.srcMobile"
              :alt="slide.alt || 'Hero Image Mobile'"
              class="media-img"
              :class="[(slide.srcTablet || slide.src) ? 'hide-from-md' : '', slide.imageClassMobile || slide.imageClass || 'object-top']"
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
              class="media-img show-md-only"
              :class="[slide.src ? 'hide-from-lg' : '', slide.imageClass]"
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
              class="media-img"
              :class="[(slide.srcMobile || slide.srcTablet) ? (slide.srcTablet ? 'show-from-lg' : 'show-from-md') : '', slide.imageClass]"
              sizes="sm:100vw md:100vw lg:100vw xl:100vw xxl:1536px"
              quality="90"
              format="webp"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :preload="index === 0 && !slide.srcMobile && !slide.srcTablet"
            />
          </div>
        </div>

        <!-- Overlays -->
        <div
          v-if="slide.overlayClassMobile && slide.type !== 'color'"
          class="slide-overlay hide-from-md"
          :class="slide.overlayClassMobile"
        />
        <div
          v-if="slide.overlayClassTablet && slide.type !== 'color'"
          class="slide-overlay show-md-to-lg"
          :class="slide.overlayClassTablet"
        />
        <div
          v-if="slide.overlayClass && slide.type !== 'color'"
          class="slide-overlay"
          :class="[slide.overlayClassMobile ? 'show-from-md' : '', slide.overlayClass]"
        />

        <div
          class="slide-stage"
          :class="[
            { 'has-slide-padding': !removeTopPadding && slides.length >= 1 },
            ...getPositionClasses(slide)
          ]"
        >
          <div
            class="slide-box"
            :class="[
              slide.contentWrapperClass || 'default-max-width',
              ...getPositionClasses(slide)
            ]"
          >
            <slot :name="slide.slotName || 'content'" :slide="slide">
              <!-- Content Image -->
              <div
                v-if="slide.contentImage || slide.contentImageMobile"
                class="badge-wrap"
              >
                <NuxtImg
                  v-if="slide.contentImageMobile"
                  :src="slide.contentImageMobile"
                  class="badge-img hide-from-md"
                  :class="[slide.contentImageClassMobile || slide.contentImageClass || 'default-badge-width']"
                  alt="Content Icon Mobile"
                  sizes="300px"
                  quality="90"
                  format="webp"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                />
                <NuxtImg
                  v-if="slide.contentImage"
                  :src="slide.contentImage"
                  class="badge-img is-desktop"
                  :class="[
                    slide.contentImageMobile ? 'show-from-md' : '',
                    slide.contentImageClass || 'default-badge-width'
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
                class="slide-title"
                :class="[
                  slide.titleClassMobile && slide.titleClass ? `${slide.titleClassMobile} md:${slide.titleClass}` :
                  (slide.titleClass ? slide.titleClass : (slide.theme === 'dark' ? 'theme-dark-text' : 'theme-light-title'))
                ]"
              >
                <span v-if="slide.titleMobile" class="hide-from-md">{{ slide.titleMobile }}</span>
                <span :class="{ 'show-inline-from-md': !!slide.titleMobile }">{{ slide.title }}</span>
              </h2>

              <!-- Subtitle -->
              <p
                v-if="slide.subtitle || slide.subtitleMobile"
                class="slide-subtitle"
                :class="[
                  slide.subtitleClassMobile && slide.subtitleClass ? `${slide.subtitleClassMobile} md:${slide.subtitleClass}` :
                  (slide.subtitleClass ? slide.subtitleClass : (slide.theme === 'dark' ? 'theme-dark-text' : 'theme-light-subtitle'))
                ]"
              >
                <span v-if="slide.subtitleMobile" class="hide-from-md">{{ slide.subtitleMobile }}</span>
                <span :class="{ 'show-inline-from-md': !!slide.subtitleMobile }">{{ slide.subtitle }}</span>
              </p>

              <!-- Description -->
              <p
                v-if="slide.description || slide.descriptionMobile"
                class="slide-desc"
                :class="[
                  slide.descriptionClassMobile && slide.descriptionClass ? `${slide.descriptionClassMobile} md:${slide.descriptionClass}` :
                  (slide.descriptionClass ? slide.descriptionClass : (slide.theme === 'dark' ? 'theme-dark-text' : 'theme-light-desc'))
                ]"
              >
                <span v-if="slide.descriptionMobile" class="hide-from-md">{{ slide.descriptionMobile }}</span>
                <span :class="{ 'show-inline-from-md': !!slide.descriptionMobile }">{{ slide.description }}</span>
              </p>

              <!-- CTA Buttons -->
              <div
                v-if="slide.ctaPrimary || slide.ctaPrimaryMobile || slide.ctaSecondary || slide.ctaSecondaryMobile"
                class="cta-row"
              >
                <Button
                  v-if="slide.ctaPrimaryMobile"
                  :to="slide.ctaPrimaryMobile.to"
                  :label="slide.ctaPrimaryMobile.label"
                  :target="slide.ctaPrimaryMobile.target"
                  :icon="slide.ctaPrimaryMobile.icon"
                  size="lg"
                  :variant="slide.ctaPrimaryMobile.variant || 'primary'"
                  cta
                  class="md:hidden"
                  :class="slide.ctaPrimaryMobile.class"
                />
                <Button
                  v-if="slide.ctaPrimary"
                  :to="slide.ctaPrimary.to"
                  :label="slide.ctaPrimary.label"
                  :target="slide.ctaPrimary.target"
                  :icon="slide.ctaPrimary.icon"
                  size="xl"
                  :variant="slide.ctaPrimary.variant || 'primary'"
                  cta
                  :class="[
                    slide.ctaPrimaryMobile ? 'hidden md:inline-flex' : '',
                    slide.ctaPrimary.class
                  ]"
                />

                <Button
                  v-if="slide.ctaSecondaryMobile"
                  :to="slide.ctaSecondaryMobile.to"
                  :label="slide.ctaSecondaryMobile.label"
                  :target="slide.ctaSecondaryMobile.target"
                  :icon="slide.ctaSecondaryMobile.icon"
                  size="lg"
                  :variant="slide.ctaSecondaryMobile.variant || 'ghost'"
                  cta
                  class="secondary-blur md:hidden"
                  :class="slide.ctaSecondaryMobile.class"
                />
                <Button
                  v-if="slide.ctaSecondary"
                  :to="slide.ctaSecondary.to"
                  :label="slide.ctaSecondary.label"
                  :target="slide.ctaSecondary.target"
                  :icon="slide.ctaSecondary.icon"
                  size="xl"
                  :variant="slide.ctaSecondary.variant || 'ghost'"
                  cta
                  class="secondary-blur"
                  :class="[
                    slide.ctaSecondaryMobile ? 'hidden md:inline-flex' : '',
                    slide.ctaSecondary.class
                  ]"
                />
              </div>
            </slot>
          </div>
        </div>
      </component>

      <div v-if="slides.length > 1" class="custom-pagination hero-pagination" />

      <button v-if="slides.length > 1" type="button" class="custom-prev nav-arrow is-prev" aria-label="Vorheriger Slide">
        <BaseIcon name="i-heroicons-chevron-left" class="arrow-icon" />
      </button>
      <button v-if="slides.length > 1" type="button" class="custom-next nav-arrow is-next" aria-label="Nächster Slide">
        <BaseIcon name="i-heroicons-chevron-right" class="arrow-icon" />
      </button>
    </component>
  </div>
</template>

<style lang="scss" scoped>
@mixin pos-rules($bp) {
  &.pos-#{$bp}-h-left {
    align-items: flex-start;
    text-align: left;
    .slide-title, .slide-subtitle, .slide-desc { margin-left: 0; margin-right: auto; }
    .cta-row { justify-content: flex-start; }
    .badge-wrap { align-items: flex-start; }
  }
  &.pos-#{$bp}-h-right {
    align-items: flex-end;
    text-align: right;
    .slide-title, .slide-subtitle, .slide-desc { margin-left: auto; margin-right: 0; }
    .cta-row { justify-content: flex-end; }
    .badge-wrap { align-items: flex-end; }
  }
  &.pos-#{$bp}-h-center {
    align-items: center;
    text-align: center;
    .slide-title, .slide-subtitle, .slide-desc { margin-inline: auto; }
    .cta-row { justify-content: center; }
    .badge-wrap { align-items: center; }
  }

  &.pos-#{$bp}-v-top {
    margin-top: 0;
    margin-bottom: auto;
  }
  &.pos-#{$bp}-v-bottom {
    margin-top: auto;
    margin-bottom: 0;
  }
  &.pos-#{$bp}-v-center {
    margin-block: auto;
  }
}

.base-hero {
  position: relative;
  width: 100%;
  overflow: hidden;

  @include up("lg") {
    border-radius: var(--radius-2xl);
  }

  &.default-fallback-bg {
    background-color: var(--color-brand-dark-900);
  }

  &.slides-bg {
    background-color: var(--color-gray-900);
  }

  &.has-top-padding {
    padding-top: 70px;

    @include up("lg") {
      padding-top: 120px;
    }
  }

  &.height-full {
    height: 100svh;

    @include up("lg") {
      height: calc(100vh - 2rem);
    }
  }

  &.height-large {
    height: 800px;
  }

  &.height-medium {
    height: 450px;
  }

  &.height-small {
    height: 300px;
  }
}

.empty-hero-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-8);
  text-align: center;

  @include up("sm") {
    padding: var(--space-16);
  }
}

.hero-slider {
  width: 100%;
  height: 100%;

  &.is-single {
    position: relative;
  }
}

.hero-slide {
  position: relative;
  background-color: var(--color-gray-900);
  width: 100%;
  height: 100%;
}

.media-wrap {
  position: absolute;
  inset: 0;
  user-select: none;
}

.media-fill,
.media-video,
.media-img {
  width: 100%;
  height: 100%;
}

.media-video,
.media-img {
  object-fit: cover;
}

.media-img {
  display: block;

  &.object-top { object-position: top; }
  &.object-center { object-position: center; }
  &.object-bottom { object-position: bottom; }
}

.slide-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;

  &.overlay-highlight {
    background-image: linear-gradient(to top, rgb(54 83 20 / 0.7), rgb(54 83 20 / 0.1), transparent);
  }

  &.overlay-accent {
    background-image: linear-gradient(to top, rgb(64 32 6 / 0.7), rgb(64 32 6 / 0.1), transparent);
  }

  &.overlay-accent-mid {
    background-image: linear-gradient(to top, rgb(64 32 6 / 0.7), rgb(64 32 6 / 0.4), transparent);
  }

  &.overlay-accent-strong {
    background-image: linear-gradient(to top, rgb(64 32 6 / 0.9), rgb(64 32 6 / 0.5), transparent);
  }

  &.overlay-brand-dark {
    background-image: linear-gradient(to top, rgb(26 40 82 / 0.9), rgb(26 40 82 / 0.2), transparent);
  }

  &.overlay-dark {
    background-image: linear-gradient(to top, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0.3), transparent);
  }
}

.hide-from-md {
  @include up("md") {
    display: none !important;
  }
}

.show-from-md {
  display: none !important;
  @include up("md") {
    display: block !important;
  }
}

.show-inline-from-md {
  display: none;
  @include up("md") {
    display: inline;
  }
}

.show-from-lg {
  display: none !important;
  @include up("lg") {
    display: block !important;
  }
}

.show-md-only,
.show-md-to-lg {
  display: none !important;
  @include up("md") {
    display: block !important;
  }
  @include up("lg") {
    display: none !important;
  }
}

.hide-from-lg {
  @include up("lg") {
    display: none !important;
  }
}

.slide-stage {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  transition: all 500ms ease;

  @include up("sm") {
    padding: var(--space-10);
  }

  @include up("lg") {
    padding-inline: var(--space-16);
  }

  &.has-slide-padding {
    padding-top: 70px;
    padding-bottom: 2.5rem;

    @include up("lg") {
      padding-top: 120px;
      padding-bottom: 3.5rem;
    }
  }

  @include pos-rules("base");
  @include up("md") {
    @include pos-rules("md");
  }
  @include up("lg") {
    @include pos-rules("lg");
  }
}

.slide-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  &.default-max-width {
    max-width: 80rem; /* max-w-7xl */
  }

  @include pos-rules("base");
  @include up("md") {
    @include pos-rules("md");
  }
  @include up("lg") {
    @include pos-rules("lg");
  }
}

.badge-wrap {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;

  @include up("sm") {
    min-height: 100px;
  }
}

.badge-img {
  height: auto;
  object-fit: contain;
  max-height: 25vh;

  &.is-desktop {
    @include up("lg") {
      max-height: 35vh;
    }
  }

  &.default-badge-width {
    width: 6rem;
    @include up("sm") {
      width: 8rem;
    }
  }
}

.slide-title {
  margin: 0 0 2vh;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));

  @include up("sm") {
    font-size: 3rem;
    line-height: 1;
  }

  @include up("md") {
    font-size: 3.75rem;
    line-height: 1;
  }

  &.theme-light-title {
    color: var(--color-white);
  }

  &.theme-dark-text {
    color: var(--color-brand-dark-900);
  }
}

.slide-subtitle {
  margin: 0 0 2vh;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  max-width: 42rem;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  @include up("sm") {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &.theme-light-subtitle {
    color: var(--color-gray-200);
  }

  &.theme-dark-text {
    color: var(--color-brand-dark-900);
  }
}

.slide-desc {
  margin: 0 0 4vh;
  font-size: 0.875rem;
  line-height: 1.625;
  max-width: 42rem;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));

  @include up("sm") {
    font-size: 1.125rem;
  }

  &.theme-light-desc {
    color: var(--color-gray-300);
  }

  &.theme-dark-text {
    color: var(--color-brand-dark-900);
  }
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);

  @include up("sm") {
    gap: var(--space-4);
  }
}

.secondary-blur {
  backdrop-filter: blur(4px);
}

.hero-pagination {
  position: absolute;
  bottom: var(--space-8);
  left: 0;
  right: 0;
  z-index: 20;
  display: none;
  justify-content: center;

  @include up("lg") {
    display: flex;
  }
}

.nav-arrow {
  position: absolute;
  top: 50%;
  z-index: 20;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: rgb(255 255 255 / 0.7);
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--color-white);
  }

  @include up("lg") {
    display: none;
  }

  &.is-prev { left: var(--space-4); }
  &.is-next { right: var(--space-4); }
}

.arrow-icon {
  width: 2.5rem;
  height: 2.5rem;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: var(--color-white);
  opacity: 0.5;
  transition: all 0.3s;
}

:deep(.swiper-pagination-bullet-active) {
  width: 24px;
  border-radius: 5px;
  background-color: var(--color-brand-dark-500);
  opacity: 1;
}
</style>
