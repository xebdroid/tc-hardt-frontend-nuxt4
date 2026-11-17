<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { NuxtLink } from '#components'
import BaseIcon from '~/components/base/Icon.vue'

export type ButtonVariant =
  | 'primary'
  | 'brand-dark'
  | 'highlight'
  | 'outline'
  | 'ghost'
  | 'gold1'
  | 'gold2'
  | 'ghost-white'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  to?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  label?: string
  icon?: string
  trailingIcon?: string
  trailing?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  target?: string
  size?: ButtonSize
  variant?: ButtonVariant
  cta?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  block: false,
  trailing: false,
  loading: false,
  disabled: false,
  cta: false
})

const slots = useSlots()

const linkTarget = computed(() => props.to || props.href)
const isExternalLink = computed(() => {
  const url = linkTarget.value
  if (!url) return false
  return (
    props.target === '_blank' ||
    url.startsWith('http') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('data:') ||
    url.endsWith('.pdf')
  )
})
const isTrailing = computed(() => props.trailing || Boolean(props.ui?.icon?.trailing))

const leadingIconName = computed(() => {
  if (props.loading) return 'i-heroicons-arrow-path'
  if (props.icon && !isTrailing.value) return props.icon
  return undefined
})

const trailingIconName = computed(() => {
  if (props.trailingIcon) return props.trailingIcon
  if (props.icon && isTrailing.value) return props.icon
  return undefined
})

const isIconOnly = computed(() => {
  return !props.label && !slots.default && Boolean(leadingIconName.value || trailingIconName.value)
})
</script>

<template>
  <component
    :is="linkTarget ? NuxtLink : 'button'"
    :to="linkTarget || undefined"
    :target="linkTarget ? target : undefined"
    :external="linkTarget ? isExternalLink : undefined"
    :type="!linkTarget ? type : undefined"
    :disabled="!linkTarget ? (disabled || loading) : undefined"
    :aria-disabled="linkTarget && (disabled || loading) ? 'true' : undefined"
    class="base-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      {
        'is-block': block,
        'is-icon-only': isIconOnly,
        'is-disabled': disabled || loading
      }
    ]"
    v-bind="$attrs"
  >
    <BaseIcon
      v-if="leadingIconName"
      :name="leadingIconName"
      class="icon"
      :class="{ 'is-spinning': loading }"
    />

    <span v-if="label || $slots.default" class="label">
      <slot>{{ label }}</slot>
    </span>

    <BaseIcon
      v-if="trailingIconName"
      :name="trailingIconName"
      class="icon"
    />
  </component>
</template>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-sm); /* 0.375rem (6px) = Tailwind rounded-md */
  font-family: var(--font-sans);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1);

  &.hidden {
    display: none;
  }

  @include up("sm") {
    &.sm\:flex { display: flex; }
    &.sm\:inline-flex { display: inline-flex; }
    &.sm\:hidden { display: none; }
  }

  @include up("md") {
    &.md\:flex { display: flex; }
    &.md\:inline-flex { display: inline-flex; }
    &.md\:hidden { display: none; }
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-dark-800);
    outline-offset: 2px;
  }

  &.is-block {
    width: 100%;
    justify-content: center;
  }

  &.is-disabled {
    opacity: 0.75;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ========================================================================
     SIZES (1:1 Nuxt UI v4 UButton Maße)
     ======================================================================== */
  &.size-xs {
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.25rem 0.5rem;
    gap: 0.25rem;
    .icon { width: 1rem; height: 1rem; }
    &.is-icon-only { padding: 0.25rem; }
  }

  &.size-sm {
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.375rem 0.625rem;
    gap: 0.375rem;
    .icon { width: 1rem; height: 1rem; }
    &.is-icon-only { padding: 0.375rem; }
  }

  &.size-md {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.375rem 0.625rem;
    gap: 0.375rem;
    .icon { width: 1.25rem; height: 1.25rem; }
    &.is-icon-only { padding: 0.375rem; }
  }

  &.size-lg {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    .icon { width: 1.25rem; height: 1.25rem; }
    &.is-icon-only { padding: 0.5rem; }
  }

  &.size-xl {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    .icon { width: 1.5rem; height: 1.5rem; }
    &.is-icon-only { padding: 0.5rem; }
  }

  /* ========================================================================
     VARIANTS
     ======================================================================== */
  &.variant-primary {
    background-color: var(--color-brand-dark-800);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-brand-dark-700);
    }

    @include dark {
      background-color: var(--color-highlight-500);
      color: var(--color-brand-dark-950);

      &:hover {
        background-color: var(--color-highlight-400);
      }
    }
  }

  &.variant-brand-dark {
    background-color: var(--color-brand-dark-800);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-brand-dark-700);
    }
  }

  &.variant-highlight {
    background-color: var(--color-highlight-500);
    color: var(--color-brand-dark-950);

    &:hover {
      background-color: var(--color-highlight-400);
    }
  }

  &.variant-outline {
    background-color: transparent;
    box-shadow: inset 0 0 0 1px currentColor;
    color: var(--color-brand-dark-800);

    &:hover {
      background-color: var(--color-brand-dark-50);
    }

    @include dark {
      color: var(--color-white);

      &:hover {
        background-color: rgb(28 48 99 / 0.5);
      }
    }
  }

  &.variant-ghost {
    background-color: transparent;
    color: var(--color-brand-dark-800);

    &:hover {
      background-color: var(--color-gray-100);
    }

    @include dark {
      color: var(--color-white);

      &:hover {
        background-color: var(--color-gray-800);
      }
    }
  }

  &.variant-ghost-white {
    background-color: transparent;
    color: var(--color-white);

    &:hover {
      color: var(--color-brand-light-200);
      background-color: rgb(255 255 255 / 0.1);
    }
  }

  &.variant-gold1 {
    color: var(--color-brand-dark-950);
    font-weight: 700;
    background-image: linear-gradient(to bottom right, #fbbf24, #fef9c3, #fbbf24);
    background-size: 300% 300%;
    animation: gold-shine-rotate 6s linear infinite;

    &:hover {
      box-shadow: var(--shadow-xl);
    }
  }

  &.variant-gold2 {
    color: var(--color-brand-dark-950);
    font-weight: 700;
    background-image: linear-gradient(to bottom right, #8D6933, #E3C887, #714C20);
    background-size: 300% 300%;
    animation: gold-shine-rotate 6s linear infinite;

    &:hover {
      box-shadow: var(--shadow-xl);
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

  &.is-spinning {
    animation: button-spin 1s linear infinite;
  }
}

@keyframes button-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
