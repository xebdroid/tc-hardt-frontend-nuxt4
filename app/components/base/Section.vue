<script setup lang="ts">
import { NuxtImg } from '#components'
import { computed } from 'vue'

type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
type RoundedSide = boolean | 'top' | 'bottom' | 'both'
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type Responsive<T> = T | Partial<Record<Breakpoint | 'base', T>>

interface Props {
  variant?:
    | 'default'
    | 'gray'          | 'gray-light'
    | 'primary'       | 'primary-light'
    | 'secondary'     | 'secondary-light'
    | 'highlight'     | 'highlight-light'
    | 'accent'        | 'accent-light'

  rounded?: RoundedSide
  paddingTop?: Responsive<SpacingSize>
  paddingBottom?: Responsive<SpacingSize>
  paddingLeft?: Responsive<SpacingSize>
  paddingRight?: Responsive<SpacingSize>
  marginTop?: Responsive<SpacingSize>
  marginBottom?: Responsive<SpacingSize>

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
  useContainer?: Responsive<boolean>

  /**
   * Wickelt die GESAMTE Sektion in einen Container
   */
  outerContainer?: Responsive<boolean>

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

// --- PADDING & MARGIN ---
const spacingMaps = {
  pt: { none: 'pt-0', xs: 'pt-4', sm: 'pt-12', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', xxl: 'pt-42' },
  pb: { none: 'pb-0', xs: 'pb-4', sm: 'pb-12', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', xxl: 'pb-42' },
  pl: { none: 'pl-0', xs: 'pl-4', sm: 'pl-12', md: 'pl-16', lg: 'pl-24', xl: 'pl-32', xxl: 'pl-42' },
  pr: { none: 'pr-0', xs: 'pr-4', sm: 'pr-12', md: 'pr-16', lg: 'pr-24', xl: 'pr-32', xxl: 'pr-42' },
  mt: { none: 'mt-0', xs: 'mt-4', sm: 'mt-12', md: 'mt-16', lg: 'mt-24', xl: 'mt-32', xxl: 'mt-42' },
  mb: { none: 'mb-0', xs: 'mb-4', sm: 'mb-12', md: 'mb-16', lg: 'mb-24', xl: 'mb-32', xxl: 'mb-42' }
}

const getResponsiveClasses = (
  propValue: Responsive<SpacingSize> | undefined,
  classMap: Record<SpacingSize, string>
): string => {
  if (!propValue) { return '' }

  if (typeof propValue === 'string') {
    return classMap[propValue]
  }

  // Handle responsive object
  const classes: string[] = []
  if (propValue.base) {
    classes.push(classMap[propValue.base])
  }

  for (const key in propValue) {
    if (key === 'base') continue
    const bp = key as Breakpoint
    const size = propValue[bp]
    if (size) {
      classes.push(`${bp}:${classMap[size]}`)
    }
  }

  return classes.join(' ')
}

const spacingClasses = computed(() => {
  const classes = [
    getResponsiveClasses(props.paddingTop, spacingMaps.pt),
    getResponsiveClasses(props.paddingBottom, spacingMaps.pb),
    getResponsiveClasses(props.paddingLeft, spacingMaps.pl),
    getResponsiveClasses(props.paddingRight, spacingMaps.pr),
    getResponsiveClasses(props.marginTop, spacingMaps.mt),
    getResponsiveClasses(props.marginBottom, spacingMaps.mb)
  ]
  return classes.filter(c => c).join(' ')
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

// --- CONTAINER LOGIC ---
const getContainerClasses = (value: Responsive<boolean> | undefined, defaultValue: boolean): string => {
  const isContainer = value ?? defaultValue

  // 1. Status für jeden Breakpoint ermitteln
  const state: Record<'base' | Breakpoint, boolean> = {
    base: false, sm: false, md: false, lg: false, xl: false, '2xl': false
  }

  if (typeof isContainer === 'boolean') {
    state.base = state.sm = state.md = state.lg = state.xl = state['2xl'] = isContainer
  } else {
    state.base = isContainer.base ?? defaultValue
    state.sm = isContainer.sm ?? state.base
    state.md = isContainer.md ?? state.sm
    state.lg = isContainer.lg ?? state.md
    state.xl = isContainer.xl ?? state.lg
    state['2xl'] = isContainer['2xl'] ?? state.xl
  }

  const classes = ['w-full']

  // 2. Explizite Zuweisung pro Breakpoint (ohne widersprüchliche Doppel-Klassen)

  // BASE
  if (state.base) classes.push('mx-auto', 'px-4')
  else classes.push('mx-0', 'px-0', 'max-w-full')

  // SM
  if (state.sm && !state.base) classes.push('sm:mx-auto', 'sm:px-6')
  else if (!state.sm && state.base) classes.push('sm:mx-0', 'sm:px-0', 'sm:max-w-full')
  else if (state.sm && state.base) classes.push('sm:px-6')

  // MD
  if (state.md && !state.sm) classes.push('md:mx-auto')
  else if (!state.md && state.sm) classes.push('md:mx-0', 'md:px-0', 'md:max-w-full')

  // LG
  if (state.lg && !state.md) classes.push('lg:mx-auto', 'lg:px-0', 'lg:max-w-4xl')
  else if (!state.lg && state.md) classes.push('lg:mx-0', 'lg:px-0', 'lg:max-w-full')
  else if (state.lg && state.md) classes.push('lg:px-0', 'lg:max-w-4xl')

  // XL
  if (state.xl && !state.lg) classes.push('xl:mx-auto', 'xl:max-w-5xl')
  else if (!state.xl && state.lg) classes.push('xl:mx-0', 'xl:px-0', 'xl:max-w-full')
  else if (state.xl && state.lg) classes.push('xl:max-w-5xl')

  // 2XL
  if (state['2xl'] && !state.xl) classes.push('2xl:mx-auto', '2xl:max-w-6xl')
  else if (!state['2xl'] && state.xl) classes.push('2xl:mx-0', '2xl:px-0', '2xl:max-w-full')
  else if (state['2xl'] && state.xl) classes.push('2xl:max-w-6xl')

  return classes.join(' ')
}

const outerContainerClasses = computed(() => getContainerClasses(props.outerContainer, false))
const innerContainerClasses = computed(() => getContainerClasses(props.useContainer, true))
</script>

<template>
  <div :class="outerContainerClasses">
    <section
      class="w-full transition-colors duration-300 relative"
      :class="[
        variantClasses,
        spacingClasses,
        layoutClasses
      ]"
      :style="backgroundStyles"
    >
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

      <div class="relative z-10 h-full" :class="innerContainerClasses">
        <slot />
      </div>
    </section>
  </div>
</template>
