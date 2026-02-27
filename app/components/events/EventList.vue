<script setup lang="ts">
import { ref } from 'vue'
import EventItem from './EventItem.vue'
import type { Event } from '~/types'

defineProps({
  month: {
    type: String,
    required: true
  },
  events: {
    type: Array as () => Event[],
    required: true
  }
})

const openEventId = ref<number | null>(null)

const handleToggle = (id: number) => {
  openEventId.value = openEventId.value === id ? null : id
}
</script>

<template>
  <div class="mb-12">
    <h2 class="text-3xl font-bold text-brand-dark-900 dark:text-white mb-6 font-heading">
      {{ month }}
    </h2>
    <div class="space-y-4">
      <EventItem
        v-for="event in events"
        :key="event.id"
        :event="event"
        :is-open="openEventId === event.id"
        @toggle="handleToggle(event.id)"
      />
    </div>
  </div>
</template>
