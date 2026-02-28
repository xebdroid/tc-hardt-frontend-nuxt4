<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import Headline from '~/components/base/Headline.vue'
import Hero from '~/components/base/Hero.vue'
import db from '~/assets/data/db.json'

useHead({ title: 'Aktuelles | TC Hardt' })

const newsItems = db.news.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime())
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
      margin-bottom="xl"
      padding-top="md"
      padding-bottom="md"
      outer-container
      rounded
    >
      <div class="space-y-8 max-w-5xl mx-auto">
        <FeaturedNewsCard
          v-for="(news, index) in newsItems"
          :key="news.id"
          :to="$localePath(`/news/${news.id}`)"
          :image="news.image ?? ''"
          :title="news.title"
          :date="news.date"
          :description="news.excerpt"
          :image-position="index % 2 === 0 ? 'left' : 'right'"
          link-text="Weiterlesen"
        />
      </div>
    </Section>
  </div>
</template>
