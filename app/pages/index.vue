<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Sponsors from '~/components/base/Sponsors.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import CardTeaser from '~/components/base/CardTeaser.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'
import db from '~/assets/data/db.json'

const { t } = useI18n()
const localePath = useLocalePath()

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
    src: '/videos/anlage-von-oben-large.mp4',
    poster: '/img/home/anlage-von-oben-large-preview.png',
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

const newsItems = db.news
</script>

<template>
  <div class="flex flex-col">
    <Hero
      :slides="heroSlides"
      height="full"
      fallback-class="bg-brand-dark-900"
      :autoplay="100000"
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
      class="overflow-hidden"
    >
      <FeatureSection
        image-src="/img/home/unsere-werte.jpg"
        image-alt="Tennis Community TC Hardt"
        image-position="left"
        badge-text="Seit 1976"
        button-label="Mehr über uns"
        :button-to="$localePath('about')"
      >
        <Headline
          alignment="left"
          tagline="TC Hardt Philosophie"
          tagline-variant="accent"
          :title="$t('home.values.title')"
          title-class="text-3xl sm:text-4xl lg:text-5xl"
          :description="$t('home.values.description')"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(val, i) in values"
            :key="i"
            class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-brand-light-200 transition-colors"
          >
            <div class="mt-1 flex-shrink-0">
              <UIcon :name="val.icon" class="w-6 h-6 text-highlight-500" />
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
      </FeatureSection>
    </Section>

    <Section
      variant="primary"
      padding-top="xl"
      padding-bottom="xl"
      rounded
    >
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <Headline
            mode="light"
            alignment="left"
            tagline="Aktuelles"
            tagline-variant="highlight"
            :title="$t('home.news.title')"
            class="mb-0"
          />
        </div>
        <Button
          :to="localePath('news')"
          variant="highlight"
          trailing-icon="i-heroicons-arrow-right"
        >
          Alle News
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardTeaser
          v-for="news in newsItems"
          :key="news.id"
          :image="news.image"
          :title="news.title"
          :date="news.date"
          :description="news.excerpt"
          link-text="Weiterlesen"
          :to="localePath({ name: 'news-id', params: { id: news.id } })"
        />
      </div>
    </Section>

    <Section
      :use-container="false"
      padding-top="xl"
      padding-bottom="xl"
    >
      <UContainer>
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
      </UContainer>

      <Sponsors />
    </Section>
  </div>
</template>
