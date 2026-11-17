<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

export type BadgeColor = 'primary' | 'highlight' | 'accent' | 'neutral' | 'success' | 'warning' | 'error'
export type BadgeVariant = 'solid' | 'outline' | 'soft' | 'subtle'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  label?: string
  icon?: string
  trailingIcon?: string
  color?: BadgeColor
  variant?: BadgeVariant
  size?: BadgeSize
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'solid',
  size: 'md'
})
</script>

<template>
  <span
    class="base-badge"
    :class="[
      `color-${color}`,
      `variant-${variant}`,
      `size-${size}`
    ]"
  >
    <BaseIcon v-if="icon" :name="icon" class="icon" />
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <BaseIcon v-if="trailingIcon" :name="trailingIcon" class="icon" />
  </span>
</template>

<style lang="scss" scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-weight: 500;
  white-space: nowrap;

  /* ========================================================================
     SIZES (1:1 Nuxt UI v4 UBadge Maße)
     ======================================================================== */
  &.size-xs {
    font-size: 0.5rem;
    line-height: 0.75rem;
    padding: 0.125rem 0.25rem;
    gap: 0.25rem;
    border-radius: var(--radius-xs);
    .icon { width: 0.75rem; height: 0.75rem; }
  }

  &.size-sm {
    font-size: 0.625rem;
    line-height: 0.75rem;
    padding: 0.25rem 0.375rem;
    gap: 0.25rem;
    border-radius: var(--radius-xs);
    .icon { width: 0.75rem; height: 0.75rem; }
  }

  &.size-md {
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.25rem 0.5rem;
    gap: 0.25rem;
    border-radius: var(--radius-sm);
    .icon { width: 1rem; height: 1rem; }
  }

  &.size-lg {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.25rem 0.5rem;
    gap: 0.375rem;
    border-radius: var(--radius-sm);
    .icon { width: 1.25rem; height: 1.25rem; }
  }

  &.size-xl {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.25rem 0.625rem;
    gap: 0.375rem;
    border-radius: var(--radius-sm);
    .icon { width: 1.5rem; height: 1.5rem; }
  }

  /* ========================================================================
     COLORS & VARIANTS
     ======================================================================== */
  &.color-primary {
    &.variant-solid {
      background-color: var(--color-brand-dark-800);
      color: var(--color-white);
    }
    &.variant-outline {
      color: var(--color-brand-dark-800);
      box-shadow: inset 0 0 0 1px rgb(28 48 99 / 0.5);
    }
    &.variant-soft {
      background-color: rgb(28 48 99 / 0.1);
      color: var(--color-brand-dark-800);
    }
    &.variant-subtle {
      background-color: rgb(82 110 182 / 0.1);
      color: var(--color-brand-dark-600);
      box-shadow: inset 0 0 0 1px rgb(82 110 182 / 0.25);

      @include dark {
        background-color: rgb(118 145 202 / 0.15);
        color: var(--color-brand-dark-300);
        box-shadow: inset 0 0 0 1px rgb(118 145 202 / 0.3);
      }
    }
  }

  &.color-highlight {
    &.variant-solid {
      background-color: var(--color-highlight-500);
      color: var(--color-brand-dark-950);
    }
    &.variant-subtle {
      background-color: rgb(132 204 22 / 0.12);
      color: var(--color-highlight-700);
      box-shadow: inset 0 0 0 1px rgb(132 204 22 / 0.3);
    }
  }

  &.color-neutral {
    &.variant-solid {
      background-color: var(--color-gray-900);
      color: var(--color-white);
    }
    &.variant-subtle {
      background-color: var(--color-gray-100);
      color: var(--color-gray-700);
      box-shadow: inset 0 0 0 1px var(--color-gray-200);
    }
  }
}

.label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  flex-shrink: 0;
}
</style>
