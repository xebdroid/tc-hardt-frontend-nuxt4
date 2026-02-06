<script setup lang="ts">
type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?:
    | 'default'
    | 'gray'          | 'gray-light'
    | 'primary'       | 'primary-light'
    | 'secondary'     | 'secondary-light'
    | 'highlight'     | 'highlight-light'
    | 'accent'        | 'accent-light'

  rounded?: boolean
  paddingTop?: PaddingSize
  paddingBottom?: PaddingSize

  /**
   * Zieht die Section nach oben über den Vorgänger (-mt)
   */
  overlapTop?: boolean

  /**
   * Zieht die nachfolgende Section unter diese Section (-mb)
   */
  overlapBottom?: boolean

  /**
   * Wickelt nur den INHALT in einen Container (Standard: true)
   */
  useContainer?: boolean

  /**
   * Wickelt die GESAMTE Sektion in einen Container
   */
  outerContainer?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: false,
  paddingTop: 'lg',
  paddingBottom: 'lg',
  overlapTop: false,
  overlapBottom: false,
  useContainer: true,
  outerContainer: false
})

// --- FARBEN ---
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'gray': return 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
    case 'gray-light': return 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800'
    case 'primary': return 'bg-brand-dark-900 text-white'
    case 'primary-light': return 'bg-brand-dark-50 dark:bg-brand-dark-900/50 text-brand-dark-900 dark:text-white'
    case 'secondary': return 'bg-brand-light-300 text-white'
    case 'secondary-light': return 'bg-brand-light-50 dark:bg-brand-light-950/30 text-brand-dark-900 dark:text-brand-light-50'
    case 'highlight': return 'bg-highlight-400 text-brand-dark-900'
    case 'highlight-light': return 'bg-highlight-50 dark:bg-highlight-900/10 text-brand-dark-900 dark:text-white'
    case 'accent': return 'bg-accent-500 text-white'
    case 'accent-light': return 'bg-accent-50 dark:bg-accent-900/10 text-brand-dark-900 dark:text-white'
    default: return 'bg-white dark:bg-gray-950 text-gray-900 dark:text-white'
  }
})

// --- PADDING ---
const ptMap: Record<PaddingSize, string> = {
  none: 'pt-0', sm: 'pt-12', md: 'pt-16', lg: 'pt-24', xl: 'pt-32'
}
const pbMap: Record<PaddingSize, string> = {
  none: 'pb-0', sm: 'pb-12', md: 'pb-16', lg: 'pb-24', xl: 'pb-32'
}

const spacingClasses = computed(() => {
  return `${ptMap[props.paddingTop]} ${pbMap[props.paddingBottom]}`
})

// --- OVERLAP LOGIK ---
const layoutClasses = computed(() => {
  const classes = []
  if (props.overlapTop) classes.push('-mt-16')
  if (props.overlapBottom) classes.push('-mb-16')
  if (props.rounded) classes.push('rounded-3xl')
  return classes.join(' ')
})

// Dynamische Komponente für die äußere Hülle
const RootElement = computed(() => props.outerContainer ? resolveComponent('UContainer') : 'div')
</script>

<template>
  <component :is="RootElement" :class="{ 'px-0': outerContainer }">
    <section
      class="w-full transition-colors duration-300 relative"
      :class="[
        variantClasses,
        spacingClasses,
        layoutClasses
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
  </component>
</template>
