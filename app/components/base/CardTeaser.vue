<script setup lang="ts">
import { NuxtImg } from '#components'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  image: string
  title: string
  to: string
  date?: string
  description?: string
  linkText?: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="to" class="card-teaser">
    <div class="media">
      <div class="media-overlay" />
      <NuxtImg
        :src="image"
        class="media-img"
        :alt="title"
      />
    </div>

    <div class="body">
      <div v-if="date" class="meta">
        <BaseIcon name="i-heroicons-calendar" class="meta-icon" />
        <span class="meta-date">{{ date }}</span>
      </div>

      <Headline
        :title="title"
        tag="h3"
        size="h5"
        margin-bottom="sm"
        title-class="card-teaser-title"
      />

      <p v-if="description" class="desc">
        {{ description }}
      </p>

      <div v-if="linkText" class="footer">
        <Button
          :label="linkText"
          variant="ghost"
          size="sm"
          trailing-icon="i-heroicons-arrow-small-right"
          class="more-btn"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card-teaser {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-pure-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-dark-900);
  text-decoration: none;
  transition:
    box-shadow 300ms ease,
    transform 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
  }

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-0.25rem);
  }
}

.media {
  height: 14rem;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.2);
  z-index: 1;
  transition: background-color 300ms ease;

  .card-teaser:hover & {
    background-color: transparent;
  }
}

.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms ease;

  .card-teaser:hover & {
    transform: scale(1.1);
  }
}

.body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-highlight-500);
}

.meta-date {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: var(--color-gray-500);
  text-transform: uppercase;
}

:deep(.card-teaser-title) {
  color: var(--color-brand-dark-900);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.card-teaser:hover :deep(.card-teaser-title) {
  color: var(--color-highlight-600);
}

.desc {
  margin: 0 0 var(--space-4);
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-gray-500);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @include dark {
    color: var(--color-gray-400);
  }
}

.footer {
  margin-top: auto;
  padding-top: var(--space-4);
  display: flex;
  justify-content: flex-end;
}

.more-btn {
  color: var(--color-highlight-600);
  margin-right: -0.625rem;

  .card-teaser:hover & {
    color: var(--color-highlight-700);
  }
}
</style>
