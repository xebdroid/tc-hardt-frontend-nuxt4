<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Sponsors from '~/components/base/Sponsors.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import EventList from '~/components/events/EventList.vue'
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

// --- DATA ---
const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'image',
    src: '/img/jubilee/drei-tennis-plaetze-leer.jpg',
    contentImage: '/img/jubilee/50-jahre-emblem-gold.png',
    contentImageClass: 'w-60 sm:w-80 lg:w-120 mb-4',
    title: 'TC Hardt',
    titleClass: 'bg-clip-text text-transparent bg-gradient-to-br from-[#8D6933] via-[#E3C887] to-[#714C20] animate-gold-rotate font-bold',
    subtitle: 'Seit 1976 schlägt das Herz des Tennissports am Birkmannsweg. Feiere mit uns ein halbes Jahrhundert Vereinsgeschichte.',
    subtitleClass: 'bg-clip-text text-transparent bg-gradient-to-br from-[#8D6933] via-[#E3C887] to-[#714C20] animate-gold-rotate',
    contentPosition: 'center',
    overlayClass: 'bg-gradient-to-t from-black/50 via-black/60 to-black/50',
    ctaPrimary: { variant:'gold2', label: 'Unsere Jubiläums-Highlights', to: localePath('jubilee') }
  },
  {
    type: 'video',
    src: '/videos/anlage-von-oben-small.mp4',
    // src: '/videos/anlage-von-oben-large.mp4',
    poster: '/img/home/anlage-von-oben-large-preview.jpg',
    title: 'Mehr als nur ein Tennisplatz',
    subtitle: 'Finde dein sportliches Zuhause. Genieße erstklassige Plätze, echte Gemeinschaft und die beste Zeit des Tages.',
    contentPosition: 'bottom-center',
    overlayClass: 'bg-gradient-to-t from-highlight-900/70 via-highlight-900/10 to-transparent',
    ctaPrimary: { variant: 'brand-dark', label: 'Jetzt Mitglied werden', to: localePath('membership') }
  },
  {
    type: 'image',
    src: '/img/home/alexander-lunyov-wBLW_19byJY-unsplash.jpg',
    title: 'Spielend besser werden',
    subtitle: 'Vom ersten Aufschlag bis zum Match-Gewinn. Wir bieten professionelles Training für jedes Alter und jedes Niveau.',
    contentPosition: 'bottom-center',
    overlayClass: 'bg-gradient-to-t from-accent-900/70 via-accent-900/10 to-transparent',
    ctaPrimary: { label: 'Unser Trainingsangebot', to: localePath('training') }
  },
  {
    type: 'image',
    src: '/img/home/clubhaus-von-oben.jpg',
    title: 'Unsere Heimat im Grünen',
    subtitle: 'Sechs topgepflegte Plätze, ein modernes Clubhaus und die wohl schönste Sonnenterrasse im Viertel.',
    contentPosition: 'bottom-center',
    overlayClass: 'bg-gradient-to-t from-accent-900/70 via-accent-900/40 to-transparent',
    ctaPrimary: { label: 'Unsere Heimat', to: localePath('facility') }
  }
])

const clubFeatures = computed(() => [
  {
    icon: 'i-heroicons-trophy',
    title: t('home.intro_features.courts.title'),
    description: t('home.intro_features.courts.desc'),
    to: localePath('membership'),
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50 dark:bg-orange-900/10'
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.intro_features.community.title'),
    description: t('home.intro_features.community.desc'),
    to: localePath('membership'),
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-900/10'
  },
  {
    icon: 'i-heroicons-sparkles',
    title: t('home.intro_features.training.title'),
    description: t('home.intro_features.training.desc'),
    to: localePath('training'),
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50 dark:bg-green-900/10'
  },
  {
    icon: 'i-heroicons-home-modern',
    title: 'Clubheim',
    description: 'Geselligkeit & kühle Getränke nach dem Match.',
    to: localePath('about'),
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-50 dark:bg-teal-900/10'
  }
])

const values = computed(() => [
  { icon: 'i-heroicons-heart', title: t('home.values.items.hospitality.title'), description: t('home.values.items.hospitality.desc') },
  { icon: 'i-heroicons-user-group', title: t('home.values.items.team_spirit.title'), description: t('home.values.items.team_spirit.desc') },
  { icon: 'i-heroicons-scale', title: t('home.values.items.fairness.title'), description: t('home.values.items.fairness.desc') },
  { icon: 'i-heroicons-face-smile', title: t('home.values.items.fun.title'), description: t('home.values.items.fun.desc') }
])

const newsItems = computed(() => {
  // Helper to parse DD.MM.YYYY
  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.').map(Number)
    return new Date(year, month - 1, day)
  }

  const sortedNews = [...db.news].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime()
  })

  // Return only the 4 most recent news items
  return sortedNews.slice(0, 4)
})

</script>

<template>
  <div class="flex flex-col">
    <Hero
      :slides="heroSlides"
      height="full"
      fallback-class="bg-brand-dark-900"
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

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        title-class="text-3xl sm:text-4xl lg:text-5xl"
        :description="$t('home.values.description')"
      />

      <div class="mt-10 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-24">
        <div class="w-full lg:w-1/2">
          <img
            src="/img/home/unsere-werte.jpg"
            alt="Tennis Community TC Hardt"
            class="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white dark:border-gray-800"
          >
        </div>
        <div class="w-full lg:w-1/2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <div
              v-for="(val, i) in values"
              :key="i"
              class="flex flex-col items-center text-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-brand-light-200 transition-colors"
            >
              <div class="flex-shrink-0">
                <UIcon :name="val.icon" class="w-8 h-8 text-highlight-500" />
              </div>
              <div>
                <h4 class="font-bold text-brand-dark-900 dark:text-white text-lg">
                  {{ val.title }}
                </h4>
                <p class="text-base text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                  {{ val.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      variant="primary"
      rounded
      overlap-bottom
      :padding-top="{ base: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', md: 'md' }"
      class="relative z-20"
    >
      <Headline
        mode="light"
        alignment="center"
        tagline="Aktuelles"
        tagline-variant="highlight"
        :title="$t('home.news.title')"
        class="mb-8"
      />

      <div class="flex justify-center mb-8">
        <Button
          :to="localePath('news')"
          variant="highlight"
          trailing-icon="i-heroicons-arrow-right"
        >
          Alle News
        </Button>
      </div>

      <div class="relative px-0 md:px-12">
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
            class="w-full"
          >
            <SwiperSlide
              v-for="(news, index) in newsItems"
              :key="(news as any).slug"
              class="h-auto"
            >
              <FeaturedNewsCard
                :to="localePath({ name: 'news-slug', params: { slug: (news as any).slug } })"
                :image="news.image ?? ''"
                :title="news.title"
                :date="news.date"
                :description="news.excerpt"
                link-text="Weiterlesen"
                class="w-full h-full"
              />
            </SwiperSlide>
          </Swiper>

          <template #fallback>
            <div class="w-full h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
          </template>
        </ClientOnly>

        <div class="flex justify-center gap-8 mt-6 md:mt-0 md:block">
          <button class="news-prev text-white hover:text-highlight-500 transition-colors md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:z-10">
            <UIcon name="i-heroicons-chevron-left" class="w-8 h-8" />
          </button>
          <button class="news-next text-white hover:text-highlight-500 transition-colors md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 md:z-10">
            <UIcon name="i-heroicons-chevron-right" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </Section>


    <Section
      variant="secondary"
      rounded
      :padding-top="{ base: 'lg', md: 'lg', lg: 'xl' }"
      :padding-bottom="{ base: 'sm', md: 'md' }"
      class="relative z-10"
    >
      <Headline
        alignment="center"
        tagline="Termine"
        title="Das steht an"
        description="Die nächsten Highlights in unserem Vereinskalender."
      />

      <div class="flex justify-center mb-8">
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

      <div class="flex justify-center mt-6 mb-12">
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
