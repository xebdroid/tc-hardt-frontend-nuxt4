<script setup lang="ts">
import FeaturedNewsCard from '~/components/news/FeaturedNewsCard.vue'
import db from '~/assets/data/db.json'

// 1. Get current date (and ignore time)
const today = new Date()
today.setHours(0, 0, 0, 0)

// 2. Filter and sort news items
const newsItems = db.news
  .filter((item) => {
    // Rule 1: If 'published' is explicitly false, hide it.
    if (item.published === false) {
      return false
    }

    // Rule 2: If 'publishDate' exists, check it.
    if (item.publishDate) {
      const publishDate = new Date(item.publishDate)
      // Hide if publishDate is in the future
      if (publishDate > today) {
        return false
      }
    }

    // Rule 3: If 'published' is explicitly true, show it.
    // This handles cases where a future publishDate might be set but we want to force it visible.
    if (item.published === true) {
      return true
    }

    // Default: Show the item if it passed the date check or if no rules applied.
    return true
  })
  .sort((a, b) => {
    // Helper to parse German date strings "DD.MM.YYYY"
    const parseDate = (dateString: string) => {
      const [day, month, year] = dateString.split('.').map(Number)
      return new Date(year, month - 1, day)
    }
    return parseDate(b.date).getTime() - parseDate(a.date).getTime()
  })
</script>

<template>
  <div class="space-y-8">
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
    <div v-if="newsItems.length === 0" class="text-center py-12">
      <p class="text-gray-500">
        Aktuell gibt es keine Neuigkeiten.
      </p>
    </div>
  </div>
</template>
