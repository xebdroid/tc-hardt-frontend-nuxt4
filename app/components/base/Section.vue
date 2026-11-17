<script setup lang="ts">
import { NuxtImg } from '#components'
import { computed } from 'vue'
import type { SpacingSize, RoundedSide, Responsive, Breakpoint } from '~/types'

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

  overlapTop?: boolean
  overlapBottom?: boolean

  useContainer?: Responsive<boolean>
  outerContainer?: Responsive<boolean>

  backgroundImage?: string
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
  if (!props.backgroundImage) return {}
  if (props.parallax) {
    return {
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }
  }
  return {}
})

const getResponsiveClasses = (
  prefix: string,
  propValue: Responsive<SpacingSize> | undefined
): string[] => {
  if (!propValue) return []
  if (typeof propValue === 'string') {
    return [`${prefix}-base-${propValue}`]
  }
  const classes: string[] = []
  if (propValue.base) classes.push(`${prefix}-base-${propValue.base}`)
  if (propValue.sm) classes.push(`${prefix}-sm-${propValue.sm}`)
  if (propValue.md) classes.push(`${prefix}-md-${propValue.md}`)
  if (propValue.lg) classes.push(`${prefix}-lg-${propValue.lg}`)
  if (propValue.xl) classes.push(`${prefix}-xl-${propValue.xl}`)
  if (propValue['2xl']) classes.push(`${prefix}-2xl-${propValue['2xl']}`)
  return classes
}

const spacingClasses = computed(() => [
  ...getResponsiveClasses('pt', props.paddingTop),
  ...getResponsiveClasses('pb', props.paddingBottom),
  ...getResponsiveClasses('pl', props.paddingLeft),
  ...getResponsiveClasses('pr', props.paddingRight),
  ...getResponsiveClasses('mt', props.marginTop),
  ...getResponsiveClasses('mb', props.marginBottom)
])

const layoutClasses = computed(() => {
  const classes: string[] = []
  if (props.overlapTop) classes.push('overlap-top')
  if (props.overlapBottom) classes.push('overlap-bottom')

  const rounded = props.rounded === true ? 'both' : props.rounded
  if (rounded === 'both') classes.push('rounded-both')
  else if (rounded === 'top') classes.push('rounded-top')
  else if (rounded === 'bottom') classes.push('rounded-bottom')

  return classes
})

const getContainerClasses = (value: Responsive<boolean> | undefined, defaultValue: boolean): string[] => {
  const isContainer = value ?? defaultValue
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

  return [
    state.base ? 'cnt-base-on' : 'cnt-base-off',
    state.sm ? 'cnt-sm-on' : 'cnt-sm-off',
    state.md ? 'cnt-md-on' : 'cnt-md-off',
    state.lg ? 'cnt-lg-on' : 'cnt-lg-off',
    state.xl ? 'cnt-xl-on' : 'cnt-xl-off',
    state['2xl'] ? 'cnt-2xl-on' : 'cnt-2xl-off'
  ]
}

const outerContainerClasses = computed(() => getContainerClasses(props.outerContainer, false))
const innerContainerClasses = computed(() => getContainerClasses(props.useContainer, true))
</script>

<template>
  <div class="section-outer" :class="outerContainerClasses">
    <section
      class="base-section"
      :class="[
        `variant-${variant}`,
        ...spacingClasses,
        ...layoutClasses
      ]"
      :style="backgroundStyles"
    >
      <div
        v-if="backgroundImage && !parallax"
        class="bg-layer"
      >
        <NuxtImg
          :src="backgroundImage"
          alt=""
          class="bg-img"
          sizes="sm:100vw md:100vw lg:1400px"
          loading="lazy"
        />
      </div>

      <div v-if="$slots.background" class="bg-layer">
        <slot name="background" />
      </div>

      <div class="section-inner" :class="innerContainerClasses">
        <slot />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$spacings: (
  "none": 0rem,
  "xs": 1rem,      /* 4 */
  "sm": 3rem,      /* 12 */
  "md": 4rem,      /* 16 */
  "lg": 6rem,      /* 24 */
  "xl": 8rem,      /* 32 */
  "xxl": 10.5rem   /* 42 */
);

@mixin spacing-rules($bp-name) {
  @each $size-name, $val in $spacings {
    &.pt-#{$bp-name}-#{$size-name} { padding-top: $val; }
    &.pb-#{$bp-name}-#{$size-name} { padding-bottom: $val; }
    &.pl-#{$bp-name}-#{$size-name} { padding-left: $val; }
    &.pr-#{$bp-name}-#{$size-name} { padding-right: $val; }
    &.mt-#{$bp-name}-#{$size-name} { margin-top: $val; }
    &.mb-#{$bp-name}-#{$size-name} { margin-bottom: $val; }
  }
}

.section-outer,
.section-inner {
  width: 100%;

  &.cnt-base-on {
    margin-inline: auto;
    padding-inline: var(--space-4);
  }
  &.cnt-base-off {
    margin-inline: 0;
    padding-inline: 0;
    max-width: 100%;
  }

  @include up("sm") {
    &.cnt-sm-on {
      margin-inline: auto;
      padding-inline: var(--space-6);
      max-width: none;
    }
    &.cnt-sm-off {
      margin-inline: 0;
      padding-inline: 0;
      max-width: 100%;
    }
  }

  @include up("md") {
    &.cnt-md-on {
      margin-inline: auto;
      padding-inline: var(--space-6);
      max-width: none;
    }
    &.cnt-md-off {
      margin-inline: 0;
      padding-inline: 0;
      max-width: 100%;
    }
  }

  @include up("lg") {
    &.cnt-lg-on {
      margin-inline: auto;
      padding-inline: 0;
      max-width: 56rem; /* 4xl */
    }
    &.cnt-lg-off {
      margin-inline: 0;
      padding-inline: 0;
      max-width: 100%;
    }
  }

  @include up("xl") {
    &.cnt-xl-on {
      margin-inline: auto;
      padding-inline: 0;
      max-width: 64rem; /* 5xl */
    }
    &.cnt-xl-off {
      margin-inline: 0;
      padding-inline: 0;
      max-width: 100%;
    }
  }

  @include up("2xl") {
    &.cnt-2xl-on {
      margin-inline: auto;
      padding-inline: 0;
      max-width: 72rem; /* 6xl */
    }
    &.cnt-2xl-off {
      margin-inline: 0;
      padding-inline: 0;
      max-width: 100%;
    }
  }
}

.section-inner {
  position: relative;
  z-index: 10;
  height: 100%;
}

.base-section {
  width: 100%;
  position: relative;
  transition: background-color 300ms ease, color 300ms ease;

  /* Variants */
  &.variant-default {
    background-color: var(--color-white);
    color: var(--color-gray-900);

    @include dark {
      background-color: var(--color-gray-950);
      color: var(--color-white);
    }
  }

  &.variant-gray {
    background-color: var(--color-gray-200);
    color: var(--color-gray-900);

    @include dark {
      background-color: var(--color-gray-800);
      color: var(--color-white);
    }
  }

  &.variant-gray-light {
    background-color: var(--color-gray-50);
    color: var(--color-gray-900);
    border-top: 1px solid var(--color-gray-100);

    @include dark {
      background-color: var(--color-gray-900);
      color: var(--color-white);
      border-top-color: var(--color-gray-800);
    }
  }

  &.variant-primary {
    background-color: var(--color-brand-dark-900);
    color: var(--color-white);
  }

  &.variant-primary-light {
    background-color: var(--color-brand-dark-50);
    color: var(--color-brand-dark-900);

    @include dark {
      background-color: rgb(26 40 82 / 0.5);
      color: var(--color-white);
    }
  }

  &.variant-secondary {
    background-color: var(--color-brand-light-300);
    color: var(--color-white);
  }

  &.variant-secondary-light {
    background-color: var(--color-brand-light-50);
    color: var(--color-brand-dark-900);

    @include dark {
      background-color: rgb(3 15 20 / 0.3);
      color: var(--color-brand-light-50);
    }
  }

  &.variant-highlight {
    background-color: var(--color-highlight-400);
    color: var(--color-brand-dark-900);
  }

  &.variant-highlight-light {
    background-color: var(--color-highlight-50);
    color: var(--color-brand-dark-900);

    @include dark {
      background-color: rgb(54 83 20 / 0.1);
      color: var(--color-white);
    }
  }

  &.variant-accent {
    background-color: var(--color-accent-500);
    color: var(--color-white);
  }

  &.variant-accent-light {
    background-color: var(--color-accent-50);
    color: var(--color-brand-dark-900);

    @include dark {
      background-color: rgb(64 32 6 / 0.1);
      color: var(--color-white);
    }
  }

  /* Overlap & Rounded */
  &.overlap-top {
    margin-top: -4rem;
  }

  &.overlap-bottom {
    margin-bottom: -4rem;
  }

  &.rounded-both {
    border-radius: var(--radius-2xl);
  }

  &.rounded-top {
    border-top-left-radius: var(--radius-2xl);
    border-top-right-radius: var(--radius-2xl);
  }

  &.rounded-bottom {
    border-bottom-left-radius: var(--radius-2xl);
    border-bottom-right-radius: var(--radius-2xl);
  }

  /* Spacings per breakpoint */
  @include spacing-rules("base");

  @include up("sm") {
    @include spacing-rules("sm");
  }
  @include up("md") {
    @include spacing-rules("md");
  }
  @include up("lg") {
    @include spacing-rules("lg");
  }
  @include up("xl") {
    @include spacing-rules("xl");
  }
  @include up("2xl") {
    @include spacing-rules("2xl");
  }
}

.bg-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
