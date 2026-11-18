<script setup lang="ts">
interface Props {
  cols?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  marginTop?: 'none' | 'sm' | 'md' | 'lg'
  padded?: boolean
}

withDefaults(defineProps<Props>(), {
  cols: 3,
  gap: 'lg',
  marginTop: 'none',
  padded: false
})
</script>

<template>
  <div
    class="base-grid"
    :class="[
      `cols-${cols}`,
      `gap-${gap}`,
      `mt-${marginTop}`,
      { 'is-padded': padded }
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-grid {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;

  &.gap-sm { gap: var(--space-4); }
  &.gap-md { gap: var(--space-6); }
  &.gap-lg { gap: var(--space-8); }

  &.mt-none { margin-top: 0; }
  &.mt-sm { margin-top: var(--space-8); }
  &.mt-md { margin-top: var(--space-10); }
  &.mt-lg { margin-top: var(--space-12); }

  &.cols-2 {
    @include up("md") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &.cols-3 {
    @include up("md") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include up("lg") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &.cols-4 {
    @include up("sm") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include up("lg") {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  &.is-padded {
    @include up("md") {
      padding-inline: var(--space-24);
    }
  }
}
</style>
