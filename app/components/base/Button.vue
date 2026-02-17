<script setup lang="ts">
/**
 * AppButton - Zentraler Button
 */

export type ButtonVariant = 'primary' | 'brand-dark' | 'highlight' | 'outline' | 'ghost'

interface Props {
  to?: string
  label?: string
  icon?: string
  block?: boolean
  loading?: boolean
  disabled?: boolean
  target?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: ButtonVariant
  cta?: boolean
  ui?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  cta: false
})

// Hier sind die korrigierten Farben
const variantStyles = {
  // 1. PRIMARY: Exakt deine alten CTA Farben
  // Light: Dunkelblau + Weiß
  // Dark: Highlight-500 + Dunkles Text
  primary: 'bg-brand-dark-800 text-white hover:bg-brand-dark-700 dark:bg-highlight-500 dark:hover:bg-highlight-400 dark:text-brand-dark-950',

  // 2. BRAND DARK: Immer Dunkelblau (für Footer Overlay)
  'brand-dark': 'bg-brand-dark-800 text-white hover:bg-brand-dark-700',

  // 3. HIGHLIGHT: Immer Highlight-Farbe
  highlight: 'bg-highlight-500 text-brand-dark-950 hover:bg-highlight-400',

  // 4. OUTLINE
  outline: 'bg-transparent ring-1 ring-inset ring-current text-brand-dark-800 dark:text-white hover:bg-brand-dark-50 dark:hover:bg-brand-dark-800/50',

  // 5. GHOST
  ghost: 'bg-transparent text-brand-dark-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
}

const uButtonVariant = computed(() => {
  if (props.variant === 'outline') return 'outline'
  if (props.variant === 'ghost') return 'ghost'
  return 'solid'
})

const buttonUI = computed(() => {
  const baseUI = props.ui || {}

  if (props.cta) {
    return {
      ...baseUI,
      rounded: 'rounded-full',
      font: 'font-bold',
      padding: {
        xl: 'px-10 py-4',
        lg: 'px-8 py-3',
        md: 'px-6 py-2.5'
      }
    }
  }

  return baseUI
})
</script>

<template>
  <UButton
    :to="to"
    :label="label"
    :icon="icon"
    :block="block"
    :loading="loading"
    :disabled="disabled"
    :target="target"
    :size="size"
    :variant="uButtonVariant"
    :ui="buttonUI"
    :class="[
      'transition-all duration-200 font-medium',
      variantStyles[variant]
    ]"
    v-bind="$attrs"
  >
    <slot />
  </UButton>
</template>
