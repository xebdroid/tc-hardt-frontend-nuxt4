<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Sponsors from '~/components/base/Sponsors.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import EventList from '~/components/events/EventList.vue'
import MemorialSection from '~/components/memorial/MemorialSection.vue'
import BaseIcon from '~/components/base/Icon.vue'
import db from '~/assets/data/db.json'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: 'Tennis in Mönchengladbach',
  ogTitle: 'Tennis in Mönchengladbach',
  description: 'Willkommen beim TC Hardt! Dein Tennisclub im Herzen von Mönchengladbach mit 6 Ascheplätzen, Tennishalle und familiärer Atmosphäre.',
  ogDescription: 'Willkommen beim TC Hardt! Dein Tennisclub im Herzen von Mönchengladbach mit 6 Ascheplätzen, Tennishalle und familiärer Atmosphäre.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'video',
    src: '/videos/anlage-von-oben-small.mp4',
    poster: '/img/home/anlage-von-oben-large-preview.jpg',
    title: 'Mehr als nur ein Tennisplatz',
    subtitle: 'Finde dein sportliches Zuhause. Genieße erstklassige Plätze, echte Gemeinschaft und die beste Zeit des Tages.',
    contentPosition: 'bottom-center',
    overlayClass: 'overlay-highlight',
    ctaPrimary: { variant: 'brand-dark', label: 'Jetzt Mitglied werden', to: localePath('membership') }
  },
  {
    type: 'image',
    src: '/img/home/alexander-lunyov-wBLW_19byJY-unsplash.jpg',
    title: 'Spielend besser werden',
    subtitle: 'Vom ersten Aufschlag bis zum Match-Gewinn. Wir bieten professionelles Training für jedes Alter und jedes Niveau.',
    contentPosition: 'bottom-center',
    overlayClass: 'overlay-accent',
    ctaPrimary: { label: 'Unser Trainingsangebot', to: localePath('training') }
  },
  {
    type: 'image',
    src: '/img/home/clubhaus-von-oben.jpg',
    title: 'Unsere Heimat im Grünen',
    subtitle: 'Sechs topgepflegte Plätze, ein modernes Clubhaus und die wohl schönste Sonnenterrasse im Viertel.',
    contentPosition: 'bottom-center',
    overlayClass: 'overlay-accent-mid',
    ctaPrimary: { label: 'Unsere Heimat', to: localePath('facility') }
  }
])

const clubFeatures = computed(() => [
  {
    icon: 'i-heroicons-trophy',
    title: t('home.intro_features.courts.title'),
    description: t('home.intro_features.courts.desc'),
    to: localePath('membership'),
    iconColor: 'color-orange',
    iconBg: 'bg-orange'
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.intro_features.community.title'),
    description: t('home.intro_features.community.desc'),
    to: localePath('membership'),
    iconColor: 'color-blue',
    iconBg: 'bg-blue'
  },
  {
    icon: 'i-heroicons-sparkles',
    title: t('home.intro_features.training.title'),
    description: t('home.intro_features.training.desc'),
    to: localePath('training'),
    iconColor: 'color-green',
    iconBg: 'bg-green'
  },
  {
    icon: 'i-heroicons-home-modern',
    title: 'Clubheim',
    description: 'Geselligkeit & kühle Getränke nach dem Match.',
    to: localePath('about'),
    iconColor: 'color-teal',
    iconBg: 'bg-teal'
  }
])

const values = computed(() => [
  { icon: 'i-heroicons-heart', title: t('home.values.items.hospitality.title'), description: t('home.values.items.hospitality.desc') },
  { icon: 'i-heroicons-user-group', title: t('home.values.items.team_spirit.title'), description: t('home.values.items.team_spirit.desc') },
  { icon: 'i-heroicons-scale', title: t('home.values.items.fairness.title'), description: t('home.values.items.fairness.desc') },
  { icon: 'i-heroicons-face-smile', title: t('home.values.items.fun.title'), description: t('home.values.items.fun.desc') }
])

const newsItems = computed(() => {
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.').map(Number)
    return new Date(year, month - 1, day)
  }

  const sortedNews = [...db.news].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime()
  })

  return sortedNews.slice(0, 4)
})
</script>

<template>
  <div class="home-page">
    <Hero
      :slides="heroSlides"
      height="full"
      :autoplay="10000"
    />

    <Section
      variant="gray-light"
      padding-top="xl"
      overlap-top
      rounded
    >
      <Headline
        alignment="center"
        tagline="Willkommen beim TC Hardt"
        tagline-variant="brand"
        title="Tennis, Tradition & Teamgeist"
        size="h2"
        description="Entdecke, was unseren Verein besonders macht und warum du dich bei uns wohlfühlen wirst."
      />

      <div class="features-grid">
        <FeatureCard
          v-for="(feature, index) in clubFeatures"
          :key="index"
          v-bind="feature"
        />
      </div>
    </Section>

    <Section
      variant="default"
      padding-top="xl"
      padding-bottom="xl"
    >
      <Headline
        alignment="center"
        tagline="TC Hardt Philosophie"
        tagline-variant="accent"
        :title="$t('home.values.title')"
        :description="$t('home.values.description')"
      />

      <div class="values-layout">
        <div class="values-media">
          <img
            src="/img/home/unsere-werte.jpg"
            alt="Tennis Community TC Hardt"
            class="values-img"
          >
        </div>
        <div class="values-col">
          <div class="values-grid">
            <div
              v-for="(val, i) in values"
              :key="i"
              class="value-card"
            >
              <div class="value-icon-wrap">
                <BaseIcon :name="val.icon" class="value-icon" />
              </div>
              <div>
                <h4 class="value-title">
                  {{ val.title }}
                </h4>
                <p class="value-desc">
                  {{ val.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <MemorialSection />

    <Section
      variant="primary"
      rounded
      overlap-bottom
      :padding-top="{ base: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', md: 'md' }"
      class="news-section"
    >
      <Headline
        mode="light"
        alignment="center"
        tagline="Aktuelles"
        tagline-variant="highlight"
        :title="$t('home.news.title')"
        margin-bottom="md"
      />

      <div class="center-action">
        <Button
          :to="localePath('news')"
          variant="highlight"
          trailing-icon="i-heroicons-arrow-right"
        >
          Alle News
        </Button>
      </div>

      <div class="news-slider-wrap">
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
              v-for="news in newsItems"
              :key="(news as any).slug"
              class="news-slide"
            >
              <FeaturedNewsCard
                :to="localePath({ name: 'news-slug', params: { slug: (news as any).slug } })"
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
    </Section>

    <Section
      variant="secondary"
      rounded
      :padding-top="{ base: 'lg', md: 'lg', lg: 'xl' }"
      :padding-bottom="{ base: 'sm', md: 'md' }"
      class="events-section"
    >
      <Headline
        alignment="center"
        tagline="Termine"
        title="Das steht an"
        description="Die nächsten Highlights in unserem Vereinskalender."
      />

      <div class="center-action">
        <Button
          :to="localePath('events')"
          variant="brand-dark"
          label="Alle Termine ansehen"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>

      <EventList
        :events="db.events as any"
        :upcoming="true"
        :limit="3"
        layout="grid"
      />
    </Section>

    <Section
      padding-bottom="lg"
      :use-container="false"
    >
      <Headline
        alignment="center"
        tagline="Unterstützt von"
        :title="t('sponsors.title')"
        :description="t('sponsors.subtitle')"
      />

      <div class="sponsors-action">
        <Button
          :to="localePath('sponsoring')"
          variant="outline"
          label="Partner werden"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>

      <Sponsors />
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);

  @include up("md") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include up("lg") {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.values-layout {
  margin-top: var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-12);

  @include up("lg") {
    flex-direction: row;
    gap: var(--space-24);
  }
}

.values-media,
.values-col {
  width: 100%;

  @include up("lg") {
    width: 50%;
  }
}

.values-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 4px solid var(--color-white);

  @include dark {
    border-color: var(--color-gray-800);
  }
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  height: 100%;

  @include up("sm") {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-100);
  transition: border-color var(--transition-fast);

  @include dark {
    background-color: rgb(30 41 59 / 0.5);
    border-color: var(--color-gray-700);
  }

  &:hover {
    border-color: var(--color-brand-light-200);
  }
}

.value-icon-wrap {
  flex-shrink: 0;
}

.value-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-highlight-500);
}

.value-title {
  margin: 0;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  font-size: 1.125rem;

  @include dark {
    color: var(--color-white);
  }
}

.value-desc {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  color: var(--color-gray-600);
  line-height: 1.375;

  @include dark {
    color: var(--color-gray-400);
  }
}

.news-section {
  position: relative;
  z-index: 20;
}

.events-section {
  position: relative;
  z-index: 10;
}

.center-action {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-8);
}

.sponsors-action {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
  margin-bottom: var(--space-12);
}

.news-slider-wrap {
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
