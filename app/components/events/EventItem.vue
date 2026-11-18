<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '~/types'
import { useCalendar } from '~/composables/useCalendar'
import Button from '~/components/base/Button.vue'
import EventDate from '~/components/events/EventDate.vue'
import Image from '~/components/base/Image.vue'
import BaseIcon from '~/components/base/Icon.vue'
import BaseCollapsible from '~/components/base/Collapsible.vue'

const props = defineProps({
  event: {
    type: Object as () => Event,
    required: true
  },
  isPast: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as () => 'default' | 'compact',
    default: 'default'
  }
})

const { calendarOptions } = useCalendar(props.event)

const hasOptionalContent = computed(() => {
  return props.event.content || props.event.description || props.event.time || props.event.location
})

const emit = defineEmits(['toggle'])

function handleToggle() {
  emit('toggle')
  if (import.meta.client && !props.isOpen && (window as any)._paq) {
    (window as any)._paq.push(['trackEvent', 'Termine', 'Details Aufgeklappt', props.event.title])
  }
}

function trackCalendarClick(actionLabel?: string) {
  if (import.meta.client && (window as any)._paq) {
    const label = actionLabel || 'Unbekannt';
    (window as any)._paq.push(['trackEvent', 'Termine', 'Kalender Export', `${props.event.title} (${label})`])
  }
}
</script>

<template>
  <div
    class="event-item"
    :class="[
      `variant-${variant}`,
      {
        'is-past-closed': isPast && !isOpen,
        'is-upcoming': !isPast
      }
    ]"
  >
    <div class="item-layout">
      <div class="date-sidebar">
        <div class="date-row">
          <div :class="{ 'single-date-wrap': !event.dateEnd }">
            <EventDate :date="event.date" :date-end="event.dateEnd" />
          </div>

          <Image
            :src="event.image"
            :alt="event.title"
            variant="event"
          >
            <BaseIcon name="i-heroicons-calendar-days" class="fallback-icon" />
          </Image>
        </div>
      </div>

      <BaseCollapsible
        class="collapsible-col"
        :disabled="!hasOptionalContent"
        :open="isOpen"
      >
        <div class="header-trigger" @click="handleToggle">
          <h3 class="title">
            {{ event.title }}
          </h3>

          <div v-if="hasOptionalContent" class="chevron-wrap">
            <BaseIcon
              name="i-heroicons-chevron-down"
              class="chevron-icon"
              :class="{ 'is-open': isOpen }"
            />
          </div>
        </div>

        <template #content>
          <div class="details-body">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              v-if="event.content"
              class="rich-text"
              v-html="event.content"
            />
            <p v-else-if="event.description" class="desc-text">
              {{ event.description }}
            </p>

            <div class="meta-bar">
              <div v-if="event.time" class="meta-item">
                <BaseIcon name="i-heroicons-clock" class="meta-icon" />
                <span>{{ event.time }}</span>
              </div>
              <div v-if="event.location" class="meta-item">
                <BaseIcon name="i-heroicons-map-pin" class="meta-icon" />
                <span>{{ event.location }}</span>
              </div>
            </div>

            <div v-if="event.gallerySlug" class="gallery-action">
              <Button
                :to="$localePath(`/galerie/${event.gallerySlug}`)"
                label="Zur Bildergalerie"
                icon="i-heroicons-photo"
                size="md"
                variant="outline"
              />
            </div>

            <div v-if="!isPast && calendarOptions.length > 0" class="calendar-actions">
              <Button
                v-for="(action, idx) in calendarOptions"
                :key="idx"
                v-bind="action"
                size="md"
                variant="outline"
                class="cal-btn"
                @click="trackCalendarClick(action.label)"
              />
            </div>
          </div>
        </template>
      </BaseCollapsible>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.event-item {
  width: 100%;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  background-color: var(--color-pure-white);
  overflow: hidden;
  transition: all 300ms ease;

  @include dark {
    background-color: var(--color-gray-900);
    border-color: var(--color-gray-700);
  }

  &.is-past-closed {
    opacity: 0.7;
    filter: grayscale(100%);
  }

  &.is-upcoming:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-gray-300);

    @include dark {
      border-color: var(--color-gray-600);
    }
  }
}

.item-layout {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;

  .variant-default & {
    @include up("md") {
      flex-direction: row;
    }
  }
}

.date-sidebar {
  background-color: var(--color-gray-50);
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  flex-direction: column;

  @include dark {
    background-color: rgb(255 255 255 / 0.05);
    border-bottom-color: var(--color-gray-700);
  }

  .variant-default & {
    @include up("md") {
      width: 20rem; /* md:w-80 */
      border-bottom: 0;
      border-right: 1px solid var(--color-gray-100);

      @include dark {
        border-right-color: var(--color-gray-700);
      }
    }
  }
}

.date-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  gap: var(--space-4);

  @include up("md") {
    padding: var(--space-4);
  }
}

.single-date-wrap {
  @include up("md") {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}

.fallback-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-gray-400);
}

.collapsible-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: center;

  &[data-state="open"] {
    justify-content: flex-start;
  }
}

.header-trigger {
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  cursor: pointer;
  min-height: 5.5rem;

  @include up("md") {
    padding: var(--space-4);
    min-height: 6rem;
  }
}

.title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }

  .collapsible-col:hover & {
    color: var(--color-accent-600);

    @include dark {
      color: var(--color-accent-400);
    }
  }
}

.chevron-wrap {
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.chevron-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-gray-400);
  transition: transform 300ms ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.details-body {
  padding: 0 var(--space-3) var(--space-3);
  color: var(--color-gray-600);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @include up("md") {
    padding: 0 var(--space-4) var(--space-4);
  }

  @include dark {
    color: var(--color-gray-300);
  }
}

.rich-text,
.desc-text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.meta-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  font-size: 0.875rem;
  color: var(--color-gray-500);
  border-top: 1px solid var(--color-gray-100);
  padding-top: var(--space-4);

  @include dark {
    color: var(--color-gray-400);
    border-top-color: var(--color-gray-700);
  }
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  color: var(--color-accent-500);
}

.gallery-action {
  padding-top: 0.5rem;
}

.calendar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding-top: 0.5rem;
}

.cal-btn {
  flex: 1;
  justify-content: center;

  @include up("sm") {
    flex: none;
  }
}
</style>
