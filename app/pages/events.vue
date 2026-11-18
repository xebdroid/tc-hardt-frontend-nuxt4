<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import db from '~/assets/data/db.json'
import type { Event } from '~/types'
import PageHero from '~/components/base/PageHero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import EventList from '~/components/events/EventList.vue'
import PastEventsArchive from '~/components/events/PastEventsArchive.vue'
import { useAllEventsCalendar } from '~/composables/useAllEventsCalendar'
import Button from '~/components/base/Button.vue'

useSeoMeta({
  title: 'Events & Termine',
  ogTitle: 'Events & Termine',
  description: 'Verpasse keine Veranstaltung beim TC Hardt! Hier findest du alle aktuellen Termine, Turniere und Feiern im Überblick.',
  ogDescription: 'Verpasse keine Veranstaltung beim TC Hardt! Hier findest du alle aktuellen Termine, Turniere und Feiern im Überblick.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})

const now = ref(new Date())

onMounted(() => {
  now.value = new Date()
})

const { downloadAllIcs } = useAllEventsCalendar()

const isTbaDate = (dateStr?: string) => !dateStr || dateStr.trim().toLowerCase() === 'tba' || isNaN(new Date(dateStr).getTime())

const upcomingEvents = computed(() => {
  return [...db.events]
    .filter(event => isTbaDate(event.date) || new Date(event.date) >= now.value)
    .sort((a, b) => {
      const aTba = isTbaDate(a.date)
      const bTba = isTbaDate(b.date)
      if (aTba && bTba) return 0
      if (aTba) return 1
      if (bTba) return -1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
})

const upcomingYear = computed(() => {
  const datedEvents = upcomingEvents.value.filter(e => !isTbaDate(e.date))
  if (datedEvents.length === 0) return now.value.getFullYear()
  const years = [...new Set(datedEvents.map(e => new Date(e.date).getFullYear()))].sort()
  return years.length === 1 ? `${years[0]}` : `${years[0]}/${years[years.length - 1]}`
})

const upcomingEventsForSchema = computed(() => {
  return upcomingEvents.value
    .filter(event => !isTbaDate(event.date))
    .slice(0, 10)
    .map((event) => {
      const atHomeKeywords = ['clubhaus', 'anlage', 'tc hardt']
      const locationString = event.location?.toLowerCase() || ''
      const isAtHome = atHomeKeywords.some(keyword => locationString.includes(keyword))
      const address = isAtHome ? (db as any).clubInfo?.address : event.location

      return {
        name: event.title,
        startDate: event.date,
        endDate: event.dateEnd || event.date,
        description: event.description || 'Vereinsveranstaltung des TC Hardt e.V.',
        location: {
          name: isAtHome ? 'TC Hardt e.V. Clubanlage' : (event.location || 'TC Hardt e.V.'),
          address: address || 'Birkmannsweg 16, 41169 Mönchengladbach'
        },
        image: event.image || '/img/logo.png',
        url: 'https://www.tc-hardt.de/termine'
      }
    })
})

useSchemaOrg([
  ...upcomingEventsForSchema.value.map(evt => defineEvent(evt))
])

const upcomingEventsByMonth = computed(() => {
  const grouped: { [key: string]: Event[] } = {}
  for (const event of upcomingEvents.value) {
    const month = isTbaDate(event.date)
      ? 'Termin noch offen'
      : new Date(event.date).toLocaleString('de-DE', { month: 'long' })

    if (!grouped[month]) {
      grouped[month] = []
    }
    grouped[month].push(event as Event)
  }
  return grouped
})

const pastEvents = computed(() => {
  return [...db.events]
    .filter(event => !isTbaDate(event.date) && new Date(event.date) < now.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const pastEventsByYear = computed(() => {
  const grouped = new Map<number, Event[]>()
  for (const event of pastEvents.value) {
    const year = new Date(event.date).getFullYear()
    if (!grouped.has(year)) {
      grouped.set(year, [])
    }
    grouped.get(year)!.push(event as Event)
  }
  return Array.from(grouped.entries())
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, events]) => ({ year, events }))
})

const eventCountDescription = computed(() => {
  const upcomingCount = upcomingEvents.value.length
  return `Ein Jahr voller Events: Freut euch auf ${upcomingCount} kommende Termine und werft einen Blick auf unsere vergangenen Highlights.`
})
</script>

<template>
  <div class="events-page">
    <PageHero
      title="Club-Veranstaltungen"
      description="Das ist bei uns im Club los. Komm vorbei!"
    />

    <Section margin-bottom="none">
      <Headline
        :title="`Unsere Events ${upcomingYear}`"
        :description="eventCountDescription"
        tag="h2"
        size="h2"
        alignment="center"
        margin-bottom="sm"
      />
      <div class="download-row">
        <Button
          label="Alle Termine herunterladen"
          icon="i-heroicons-arrow-down-tray"
          variant="outline"
          @click="downloadAllIcs"
        />
      </div>
    </Section>

    <Section
      v-if="upcomingEvents.length > 0"
      variant="secondary-light"
      rounded
      overlap-bottom
      padding-top="xs"
      padding-bottom="sm"
      :padding-left="{ base: 'none', md: 'xs', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'xs', lg: 'md' }"
      :outer-container="{ base: false, md: true }"
      class="upcoming-section"
    >
      <template v-if="Object.keys(upcomingEventsByMonth).length > 0">
        <EventList
          v-for="(monthlyEvents, month) in upcomingEventsByMonth"
          :key="month"
          :month="month as string"
          :events="monthlyEvents"
          class="month-group"
        />
      </template>
      <p v-else class="empty-text">
        Aktuell sind keine zukünftigen Termine eingetragen.
      </p>
    </Section>

    <Section
      v-if="pastEventsByYear.length > 0"
      variant="gray-light"
      rounded="top"
      :padding-top="{ base: 'lg', md: 'xl' }"
      padding-bottom="lg"
      :padding-left="{ base: 'none', md: 'xs', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'xs', lg: 'md' }"
      :outer-container="{ base: false, md: true }"
      margin-bottom="xl"
      class="past-section"
    >
      <Headline
        title="Vergangene Events"
        description="Ein kleiner Rückblick auf unsere letzten Veranstaltungen."
        alignment="center"
      />
      <PastEventsArchive :groups="pastEventsByYear" />
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.download-row {
  display: flex;
  justify-content: center;
}

.upcoming-section {
  position: relative;
  z-index: 10;
}

.month-group {
  margin-bottom: var(--space-12);
}

.empty-text {
  text-align: center;
  color: var(--color-gray-500);
}

.past-section {
  position: relative;
  z-index: 0;
}
</style>
