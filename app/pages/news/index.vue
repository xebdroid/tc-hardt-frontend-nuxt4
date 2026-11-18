<script setup lang="ts">
import PageHero from '~/components/sections/PageHero.vue'
import Section from '~/components/base/Section.vue'
import NewsList from '~/components/news/NewsList.vue'

useSeoMeta({
  title: 'Aktuelles & News',
  ogTitle: 'Aktuelles & News',
  description: 'Bleib auf dem Laufenden! Aktuelle Nachrichten, Spielberichte und Ankündigungen rund um den TC Hardt.',
  ogDescription: 'Bleib auf dem Laufenden! Aktuelle Nachrichten, Spielberichte und Ankündigungen rund um den TC Hardt.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="news-index-page">
    <PageHero
      title="Aktuelles"
      margin-bottom="none"
    />

    <Section
      variant="secondary-light"
      card
      spacing="compact"
    >
      <NewsList />
    </Section>
  </div>
</template>
