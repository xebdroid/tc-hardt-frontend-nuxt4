<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '~/components/base/PageHero.vue'
import Section from '~/components/base/Section.vue'
import ArticleInfoBox from '~/components/ArticleInfoBox.vue'
import db from '~/assets/data/db.json'
import Headline from '~/components/base/Headline.vue'
import Image from '~/components/base/Image.vue'
import Button from '~/components/base/Button.vue'

const route = useRoute()
const newsItem = computed(() => {
  return (db.news as any).find((n: any) => n.slug === route.params.slug)
})

if (newsItem.value) {
  useSeoMeta({
    title: () => newsItem.value.title,
    ogTitle: () => newsItem.value.title,
    twitterTitle: () => newsItem.value.title,
    description: () => newsItem.value.excerpt,
    ogDescription: () => newsItem.value.excerpt,
    twitterDescription: () => newsItem.value.excerpt,
    ogImage: () => newsItem.value.image || '/img/logo.png',
    twitterImage: () => newsItem.value.image || '/img/logo.png',
    twitterCard: 'summary_large_image',
  })
} else {
  useSeoMeta({
    title: 'News nicht gefunden',
    robots: 'noindex, nofollow'
  })
}

const isLargeImageLayout = computed(() => newsItem.value?.layout === 'large-image')
</script>

<template>
  <div v-if="newsItem" class="news-detail-page">
    <PageHero
      title="Aktuelles"
      back-to="/news"
      back-label="Zurück zur Übersicht"
    />

    <Section
      variant="secondary-light"
      outer-container
      rounded
      :padding-top="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-bottom="{ base: 'xs', sm: 'sm', md: 'md' }"
      :padding-left="{ base: 'none', md: 'sm', lg: 'md' }"
      :padding-right="{ base: 'none', md: 'sm', lg: 'md' }"
      margin-bottom="xl"
      margin-top="sm"
    >
      <div class="article-container">
        <!-- Variante 2: Großes Bild links, Text darunter. Info rechts. -->
        <div v-if="isLargeImageLayout" class="article-grid">
          <div class="article-main is-flex-col">
            <Image
              v-if="(newsItem as any).image_large || newsItem.image"
              :src="(newsItem as any).image_large || newsItem.image"
              :alt="newsItem.title"
              class="large-image"
            />

            <Headline
              :title="newsItem.title"
              tag="h1"
              size="h3"
              mode="dark"
              alignment="left"
              margin-bottom="sm"
              class="large-headline"
            />

            <div class="article-prose is-order-3">
              <div class="rich-text" v-html="newsItem.content" />
              <div v-if="(newsItem.cta && newsItem.cta.to && newsItem.cta.label) || newsItem.gallerySlug" class="cta-row">
                <Button
                  v-if="newsItem.cta && newsItem.cta.to && newsItem.cta.label"
                  :to="newsItem.cta.to"
                  :label="newsItem.cta.label"
                  variant="brand-dark"
                />
                <Button
                  v-if="newsItem.gallerySlug"
                  :to="$localePath(`/galerie/${newsItem.gallerySlug}`)"
                  label="Zur Bildergalerie"
                  icon="i-heroicons-photo"
                  variant="outline"
                />
              </div>
            </div>
          </div>

          <div class="article-sidebar is-last">
            <ArticleInfoBox
              :date="newsItem.date"
              :title="newsItem.title"
              class="sticky-info"
            />
          </div>
        </div>

        <!-- Variante 1: Text links + Info Box. Kleines Bild rechts. -->
        <div v-else class="article-grid">
          <div class="article-main is-default-main">
            <Headline
              :title="newsItem.title"
              tag="h1"
              size="h3"
              mode="dark"
              alignment="left"
              margin-bottom="sm"
            />
            <div class="article-prose is-spaced-bottom">
              <div class="rich-text" v-html="newsItem.content" />
              <div v-if="(newsItem.cta && newsItem.cta.to && newsItem.cta.label) || newsItem.gallerySlug" class="cta-row">
                <Button
                  v-if="newsItem.cta && newsItem.cta.to && newsItem.cta.label"
                  :to="newsItem.cta.to"
                  :label="newsItem.cta.label"
                  variant="brand-dark"
                />
                <Button
                  v-if="newsItem.gallerySlug"
                  :to="$localePath(`/galerie/${newsItem.gallerySlug}`)"
                  label="Zur Bildergalerie"
                  icon="i-heroicons-photo"
                  variant="outline"
                />
              </div>
            </div>

            <ArticleInfoBox :date="newsItem.date" :title="newsItem.title" />
          </div>

          <div class="article-sidebar is-default-side">
            <Image
              v-if="newsItem.image"
              :src="newsItem.image"
              :alt="newsItem.title"
              class="square-image"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>

  <div v-else class="not-found">
    <div class="not-found-box">
      <h1 class="not-found-title">Artikel nicht gefunden</h1>
      <NuxtLink to="/news" class="not-found-link">Zurück zur Übersicht</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-container {
  max-width: 72rem;
  margin-inline: auto;
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);

  @include up('lg') {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.article-main {
  @include up('lg') {
    grid-column: span 2 / span 2;
  }

  &.is-flex-col {
    display: flex;
    flex-direction: column;
  }

  &.is-default-main {
    order: 2;

    @include up('lg') {
      order: 1;
    }
  }
}

.article-sidebar {
  @include up('lg') {
    grid-column: span 1 / span 1;
  }

  &.is-last {
    order: 99;
  }

  &.is-default-side {
    order: 1;

    @include up('lg') {
      order: 2;
    }
  }
}

.large-image {
  margin-bottom: var(--space-8);
  order: 1;

  @include up('lg') {
    order: 2;
  }
}

.large-headline {
  order: 2;

  @include up('lg') {
    order: 1;
  }
}

.article-prose {
  font-size: 1.125rem;
  line-height: 1.625;
  max-width: none;

  &.is-order-3 {
    order: 3;
  }

  &.is-spaced-bottom {
    margin-bottom: var(--space-10);
  }
}

.cta-row {
  margin-top: var(--space-8);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.sticky-info {
  position: sticky;
  top: 6rem;
}

.square-image {
  aspect-ratio: 1 / 1;
}

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-box {
  text-align: center;
}

.not-found-title {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin: 0 0 var(--space-4);
}

.not-found-link {
  color: var(--color-brand-dark-600);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
