<script setup lang="ts">
type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  /**
   * Design-Variante des Hintergrunds
   * [name]       -> Kräftige/Satte Farbe
   * [name]-light -> Helle/Pastellige Farbe
   */
  variant?:
    | 'default'       // Weiß
    | 'gray'          // Sattgrau (bg-gray-200)
    | 'gray-light'    // Hellgrau (bg-gray-50)
    | 'primary'       | 'primary-light'
    | 'secondary'     | 'secondary-light'
    | 'highlight'     | 'highlight-light'
    | 'accent'        | 'accent-light'

  rounded?: boolean
  paddingTop?: PaddingSize
  paddingBottom?: PaddingSize
  overlap?: boolean
  useContainer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: false,
  paddingTop: 'lg',
  paddingBottom: 'lg',
  overlap: false,
  useContainer: true
})

const variantClasses = computed(() => {
  switch (props.variant) {
    // --- 1. GRAY (Neutral) ---
    case 'gray': // Stronger Gray
      return 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
    case 'gray-light': // Subtle Gray
      return 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800'

    // --- 2. PRIMARY (Navy) ---
    case 'primary':
      return 'bg-brand-dark-900 text-white'
    case 'primary-light':
      return 'bg-brand-dark-50 dark:bg-brand-dark-900/50 text-brand-dark-900 dark:text-white'

    // --- 3. SECONDARY (Sky) ---
    case 'secondary':
      return 'bg-brand-light-300 text-white'
    case 'secondary-light':
      return 'bg-brand-light-50 dark:bg-brand-light-950/30 text-brand-dark-900 dark:text-brand-light-50'

    // --- 4. HIGHLIGHT (Lime) ---
    case 'highlight':
      return 'bg-highlight-400 text-brand-dark-900'
    case 'highlight-light':
      return 'bg-highlight-50 dark:bg-highlight-900/10 text-brand-dark-900 dark:text-white'

    // --- 5. ACCENT (Orange) ---
    case 'accent':
      return 'bg-accent-500 text-white'
    case 'accent-light':
      return 'bg-accent-50 dark:bg-accent-900/10 text-brand-dark-900 dark:text-white'

    // --- DEFAULT ---
    default:
      return 'bg-white dark:bg-gray-950 text-gray-900 dark:text-white'
  }
})

const ptMap: Record<PaddingSize, string> = {
  none: 'pt-0', sm: 'pt-12', md: 'pt-16', lg: 'pt-24', xl: 'pt-32'
}
const pbMap: Record<PaddingSize, string> = {
  none: 'pb-0', sm: 'pb-12', md: 'pb-16', lg: 'pb-24', xl: 'pb-32'
}

const spacingClasses = computed(() => {
  return `${ptMap[props.paddingTop]} ${pbMap[props.paddingBottom]}`
})
</script>

<template>
  <section
    class="relative w-full transition-colors duration-300"
    :class="[
      variantClasses,
      spacingClasses,
      {
        'rounded-3xl': rounded,
        '-mb-16 z-20 relative': overlap,
        'z-10': !overlap
      }
    ]"
  >
    <div v-if="$slots.background" class="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <slot name="background" />
    </div>

    <UContainer v-if="useContainer" class="relative z-10 h-full">
      <slot />
    </UContainer>

    <div v-else class="relative z-10 h-full w-full">
      <slot />
    </div>
  </section>
</template>
