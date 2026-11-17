<script setup lang="ts">
import type { ResolvedGalleryAlbum } from '~/composables/useGallery'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  album: ResolvedGalleryAlbum
  to: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="to" class="gallery-album-card">
    <div class="cover-wrap">
      <NuxtImg
        :src="album.coverImage"
        :alt="album.title"
        sizes="sm:100vw md:50vw lg:400px"
        loading="lazy"
        class="cover-img"
      />
      <div class="cover-gradient" />

      <div class="year-badge-wrap">
        <span class="year-badge">
          {{ album.year }}
        </span>
      </div>

      <div class="counts-wrap">
        <span class="count-badge">
          <BaseIcon name="i-heroicons-photo" class="count-icon" />
          {{ album.photoCount }} {{ album.photoCount === 1 ? 'Foto' : 'Fotos' }}
        </span>
        <span v-if="album.videoCount > 0" class="count-badge">
          <BaseIcon name="i-heroicons-video-camera" class="count-icon" />
          {{ album.videoCount }}
        </span>
      </div>
    </div>

    <div class="body">
      <div v-if="album.date" class="date-row">
        <BaseIcon name="i-heroicons-calendar" class="date-icon" />
        <span class="date-text">
          {{ album.date }}
        </span>
      </div>

      <Headline
        :title="album.title"
        tag="h2"
        size="h4"
        margin-bottom="none"
        title-class="album-title"
      />

      <p v-if="album.description" class="desc">
        {{ album.description }}
      </p>

      <div class="footer">
        <Button
          label="Album ansehen"
          variant="ghost"
          size="sm"
          trailing-icon="i-heroicons-arrow-small-right"
          class="view-btn"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.gallery-album-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-100);
  overflow: hidden;
  text-decoration: none;
  transition: box-shadow 300ms ease, transform 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-0.25rem);
  }
}

.cover-wrap {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-gray-100);

  @include dark {
    background-color: var(--color-gray-900);
  }
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms ease;

  .gallery-album-card:hover & {
    transform: scale(1.05);
  }
}

.cover-gradient {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to top, rgb(0 0 0 / 0.5), transparent, rgb(0 0 0 / 0.2));
  opacity: 0.8;
  transition: opacity 300ms ease;

  .gallery-album-card:hover & {
    opacity: 0.6;
  }
}

.year-badge-wrap {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
}

.year-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgb(26 40 82 / 0.85);
  color: var(--color-white);
  backdrop-filter: blur(2px);
}

.counts-wrap {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  background-color: rgb(0 0 0 / 0.65);
  color: var(--color-white);
  backdrop-filter: blur(2px);
}

.count-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent-400);
}

.body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: var(--space-5);
}

.date-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: var(--space-2);
}

.date-icon {
  width: 1rem;
  height: 1rem;
  color: var(--color-accent-500);
  flex-shrink: 0;
}

.date-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.025em;

  @include dark {
    color: var(--color-gray-400);
  }
}

:deep(.album-title) {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--space-2);
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.gallery-album-card:hover :deep(.album-title) {
  color: var(--color-accent-600);

  @include dark {
    color: var(--color-accent-400);
  }
}

.desc {
  margin: 0 0 var(--space-4);
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-gray-600);
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
  padding-top: var(--space-2);
}

.view-btn {
  color: var(--color-accent-600);
  margin-left: -0.625rem;
  padding: 0;

  .gallery-album-card:hover & {
    color: var(--color-accent-700);
  }
}
</style>
