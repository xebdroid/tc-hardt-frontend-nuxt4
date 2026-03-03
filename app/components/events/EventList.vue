<script setup lang="ts">
import { ref, computed } from 'vue'
import EventItem from './EventItem.vue'
import type { Event } from '~/types'
import Headline from '~/components/base/Headline.vue'

const props = defineProps({
  month: {
    type: String,
    default: undefined
  },
  events: {
    type: Array as () => Event[],
    required: true
  },
  layout: {
    type: String as () => 'list' | 'grid',
    default: 'list'
  },
  upcoming: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 0
  }
})

const openEventId = ref<number | null>(null)

const handleToggle = (id: number) => {
  openEventId.value = openEventId.value === id ? null : id
}

const displayEvents = computed(() => {
  let processed = [...props.events]

  if (props.upcoming) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    processed = processed.filter((event) => {
      const eventDate = new Date(event.date)
      if (event.dateEnd) {
        const endDate = new Date(event.dateEnd)
        return endDate >= today
      }
      return eventDate >= today
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  if (props.limit > 0) {
    processed = processed.slice(0, props.limit)
  }

  return processed
})
</script>

<template>
  <div>
    <Headline
      v-if="month"
      :title="month"
      tag="h2"
      size="h3"
      margin-top="md"
      margin-bottom="xs"
      alignment="center"
    />
    <div :class="layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6 items-start' : 'space-y-4'">
      <EventItem
        v-for="event in displayEvents"
        :key="event.id"
        :event="event"
        :is-open="openEventId === event.id"
        @toggle="handleToggle(event.id)"
        :variant="layout === 'grid' ? 'compact' : 'default'"
      />
    </div>
  </div>
</template>
