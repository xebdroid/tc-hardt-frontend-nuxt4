<script setup lang="ts">
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import db from '~/assets/data/db.json'
import { parseGermanDate } from '~/utils/date'

const today = new Date()
today.setHours(0, 0, 0, 0)

const newsItems = (db.news as any[])
  .filter((item) => {
    if (item.published === false) {
      return false
    }

    if (item.publishDate) {
      const publishDate = new Date(item.publishDate)
      if (publishDate > today) {
        return false
      }
    }

    if (item.published === true) {
      return true
    }

    return true
  })
  .sort((a, b) => parseGermanDate(b.date) - parseGermanDate(a.date))
</script>

<template>
  <div class="news-list">
    <FeaturedNewsCard
      v-for="(news, index) in newsItems"
      :key="news.id"
      :to="$localePath(`/news/${(news as any).slug}`)"
      :image="news.image || 'https://placehold.co/200x200/e2e8f0/94a3b8?text=TC+Hardt'"
      :title="news.title"
      :date="news.date"
      :description="news.excerpt"
      :image-position="index % 2 === 0 ? 'left' : 'right'"
      link-text="Weiterlesen"
    />
    <div v-if="newsItems.length === 0" class="empty-state">
      <p class="empty-text">
        Aktuell gibt es keine Neuigkeiten.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.empty-state {
  text-align: center;
  padding-block: var(--space-12);
}

.empty-text {
  color: var(--color-gray-500);
}
</style>
