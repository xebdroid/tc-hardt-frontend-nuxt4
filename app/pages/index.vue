<script setup lang="ts">
import Hero, { type HeroSlide } from '~/components/sections/Hero.vue'
import Section from '~/components/base/Section.vue'
import BaseGrid from '~/components/base/Grid.vue'
import Sponsors from '~/components/sections/Sponsors.vue'
import Button from '~/components/base/Button.vue'
import Headline from '~/components/base/Headline.vue'
import FeatureCard from '~/components/sections/FeatureCard.vue'
import ClubValuesSection from '~/components/club/ClubValuesSection.vue'
import NewsSlider from '~/components/news/NewsSlider.vue'
import EventList from '~/components/events/EventList.vue'
import MemorialSection from '~/components/club/MemorialSection.vue'
import db from '~/assets/data/db.json'
import { parseGermanDate } from '~/utils/date'

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
  return [...db.news]
    .sort((a, b) => parseGermanDate(b.date) - parseGermanDate(a.date))
    .slice(0, 4)
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

      <BaseGrid :cols="4">
        <FeatureCard
          v-for="(feature, index) in clubFeatures"
          :key="index"
          v-bind="feature"
        />
      </BaseGrid>
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

      <ClubValuesSection :values="values" />
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

      <NewsSlider :items="newsItems as any" />
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
</style>
