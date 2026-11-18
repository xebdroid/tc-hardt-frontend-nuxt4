<script setup lang="ts">
import { NuxtImg } from '#components'
import { computed } from 'vue'
import type { SpacingSize, SectionSpacing, RoundedSide, Responsive } from '~/types'

export type SectionVariant =
  | 'default'
  | 'gray'          | 'gray-light'
  | 'primary'       | 'primary-light'
  | 'secondary'     | 'secondary-light'
  | 'highlight'     | 'highlight-light'
  | 'accent'        | 'accent-light'

interface Props {
  variant?: SectionVariant
  spacing?: SectionSpacing
  card?: boolean

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
  spacing: 'normal',
  card: false,
  rounded: false,
  marginTop: undefined,
  marginBottom: undefined,
  paddingTop: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  overlapTop: false,
  overlapBottom: false,
  useContainer: true,
  outerContainer: false,
  backgroundImage: undefined,
  parallax: false
})

const isCard = computed(() => {
  if (props.card) return true
  // Wenn outerContainer und rounded übergeben wurden, ist es semantisch ein Card-Block
  return Boolean(props.outerContainer) && Boolean(props.rounded)
})

const effectiveSpacing = computed<SectionSpacing>(() => {
  if (props.paddingTop || props.paddingBottom) return 'none'
  if (props.spacing !== 'normal') return props.spacing
  if (isCard.value) return 'compact'
  return 'normal'
})

const getSimpleSpacingClass = (prefix: string, value: Responsive<SpacingSize> | undefined): string | null => {
  if (!value) return null
  if (typeof value === 'string') return `${prefix}-${value}`
  if (value.md) return `${prefix}-${value.md}`
  if (value.sm) return `${prefix}-${value.sm}`
  if (value.base) return `${prefix}-${value.base}`
  return null
}

const spacingClasses = computed(() => {
  const classes: string[] = []
  if (effectiveSpacing.value !== 'none') {
    classes.push(`spacing-${effectiveSpacing.value}`)
  }
  const pt = getSimpleSpacingClass('pt', props.paddingTop)
  if (pt) classes.push(pt)
  const pb = getSimpleSpacingClass('pb', props.paddingBottom)
  if (pb) classes.push(pb)
  const mt = getSimpleSpacingClass('mt', props.marginTop)
  if (mt) classes.push(mt)
  const mb = getSimpleSpacingClass('mb', props.marginBottom)
  if (mb) classes.push(mb)
  return classes
})

const layoutClasses = computed(() => {
  const classes: string[] = []
  if (props.overlapTop) classes.push('overlap-top')
  if (props.overlapBottom) classes.push('overlap-bottom')

  if (isCard.value) {
    classes.push('is-card')
  } else {
    const rounded = props.rounded === true ? 'both' : props.rounded
    if (rounded === 'both') classes.push('rounded-both')
    else if (rounded === 'top') classes.push('rounded-top')
    else if (rounded === 'bottom') classes.push('rounded-bottom')
  }

  return classes
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
</script>

<template>
  <div
    class="section-outer"
    :class="{ 'has-container': isCard || Boolean(outerContainer) }"
  >
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

      <div
        class="section-inner"
        :class="{ 'has-container': Boolean(useContainer) && !isCard && !Boolean(outerContainer) }"
      >
        <slot />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section-outer,
.section-inner {
  width: 100%;

  &.has-container {
    @include container;
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

  /* Spacing Presets */
  &.spacing-none {
    padding-block: 0;
  }

  &.spacing-compact {
    padding-block: var(--space-6);
    padding-inline: var(--space-4);

    @include up("sm") {
      padding-inline: var(--space-6);
    }

    @include up("md") {
      padding-block: var(--space-10);
      padding-inline: var(--space-8);
    }
  }

  &.spacing-normal {
    padding-block: var(--space-10);

    @include up("md") {
      padding-block: var(--space-16);
    }
  }

  &.spacing-spacious {
    padding-block: var(--space-16);

    @include up("md") {
      padding-block: var(--space-24);
    }
  }

  /* Card / Island Preset */
  &.is-card {
    border-radius: var(--radius-2xl);
    margin-block: var(--space-4) var(--space-12);
    overflow: hidden;
  }

  /* Specific Spacing Overrides (optional) */
  &.pt-none { padding-top: 0; }
  &.pt-xs   { padding-top: var(--space-4); }
  &.pt-sm   { padding-top: var(--space-8); }
  &.pt-md   { padding-top: var(--space-12); }
  &.pt-lg   { padding-top: var(--space-16); }
  &.pt-xl   { padding-top: var(--space-24); }

  &.pb-none { padding-bottom: 0; }
  &.pb-xs   { padding-bottom: var(--space-4); }
  &.pb-sm   { padding-bottom: var(--space-8); }
  &.pb-md   { padding-bottom: var(--space-12); }
  &.pb-lg   { padding-bottom: var(--space-16); }
  &.pb-xl   { padding-bottom: var(--space-24); }

  &.mt-none { margin-top: 0; }
  &.mt-sm   { margin-top: var(--space-4); }
  &.mt-md   { margin-top: var(--space-8); }
  &.mt-lg   { margin-top: var(--space-12); }
  &.mt-xl   { margin-top: var(--space-16); }

  &.mb-none { margin-bottom: 0; }
  &.mb-sm   { margin-bottom: var(--space-4); }
  &.mb-md   { margin-bottom: var(--space-8); }
  &.mb-lg   { margin-bottom: var(--space-12); }
  &.mb-xl   { margin-bottom: var(--space-16); }

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
