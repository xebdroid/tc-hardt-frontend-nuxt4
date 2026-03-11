<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import NewsList from '~/components/news/NewsList.vue'
import Headline from '~/components/base/Headline.vue'
import Hero from '~/components/base/Hero.vue'

useSeoMeta({
  title: 'Aktuelles & News | TC Hardt',
  ogTitle: 'Aktuelles & News | TC Hardt',
  description: 'Bleib auf dem Laufenden! Aktuelle Nachrichten, Spielberichte und Ankündigungen rund um den TC Hardt.',
  ogDescription: 'Bleib auf dem Laufenden! Aktuelle Nachrichten, Spielberichte und Ankündigungen rund um den TC Hardt.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>

    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          title="Aktuelles"
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'none'"
        />
      </template>
    </Hero>

    <Section
      variant="secondary-light"
      margin-top="sm"
      margin-bottom="md"
      :padding-top="{ base: 'xs', sm:'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', sm:'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      :outer-container="{ base: false, md: true}"
      rounded
    >
      <NewsList />
    </Section>
  </div>
</template>
