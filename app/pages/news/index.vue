<script setup lang="ts">
import Section from '~/components/base/Section.vue'
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import Headline from '~/components/base/Headline.vue'
import db from '~/assets/data/db.json'

useHead({ title: 'Aktuelles | TC Hardt' })

const newsItems = db.news.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime())
</script>

<template>
  <div>
    <Section>
      <Headline
        title="Aktuelles"
        tag="h1"
        size="h1"
        alignment="center"
        subtitle="Neuigkeiten, Spielberichte und Termine."
      />
    </Section>
    <Section variant="secondary-light" :outer-container="true">
      <div class="space-y-8 max-w-5xl mx-auto">
        <FeaturedNewsCard
          v-for="(news, index) in newsItems"
          :key="news.id"
          :to="$localePath(`/news/${news.id}`)"
          :image="news.image"
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
