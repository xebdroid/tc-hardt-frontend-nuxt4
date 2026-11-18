<script setup lang="ts">
import PageHero from '~/components/base/PageHero.vue'
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
      margin-top="sm"
      margin-bottom="md"
      :padding-top="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      :outer-container="{ base: false, md: true }"
      rounded
    >
      <NewsList />
    </Section>
  </div>
</template>
