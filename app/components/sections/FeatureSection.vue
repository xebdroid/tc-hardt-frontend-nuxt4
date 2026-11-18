<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import Image from '~/components/base/Image.vue'
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  imageObjectPosition?: string

  badgeText?: string
  badgeIcon?: string

  buttonLabel?: string
  buttonTo?: string
  buttonVariant?: 'primary' | 'brand-dark' | 'highlight' | 'outline' | 'ghost'
}

withDefaults(defineProps<Props>(), {
  imageAlt: '',
  imagePosition: 'left',
  imageObjectPosition: 'object-center',
  badgeIcon: 'i-heroicons-star',
  buttonVariant: 'brand-dark'
})
</script>

<template>
  <div class="feature-section" :class="`image-${imagePosition}`">
    <div class="media-col">
      <Image
        :src="imageSrc"
        :alt="imageAlt"
        :object-position="imageObjectPosition"
        class="feature-img"
      />

      <div v-if="badgeText" class="sticker">
        <div class="sticker-inner">
          <BaseIcon :name="badgeIcon" class="sticker-icon" />
          <span class="sticker-text">{{ badgeText }}</span>
        </div>
      </div>
    </div>

    <div class="content-col">
      <slot />

      <div v-if="buttonLabel && buttonTo" class="action-row">
        <Button
          :to="buttonTo"
          :variant="buttonVariant"
          :label="buttonLabel"
          trailing-icon="i-heroicons-arrow-right"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.feature-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-12);

  @include up("md") {
    flex-direction: row;

    &.image-right {
      .media-col { order: 2; }
      .content-col { order: 1; }
    }

    &.image-left {
      .media-col { order: 1; }
      .content-col { order: 2; }
    }
  }

  @include up("lg") {
    gap: var(--space-24);
  }
}

.media-col {
  width: 100%;
  position: relative;

  @include up("md") {
    width: 50%;
  }
}

.feature-img {
  z-index: 10;
}

.sticker {
  display: none;
  position: absolute;
  top: 2.25rem;
  left: 1.5rem;
  z-index: 30;
  background-color: var(--color-highlight-400);
  color: var(--color-brand-dark-900);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  transform: rotate(-20deg);

  @include up("sm") {
    display: block;
  }
}

.sticker-inner {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.sticker-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.sticker-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.content-col {
  width: 100%;

  @include up("md") {
    width: 50%;
  }
}

.action-row {
  margin-top: var(--space-10);
  display: flex;
  justify-content: flex-end;
}
</style>
