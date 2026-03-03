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
  pt: {
    base: { none: 'pt-0', xs: 'pt-4', sm: 'pt-12', md: 'pt-16', lg: 'pt-24', xl: 'pt-32', xxl: 'pt-42' },
    sm: { none: 'sm:pt-0', xs: 'sm:pt-4', sm: 'sm:pt-12', md: 'sm:pt-16', lg: 'sm:pt-24', xl: 'sm:pt-32', xxl: 'sm:pt-42' },
    md: { none: 'md:pt-0', xs: 'md:pt-4', sm: 'md:pt-12', md: 'md:pt-16', lg: 'md:pt-24', xl: 'md:pt-32', xxl: 'md:pt-42' },
    lg: { none: 'lg:pt-0', xs: 'lg:pt-4', sm: 'lg:pt-12', md: 'lg:pt-16', lg: 'lg:pt-24', xl: 'lg:pt-32', xxl: 'lg:pt-42' },
    xl: { none: 'xl:pt-0', xs: 'xl:pt-4', sm: 'xl:pt-12', md: 'xl:pt-16', lg: 'xl:pt-24', xl: 'xl:pt-32', xxl: 'xl:pt-42' },
    '2xl': { none: '2xl:pt-0', xs: '2xl:pt-4', sm: '2xl:pt-12', md: '2xl:pt-16', lg: '2xl:pt-24', xl: '2xl:pt-32', xxl: '2xl:pt-42' }
  },
  pb: {
    base: { none: 'pb-0', xs: 'pb-4', sm: 'pb-12', md: 'pb-16', lg: 'pb-24', xl: 'pb-32', xxl: 'pb-42' },
    sm: { none: 'sm:pb-0', xs: 'sm:pb-4', sm: 'sm:pb-12', md: 'sm:pb-16', lg: 'sm:pb-24', xl: 'sm:pb-32', xxl: 'sm:pb-42' },
    md: { none: 'md:pb-0', xs: 'md:pb-4', sm: 'md:pb-12', md: 'md:pb-16', lg: 'md:pb-24', xl: 'md:pb-32', xxl: 'md:pb-42' },
    lg: { none: 'lg:pb-0', xs: 'lg:pb-4', sm: 'lg:pb-12', md: 'lg:pb-16', lg: 'lg:pb-24', xl: 'lg:pb-32', xxl: 'lg:pb-42' },
    xl: { none: 'xl:pb-0', xs: 'xl:pb-4', sm: 'xl:pb-12', md: 'xl:pb-16', lg: 'xl:pb-24', xl: 'xl:pb-32', xxl: 'xl:pb-42' },
    '2xl': { none: '2xl:pb-0', xs: '2xl:pb-4', sm: '2xl:pb-12', md: '2xl:pb-16', lg: '2xl:pb-24', xl: '2xl:pb-32', xxl: '2xl:pb-42' }
  },
  pl: {
    base: { none: 'pl-0', xs: 'pl-4', sm: 'pl-12', md: 'pl-16', lg: 'pl-24', xl: 'pl-32', xxl: 'pl-42' },
    sm: { none: 'sm:pl-0', xs: 'sm:pl-4', sm: 'sm:pl-12', md: 'sm:pl-16', lg: 'sm:pl-24', xl: 'sm:pl-32', xxl: 'sm:pl-42' },
    md: { none: 'md:pl-0', xs: 'md:pl-4', sm: 'md:pl-12', md: 'md:pl-16', lg: 'md:pl-24', xl: 'md:pl-32', xxl: 'md:pl-42' },
    lg: { none: 'lg:pl-0', xs: 'lg:pl-4', sm: 'lg:pl-12', md: 'lg:pl-16', lg: 'lg:pl-24', xl: 'lg:pl-32', xxl: 'lg:pl-42' },
    xl: { none: 'xl:pl-0', xs: 'xl:pl-4', sm: 'xl:pl-12', md: 'xl:pl-16', lg: 'xl:pl-24', xl: 'xl:pl-32', xxl: 'xl:pl-42' },
    '2xl': { none: '2xl:pl-0', xs: '2xl:pl-4', sm: '2xl:pl-12', md: '2xl:pl-16', lg: '2xl:pl-24', xl: '2xl:pl-32', xxl: '2xl:pl-42' }
  },
  pr: {
    base: { none: 'pr-0', xs: 'pr-4', sm: 'pr-12', md: 'pr-16', lg: 'pr-24', xl: 'pr-32', xxl: 'pr-42' },
    sm: { none: 'sm:pr-0', xs: 'sm:pr-4', sm: 'sm:pr-12', md: 'sm:pr-16', lg: 'sm:pr-24', xl: 'sm:pr-32', xxl: 'sm:pr-42' },
    md: { none: 'md:pr-0', xs: 'md:pr-4', sm: 'md:pr-12', md: 'md:pr-16', lg: 'md:pr-24', xl: 'md:pr-32', xxl: 'md:pr-42' },
    lg: { none: 'lg:pr-0', xs: 'lg:pr-4', sm: 'lg:pr-12', md: 'lg:pr-16', lg: 'lg:pr-24', xl: 'lg:pr-32', xxl: 'lg:pr-42' },
    xl: { none: 'xl:pr-0', xs: 'xl:pr-4', sm: 'xl:pr-12', md: 'xl:pr-16', lg: 'xl:pr-24', xl: 'xl:pr-32', xxl: 'xl:pr-42' },
    '2xl': { none: '2xl:pr-0', xs: '2xl:pr-4', sm: '2xl:pr-12', md: '2xl:pr-16', lg: '2xl:pr-24', xl: '2xl:pr-32', xxl: '2xl:pr-42' }
  },
  mt: {
    base: { none: 'mt-0', xs: 'mt-4', sm: 'mt-12', md: 'mt-16', lg: 'mt-24', xl: 'mt-32', xxl: 'mt-42' },
    sm: { none: 'sm:mt-0', xs: 'sm:mt-4', sm: 'sm:mt-12', md: 'sm:mt-16', lg: 'sm:mt-24', xl: 'sm:mt-32', xxl: 'sm:mt-42' },
    md: { none: 'md:mt-0', xs: 'md:mt-4', sm: 'md:mt-12', md: 'md:mt-16', lg: 'md:mt-24', xl: 'md:mt-32', xxl: 'md:mt-42' },
    lg: { none: 'lg:mt-0', xs: 'lg:mt-4', sm: 'lg:mt-12', md: 'lg:mt-16', lg: 'lg:mt-24', xl: 'lg:mt-32', xxl: 'lg:mt-42' },
    xl: { none: 'xl:mt-0', xs: 'xl:mt-4', sm: 'xl:mt-12', md: 'xl:mt-16', lg: 'xl:mt-24', xl: 'xl:mt-32', xxl: 'xl:mt-42' },
    '2xl': { none: '2xl:mt-0', xs: '2xl:mt-4', sm: '2xl:mt-12', md: '2xl:mt-16', lg: '2xl:mt-24', xl: '2xl:mt-32', xxl: '2xl:mt-42' }
  },
  mb: {
    base: { none: 'mb-0', xs: 'mb-4', sm: 'mb-12', md: 'mb-16', lg: 'mb-24', xl: 'mb-32', xxl: 'mb-42' },
    sm: { none: 'sm:mb-0', xs: 'sm:mb-4', sm: 'sm:mb-12', md: 'sm:mb-16', lg: 'sm:mb-24', xl: 'sm:mb-32', xxl: 'sm:mb-42' },
    md: { none: 'md:mb-0', xs: 'md:mb-4', sm: 'md:mb-12', md: 'md:mb-16', lg: 'md:mb-24', xl: 'md:mb-32', xxl: 'md:mb-42' },
    lg: { none: 'lg:mb-0', xs: 'lg:mb-4', sm: 'lg:mb-12', md: 'lg:mb-16', lg: 'lg:mb-24', xl: 'lg:mb-32', xxl: 'lg:mb-42' },
    xl: { none: 'xl:mb-0', xs: 'xl:mb-4', sm: 'xl:mb-12', md: 'xl:mb-16', lg: 'xl:mb-24', xl: 'xl:mb-32', xxl: 'xl:mb-42' },
    '2xl': { none: '2xl:mb-0', xs: '2xl:mb-4', sm: '2xl:mb-12', md: '2xl:mb-16', lg: '2xl:mb-24', xl: '2xl:mb-32', xxl: '2xl:mb-42' }
  }
}

const getResponsiveClasses = (
  propValue: Responsive<SpacingSize> | undefined,
  spacingDict: Record<string, Record<SpacingSize, string>>
): string => {
  if (!propValue) { return '' }

  if (typeof propValue === 'string') {
    return spacingDict.base[propValue]
  }

  const classes: string[] = []
  if (propValue.base) classes.push(spacingDict.base[propValue.base])
  if (propValue.sm) classes.push(spacingDict.sm[propValue.sm])
  if (propValue.md) classes.push(spacingDict.md[propValue.md])
  if (propValue.lg) classes.push(spacingDict.lg[propValue.lg])
  if (propValue.xl) classes.push(spacingDict.xl[propValue.xl])
  if (propValue['2xl']) classes.push(spacingDict['2xl'][propValue['2xl']])

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

  const classes: string[] = ['w-full']

  // 2. Hilfsfunktion, um Statusänderungen sicher anzuwenden
  const applyState = (bp: 'base' | Breakpoint, isOn: boolean, isStateChange: boolean) => {
    if (bp === 'base') {
      if (isOn) classes.push('mx-auto', 'px-4')
      else classes.push('mx-0', 'px-0', 'max-w-full')
    } else if (bp === 'sm') {
      if (isStateChange) {
        // sm:max-w-none neutralisiert ein potenzielles max-w-full von base=false
        if (isOn) classes.push('sm:mx-auto', 'sm:px-6', 'sm:max-w-none')
        else classes.push('sm:mx-0', 'sm:px-0', 'sm:max-w-full')
      } else if (isOn) {
        classes.push('sm:px-6')
      }
    } else if (bp === 'md') {
      if (isStateChange) {
        // HIER BEHOBEN: Keine harte max-w-3xl mehr! Er verhält sich jetzt exakt wie in
        // deinem Original-Design (flüssig mit Padding).
        if (isOn) classes.push('md:mx-auto', 'md:px-6', 'md:max-w-none')
        else classes.push('md:mx-0', 'md:px-0', 'md:max-w-full')
      } else if (isOn) {
        classes.push('md:px-6') // Falls sich das Padding ändert, stellen wir es sicher
      }
    } else if (bp === 'lg') {
      if (isStateChange) {
        if (isOn) classes.push('lg:mx-auto', 'lg:px-0', 'lg:max-w-4xl')
        else classes.push('lg:mx-0', 'lg:px-0', 'lg:max-w-full')
      } else if (isOn) {
        classes.push('lg:px-0', 'lg:max-w-4xl')
      }
    } else if (bp === 'xl') {
      if (isStateChange) {
        if (isOn) classes.push('xl:mx-auto', 'xl:px-0', 'xl:max-w-5xl')
        else classes.push('xl:mx-0', 'xl:px-0', 'xl:max-w-full')
      } else if (isOn) {
        classes.push('xl:max-w-5xl')
      }
    } else if (bp === '2xl') {
      if (isStateChange) {
        if (isOn) classes.push('2xl:mx-auto', '2xl:px-0', '2xl:max-w-6xl')
        else classes.push('2xl:mx-0', '2xl:px-0', '2xl:max-w-full')
      } else if (isOn) {
        classes.push('2xl:max-w-6xl')
      }
    }
  }

  // 3. Wende die Logik für jeden Breakpoint an
  applyState('base', state.base, true)
  applyState('sm', state.sm, state.sm !== state.base)
  applyState('md', state.md, state.md !== state.sm)
  applyState('lg', state.lg, state.lg !== state.md)
  applyState('xl', state.xl, state.xl !== state.lg)
  applyState('2xl', state['2xl'], state['2xl'] !== state.xl)

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
