<script setup lang="ts">
import { ref } from 'vue'
import EventItem from './EventItem.vue'
import type { Event } from '~/types'
import Headline from '~/components/base/Headline.vue'

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
  <div>
    <Headline
      :title="month"
      tag="h2"
      size="h3"
      margin-top="md"
      margin-bottom="xs"
      alignment="center"
    />
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
