<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import BaseIcon from '~/components/base/Icon.vue'

interface NewsItem {
  id?: number
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
}

interface Props {
  items: NewsItem[]
}

defineProps<Props>()

const localePath = useLocalePath()
</script>

<template>
  <div class="news-slider">
    <ClientOnly>
      <Swiper
        :modules="[Autoplay, Navigation]"
        direction="horizontal"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :navigation="{
          nextEl: '.news-next',
          prevEl: '.news-prev'
        }"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        class="news-swiper"
      >
        <SwiperSlide
          v-for="news in items"
          :key="news.slug"
          class="news-slide"
        >
          <FeaturedNewsCard
            :to="localePath({ name: 'news-slug', params: { slug: news.slug } })"
            :image="news.image ?? ''"
            :title="news.title"
            :date="news.date"
            :description="news.excerpt"
            link-text="Weiterlesen"
          />
        </SwiperSlide>
      </Swiper>

      <template #fallback>
        <div class="news-skeleton" />
      </template>
    </ClientOnly>

    <div class="news-arrows">
      <button type="button" class="news-prev news-arrow is-prev" aria-label="Vorherige News">
        <BaseIcon name="i-heroicons-chevron-left" class="arrow-icon" />
      </button>
      <button type="button" class="news-next news-arrow is-next" aria-label="Nächste News">
        <BaseIcon name="i-heroicons-chevron-right" class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-slider {
  position: relative;
  padding-inline: 0;

  @include up("md") {
    padding-inline: var(--space-12);
  }
}

.news-swiper {
  width: 100%;
}

.news-slide {
  height: auto;
}

.news-skeleton {
  width: 100%;
  height: 16rem;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-xl);

  @include dark {
    background-color: var(--color-gray-800);
  }
}

.news-arrows {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  margin-top: var(--space-6);

  @include up("md") {
    display: block;
    margin-top: 0;
  }
}

.news-arrow {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-white);
  cursor: pointer;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-highlight-500);
  }

  @include up("md") {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    &.is-prev { left: 0; }
    &.is-next { right: 0; }
  }
}

.arrow-icon {
  width: 2rem;
  height: 2rem;
}
</style>
