<script setup lang="ts">
import { NuxtImg } from '#components'

interface Props {
  src?: string | null
  alt?: string
  variant?: 'feature' | 'portrait' | 'round' | 'event' | 'news'
  size?: 'small' | 'large'
  objectPosition?: string
  sizes?: string
}

withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: '',
  variant: 'feature',
  size: 'large',
  objectPosition: 'object-center',
  sizes: 'sm:100vw md:50vw lg:800px'
})
</script>

<template>
  <div
    class="base-image"
    :class="[`variant-${variant}`, `size-${size}`]"
  >
    <template v-if="src">
      <NuxtImg
        :src="src"
        :alt="alt"
        class="img"
        :class="objectPosition"
        :sizes="sizes"
        loading="lazy"
      />
      <slot name="overlay" />
    </template>
    <slot v-else />
  </div>
</template>

<style lang="scss" scoped>
.base-image {
  overflow: hidden;

  &.variant-event {
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    background-color: var(--color-gray-100);
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;

    @include dark {
      background-color: var(--color-gray-800);
    }
  }

  &.variant-round {
    border-radius: var(--radius-full);
    border: 4px solid var(--color-white);
    background-color: var(--color-gray-100);
    display: flex;
    align-items: center;
    justify-content: center;

    &.size-small {
      width: 6rem;
      height: 6rem;
      box-shadow: var(--shadow-md);
    }

    &.size-large {
      width: 16rem;
      height: 16rem;
      box-shadow: var(--shadow-lg);
    }
  }

  &.variant-portrait {
    width: 12rem;
    height: 16rem;
    border-radius: var(--radius-xl);
    border: 12px solid var(--color-white);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;

    @include up("md") {
      width: 14rem;
      height: 18rem;
    }
  }

  &.variant-news {
    position: relative;
    width: 100%;
    height: 12rem;
    flex: none;
    border-radius: var(--radius-md);

    @include up("md") {
      width: 150px;
      height: 150px;
    }
  }

  &.variant-feature {
    position: relative;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl);
    border: 4px solid var(--color-white);
    aspect-ratio: 4 / 3;

    @include dark {
      border-color: var(--color-gray-800);
    }
  }
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  &.object-top { object-position: top; }
  &.object-bottom { object-position: bottom; }
  &.object-left { object-position: left; }
  &.object-right { object-position: right; }

  .variant-feature & {
    transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
