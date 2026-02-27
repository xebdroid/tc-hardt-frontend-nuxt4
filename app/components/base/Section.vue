<script setup lang="ts">
import { NuxtImg } from '#components'

type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type RoundedSide = boolean | 'top' | 'bottom' | 'both'

interface Props {
  variant?:
    | 'default'
    | 'gray'          | 'gray-light'
    | 'primary'       | 'primary-light'
    | 'secondary'     | 'secondary-light'
    | 'highlight'     | 'highlight-light'
    | 'accent'        | 'accent-light'

  rounded?: RoundedSide
  paddingTop?: SpacingSize
  paddingBottom?: SpacingSize
  paddingLeft?: SpacingSize
  paddingRight?: SpacingSize
  marginTop?: SpacingSize
  marginBottom?: SpacingSize

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

  /**
   * URL zu einem Hintergrundbild
   */
  backgroundImage?: string

  /**
   * Ob das Hintergrundbild einen Parallax-Effekt haben soll
   */
  parallax?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: false,
  marginTop: undefined,
  marginBottom: undefined,
  paddingTop: 'lg',
  paddingBottom: 'lg',
  paddingLeft: undefined,
  paddingRight: undefined,
  overlapTop: false,
  overlapBottom: false,
  useContainer: true,
  outerContainer: false,
  backgroundImage: undefined,
  parallax: false
})

const backgroundStyles = computed(() => {
  if (!props.backgroundImage) { return {} }
  // Parallax: background-attachment: fixed als CSS-Hintergrund
  if (props.parallax) {
    return {
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }
  }
  // Ohne Parallax: kein CSS-Hintergrund, wird per NuxtImg im Template gelöst
  return {}
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
const ptMap: Record<SpacingSize, string> = { none: 'pt-0', xs: 'pt-3', sm: 'pt-12', md: 'pt-16', lg: 'pt-24', xl: 'pt-32' }
const pbMap: Record<SpacingSize, string> = { none: 'pb-0', xs: 'pb-3', sm: 'pb-12', md: 'pb-16', lg: 'pb-24', xl: 'pb-32' }
const mtMap: Record<SpacingSize, string> = { none: 'mt-0', xs: 'mt-3', sm: 'mt-12', md: 'mt-16', lg: 'mt-24', xl: 'mt-32' }
const mbMap: Record<SpacingSize, string> = { none: 'mb-0', xs: 'mb-3', sm: 'mb-12', md: 'mb-16', lg: 'mb-24', xl: 'mb-32' }

// Horizontal padding is only applied on large screens to avoid cramping mobile layouts
const plMap: Record<SpacingSize, string> = { none: 'lg:pl-0', xs: 'lg:pl-3', sm: 'lg:pl-12', md: 'lg:pl-16', lg: 'lg:pl-24', xl: 'lg:pl-32' }
const prMap: Record<SpacingSize, string> = { none: 'lg:pr-0', xs: 'lg:pr-3', sm: 'lg:pr-12', md: 'lg:pr-16', lg: 'lg:pr-24', xl: 'lg:pr-32' }

const spacingClasses = computed(() => {
  const classes = [ptMap[props.paddingTop], pbMap[props.paddingBottom]]
  if (props.marginTop) classes.push(mtMap[props.marginTop])
  if (props.marginBottom) classes.push(mbMap[props.marginBottom])
  if (props.paddingLeft) classes.push(plMap[props.paddingLeft])
  if (props.paddingRight) classes.push(prMap[props.paddingRight])
  return classes.join(' ')
})

// --- OVERLAP LOGIK ---
const layoutClasses = computed(() => {
  const classes = []
  if (props.overlapTop) classes.push('-mt-16')
  if (props.overlapBottom) classes.push('-mb-16')

  const rounded = props.rounded === true ? 'both' : props.rounded

  if (rounded === 'both') {
    classes.push('rounded-3xl')
  } else if (rounded === 'top') {
    classes.push('rounded-t-3xl')
  } else if (rounded === 'bottom') {
    classes.push('rounded-b-3xl')
  }
  return classes.join(' ')
})

// Dynamische Komponente für die äußere Hülle
const RootElement = computed(() => props.outerContainer ? resolveComponent('UContainer') : 'div')
</script>

<template>
  <component :is="RootElement">
    <section
      class="w-full transition-colors duration-300 relative"
      :class="[
        variantClasses,
        spacingClasses,
        layoutClasses
      ]"
      :style="backgroundStyles"
    >
      <!-- Optimiertes Hintergrundbild (nicht-Parallax) -->
      <div
        v-if="backgroundImage && !parallax"
        class="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]"
      >
        <NuxtImg
          :src="backgroundImage"
          alt=""
          class="w-full h-full object-cover"
          sizes="sm:100vw md:100vw lg:1400px"
          loading="lazy"
        />
      </div>

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
