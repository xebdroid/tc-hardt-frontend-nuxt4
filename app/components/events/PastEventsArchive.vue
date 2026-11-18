<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '~/types'
import EventItem from '~/components/events/EventItem.vue'
import BaseCollapsible from '~/components/base/Collapsible.vue'
import BaseIcon from '~/components/base/Icon.vue'

export interface PastEventsYearGroup {
  year: number
  events: Event[]
}

interface Props {
  groups: PastEventsYearGroup[]
}

defineProps<Props>()

const openPastYear = ref<number | null>(null)
const openPastEventId = ref<number | null>(null)

const handlePastYearToggle = (year: number) => {
  openPastYear.value = openPastYear.value === year ? null : year
}

const handlePastEventToggle = (id: number) => {
  openPastEventId.value = openPastEventId.value === id ? null : id
}
</script>

<template>
  <div class="past-events-archive">
    <BaseCollapsible
      v-for="group in groups"
      :key="group.year"
      class="year-collapsible"
      :open="openPastYear === group.year"
    >
      <button
        type="button"
        class="year-trigger"
        :class="{ 'is-open': openPastYear === group.year }"
        @click="handlePastYearToggle(group.year)"
      >
        <div class="year-left">
          <BaseIcon
            name="i-heroicons-calendar-days"
            class="year-icon"
          />
          <span class="year-label">
            Jahrgang {{ group.year }}
          </span>
          <span class="year-count">
            {{ group.events.length }} {{ group.events.length === 1 ? 'Termin' : 'Termine' }}
          </span>
        </div>

        <BaseIcon
          name="i-heroicons-chevron-down"
          class="year-chevron"
          :class="{ 'is-open': openPastYear === group.year }"
        />
      </button>

      <template #content>
        <div class="year-events">
          <EventItem
            v-for="event in group.events"
            :key="event.id"
            :event="event"
            :is-past="true"
            :is-open="openPastEventId === event.id"
            @toggle="handlePastEventToggle(event.id)"
          />
        </div>
      </template>
    </BaseCollapsible>
  </div>
</template>

<style lang="scss" scoped>
.past-events-archive {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.year-collapsible {
  display: flex;
  flex-direction: column;
}

.year-trigger {
  width: 100%;
  padding: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  cursor: pointer;
  text-align: left;
  border-radius: var(--radius-lg);
  background-color: var(--color-pure-white);
  border: 1px solid var(--color-gray-200);
  transition: all 200ms ease;

  @include up("md") {
    padding: var(--space-5) var(--space-6);
  }

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-700);
  }

  &:hover:not(.is-open) {
    background-color: var(--color-gray-50);

    @include dark {
      background-color: rgb(255 255 255 / 0.05);
    }
  }

  &.is-open {
    border-color: var(--color-accent-500);
    box-shadow: var(--shadow-sm);

    @include dark {
      border-color: var(--color-accent-400);
    }
  }
}

.year-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.year-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-accent-500);
  flex-shrink: 0;
}

.year-label {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  transition: color var(--transition-fast);

  @include up("md") {
    font-size: 1.5rem;
  }

  @include dark {
    color: var(--color-white);
  }

  .year-trigger:hover & {
    color: var(--color-accent-600);

    @include dark {
      color: var(--color-accent-400);
    }
  }
}

.year-count {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  background-color: var(--color-gray-100);
  color: var(--color-gray-600);

  @include dark {
    background-color: var(--color-gray-800);
    color: var(--color-gray-300);
  }
}

.year-chevron {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-gray-400);
  flex-shrink: 0;
  transition: transform 300ms ease, color var(--transition-fast);

  &.is-open {
    transform: rotate(180deg);
    color: var(--color-accent-500);
  }
}

.year-events {
  padding-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
