<script setup lang="ts">
import Headline from '~/components/base/Headline.vue'

interface Props {
  title: string
  tag?: 'h2' | 'h3'
  size?: 'h4' | 'h5'
  spacing?: 'none' | 'md' | 'lg'
  compact?: boolean
  centered?: boolean
  divider?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'h2',
  size: 'h4',
  spacing: 'md',
  compact: false,
  centered: false,
  divider: false
})
</script>

<template>
  <div
    class="legal-section"
    :class="{
      'is-compact': compact,
      'is-centered': centered
    }"
  >
    <div class="legal-sidebar">
      <Headline
        :title="title"
        :tag="tag"
        :size="size"
        margin-bottom="none"
      />
    </div>

    <div
      class="legal-content"
      :class="`space-${spacing}`"
    >
      <slot />
    </div>
  </div>

  <hr v-if="divider" class="u-separator">
</template>

<style lang="scss" scoped>
.legal-section {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--space-6);
  column-gap: var(--space-12);

  &.is-compact {
    row-gap: var(--space-4);
  }

  &.is-centered {
    align-items: center;
  }

  @include up('md') {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

.legal-sidebar {
  @include up('md') {
    grid-column: span 4 / span 4;
  }

  @include up('lg') {
    grid-column: span 3 / span 3;
  }
}

.legal-content {
  color: var(--color-gray-600);
  line-height: 1.625;
  text-align: left;

  @include dark {
    color: var(--color-gray-300);
  }

  @include up('md') {
    grid-column: span 8 / span 8;
  }

  @include up('lg') {
    grid-column: span 9 / span 9;
  }

  &.space-md {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &.space-lg {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  :deep(p) {
    margin: 0;
  }

  :deep(a:not(.base-button)) {
    color: var(--color-accent-600);
    text-decoration: none;

    @include dark {
      color: var(--color-accent-400);
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
