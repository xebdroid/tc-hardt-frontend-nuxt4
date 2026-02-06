<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Sponsors from '~/components/base/Sponsors.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureSection from '~/components/base/FeatureSection.vue'
import CardTeaser from '~/components/base/CardTeaser.vue'
import db from '~/assets/data/db.json'

const { t } = useI18n()
const localePath = useLocalePath()

// --- DATA ---
const heroSlides = computed<HeroSlide[]>(() => [
  {
    type: 'video',
    src: '/videos/plaetze_von_oben.mp4',
    poster: '/img/anlage/tc-hardt-anlage-01.jpg',
    title: 'Unsere Anlagen von oben',
    subtitle: 'Erkunde unsere erstklassigen Tennisplätze und Einrichtungen.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Mitglied werden', to: localePath('membership') }
  },
  {
    type: 'video',
    src: '/videos/tennis_example.mp4',
    poster: '/img/video-poster.jpg',
    title: 'Training in Aktion',
    subtitle: 'Schau dir an, wie unsere Jugend trainiert.',
    overlayPosition: 'center',
    ctaPrimary: { label: 'Probetraining', to: localePath('contact') }
  },
  {
    type: 'image',
    src: '/img/50_jahre_3.png',
    title: 'Unsere Jubiläums-Highlights 2026',
    overlayPosition: 'bottom-right',
    ctaPrimary: { label: "Mehr erfahren", to: localePath('contact') }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2000&auto=format&fit=crop',
    title: t('home.hero.title'),
    subtitle: t('home.hero.description'),
    overlayPosition: 'center',
    ctaPrimary: { label: t('home.hero.cta_primary'), to: localePath('contact') },
    ctaSecondary: { label: t('home.hero.cta_secondary'), to: localePath('about') }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1530915365347-e35b749a0381?q=80&w=1740&auto=format&fit=crop',
    title: 'Leidenschaft am Ball',
    subtitle: 'Unsere Trainer bringen dein Spiel auf das nächste Level.',
    overlayPosition: 'bottom-left',
    ctaPrimary: { label: 'Training buchen', to: localePath('training') }
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
    overlayImage: '/tc-hardt-logo.svg',
    overlayImageClass: 'w-20 mb-4 drop-shadow-md',
    title: 'Mehr als ein Verein',
    subtitle: 'Erlebe unsere starke Gemeinschaft.',
    overlayPosition: 'bottom-right',
    ctaPrimary: { label: 'Termine ansehen', to: localePath('news') }
  }
])

const clubFeatures = computed(() => [
  {
    icon: 'i-heroicons-trophy',
    title: t('home.intro_features.courts.title'),
    description: t('home.intro_features.courts.desc'),
    to: localePath('membership')
  },
  {
    icon: 'i-heroicons-user-group',
    title: t('home.intro_features.community.title'),
    description: t('home.intro_features.community.desc'),
    to: localePath('membership')
  },
  {
    icon: 'i-heroicons-sparkles',
    title: t('home.intro_features.training.title'),
    description: t('home.intro_features.training.desc'),
    to: localePath('training')
  },
  {
    icon: 'i-heroicons-home-modern',
    title: 'Clubheim',
    description: 'Geselligkeit & kühle Getränke nach dem Match.',
    to: localePath('about')
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
      :autoplay="6000"
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
        <NuxtLink
          v-for="(feature, index) in clubFeatures"
          :key="index"
          :to="feature.to"
          class="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 border-t-4 border-highlight-400 transition-all duration-300 group"
        >
          <div class="w-14 h-14 rounded-full bg-brand-light-50 dark:bg-brand-light-900/50 flex items-center justify-center text-brand-light-600 mb-6 group-hover:scale-110 transition-transform">
            <UIcon :name="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="font-heading font-bold text-xl text-brand-dark-900 dark:text-white mb-3 group-hover:text-highlight-600 transition-colors">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
        </NuxtLink>
      </div>
    </Section>

    <Section
      variant="default"
      padding-top="xl"
      padding-bottom="xl"
      class="overflow-hidden"
    >
      <FeatureSection
        image-src="https://images.unsplash.com/photo-1591100463799-a9ef12226ba4?q=80&w=928&auto=format&fit=crop"
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
