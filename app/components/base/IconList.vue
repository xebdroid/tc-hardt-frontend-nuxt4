<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

export interface IconListItem {
  icon?: string
  label?: string
  text: string
}

interface Props {
  items: IconListItem[]
  defaultIcon?: string
  iconColor?: 'brand-dark' | 'brand-light' | 'accent' | 'highlight'
  iconSize?: 'md' | 'lg'
  marginTop?: 'none' | 'md'
}

withDefaults(defineProps<Props>(), {
  defaultIcon: 'i-heroicons-check-circle',
  iconColor: 'brand-dark',
  iconSize: 'md',
  marginTop: 'none'
})
</script>

<template>
  <ul
    class="base-icon-list"
    :class="{ 'has-mt': marginTop === 'md' }"
  >
    <li
      v-for="(item, idx) in items"
      :key="idx"
      class="list-item"
    >
      <BaseIcon
        :name="item.icon || defaultIcon"
        class="item-icon"
        :class="[`color-${iconColor}`, `size-${iconSize}`]"
      />
      <span>
        <strong v-if="item.label">{{ item.label }} </strong>{{ item.text }}
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.base-icon-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  color: var(--color-gray-700);

  @include dark {
    color: var(--color-gray-300);
  }

  &.has-mt {
    margin-top: var(--space-8);
  }
}

.list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.item-icon {
  flex-shrink: 0;

  &.size-md {
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.125rem;
  }

  &.size-lg {
    width: 1.875rem;
    height: 1.875rem;
  }

  &.color-brand-dark { color: var(--color-brand-dark-500); }
  &.color-brand-light { color: var(--color-brand-light-600); }
  &.color-accent { color: var(--color-accent-500); }
  &.color-highlight { color: var(--color-highlight-600); }
}
</style>
