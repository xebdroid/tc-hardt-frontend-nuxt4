<script setup lang="ts">
import Image from '~/components/base/Image.vue'
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
  imagePosition?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  imagePosition: 'left'
})
</script>

<template>
  <NuxtLink :to="to" class="featured-news-card">
    <div
      class="card-layout"
      :class="{ 'is-reversed': imagePosition === 'right' }"
    >
      <div class="top-row">
        <div class="media-box">
          <Image
            :src="image"
            :alt="title"
            variant="news"
            class="news-image"
          >
            <template #overlay>
              <div class="image-overlay" />
            </template>
          </Image>
        </div>

        <div class="mobile-header">
          <div v-if="date" class="mobile-date">
            <BaseIcon name="i-heroicons-calendar" class="mobile-date-icon" />
            <span class="mobile-date-text">{{ date }}</span>
          </div>

          <Headline
            :title="title"
            tag="h2"
            size="h4"
            margin-bottom="none"
            title-class="mobile-title break-word-hyphens"
          />
        </div>
      </div>

      <div class="content-col">
        <div class="desktop-header">
          <Headline
            :title="title"
            tag="h2"
            size="h4"
            margin-bottom="none"
            title-class="desktop-title break-word-hyphens"
          />
          <div v-if="date" class="desktop-date">
            <BaseIcon name="i-heroicons-calendar" class="desktop-date-icon" />
            <span class="desktop-date-text">{{ date }}</span>
          </div>
        </div>

        <p v-if="description" class="desc">
          {{ description }}
        </p>

        <div class="footer">
          <Button
            :label="linkText"
            variant="ghost"
            size="sm"
            trailing-icon="i-heroicons-arrow-small-right"
            class="more-btn"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.featured-news-card {
  display: block;
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
  text-decoration: none;
  transition: box-shadow 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
  }

  &:hover {
    box-shadow: var(--shadow-xl);
  }
}

.card-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  @include up("md") {
    flex-direction: row;
    align-items: center;

    &.is-reversed {
      flex-direction: row-reverse;
    }
  }
}

.top-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--space-4);

  @include up("md") {
    display: contents;
  }
}

.media-box {
  flex: none;
}

.news-image {
  width: 6rem !important;
  height: 6rem !important;

  @include up("md") {
    width: 150px !important;
    height: 150px !important;
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background-color: rgb(0 0 0 / 0.1);
  transition: background-color var(--transition-fast);

  .featured-news-card:hover & {
    background-color: transparent;
  }
}

.mobile-header {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 0.125rem;

  @include up("md") {
    display: none;
  }
}

.mobile-date {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.mobile-date-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-highlight-500);
}

.mobile-date-text {
  font-size: 10px;
  font-weight: 700;
  color: var(--color-gray-500);
  text-transform: uppercase;
}

:deep(.mobile-title) {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.content-col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.desktop-header {
  display: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-2);

  @include up("md") {
    display: flex;
  }
}

:deep(.desktop-title) {
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
  color: var(--color-brand-dark-900);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.featured-news-card:hover :deep(.mobile-title),
.featured-news-card:hover :deep(.desktop-title) {
  color: var(--color-highlight-600);
}

.desktop-date {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.desktop-date-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-highlight-500);
}

.desktop-date-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gray-500);
  text-transform: uppercase;
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

  @include up("md") {
    -webkit-line-clamp: 3;
    margin-bottom: var(--space-6);
  }

  @include dark {
    color: var(--color-gray-400);
  }
}

.footer {
  margin-top: auto;
}

.more-btn {
  color: var(--color-highlight-600);
  margin-left: -0.625rem;

  .featured-news-card:hover & {
    color: var(--color-highlight-700);
  }
}
</style>
