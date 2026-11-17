<script setup lang="ts">
import { computed } from 'vue'

type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Align = 'left' | 'center' | 'right' | 'none'
type Mode = 'dark' | 'light'
type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TaglineVariant = 'default' | 'brand' | 'accent' | 'highlight'
type DescriptionVariant = 'default' | 'brand'

interface Props {
  tagline?: string
  title?: string
  description?: string

  taglineTag?: string
  tag?: string
  descriptionTag?: string

  size?: HeadlineSize
  alignment?: Align
  mode?: Mode
  hyphens?: boolean

  taglineVariant?: TaglineVariant
  descriptionVariant?: DescriptionVariant

  marginTop?: SpacingSize
  marginBottom?: SpacingSize

  wrapperClass?: string
  taglineClass?: string
  titleClass?: string
  descriptionClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  taglineTag: 'span',
  tag: 'h2',
  descriptionTag: 'p',

  size: 'h2',
  alignment: 'left',
  mode: 'dark',
  hyphens: false,

  taglineVariant: 'default',
  descriptionVariant: 'default',

  marginTop: undefined,
  marginBottom: undefined,

  taglineClass: undefined,
  titleClass: undefined,
  descriptionClass: undefined,
  wrapperClass: undefined
})

const mbClass = computed(() => {
  return props.marginBottom ? `mb-${props.marginBottom}` : 'mb-default'
})

const mtClass = computed(() => {
  return props.marginTop ? `mt-${props.marginTop}` : ''
})
</script>

<template>
  <div
    class="base-headline"
    :class="[
      `align-${alignment}`,
      `mode-${mode}`,
      mtClass,
      mbClass,
      wrapperClass
    ]"
  >
    <component
      :is="taglineTag"
      v-if="tagline || $slots.tagline"
      class="tagline"
      :class="taglineClass || `tagline-${taglineVariant}`"
    >
      <slot name="tagline">
        {{ tagline }}
      </slot>
    </component>

    <component
      :is="tag"
      v-if="title || $slots.title"
      class="title"
      :class="[
        `size-${size}`,
        titleClass || 'title-default',
        { 'break-word-hyphens': hyphens }
      ]"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <component
      :is="descriptionTag"
      v-if="description || $slots.description"
      class="description"
      :class="descriptionClass || `desc-${descriptionVariant}`"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </component>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-headline {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 48rem; /* max-w-3xl */

  /* Alignment */
  &.align-left {
    text-align: left;
    align-items: flex-start;
  }

  &.align-center {
    text-align: center;
    align-items: center;
    margin-inline: auto;
  }

  &.align-right {
    text-align: right;
    align-items: flex-end;
    margin-left: auto;
  }

  /* Margins Top */
  &.mt-none { margin-top: 0; }
  &.mt-xs { margin-top: var(--space-3); }
  &.mt-sm { margin-top: var(--space-6); }
  &.mt-md { margin-top: var(--space-8); }
  &.mt-lg { margin-top: var(--space-12); }
  &.mt-xl { margin-top: var(--space-16); }

  /* Margins Bottom */
  &.mb-default {
    margin-bottom: var(--space-8);

    @include up("md") {
      margin-bottom: var(--space-12);
    }
  }
  &.mb-none { margin-bottom: 0; }
  &.mb-xs { margin-bottom: var(--space-3); }
  &.mb-sm { margin-bottom: var(--space-6); }
  &.mb-md { margin-bottom: var(--space-8); }
  &.mb-lg { margin-bottom: var(--space-12); }
  &.mb-xl { margin-bottom: var(--space-16); }
}

.tagline {
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &.tagline-default {
    color: var(--color-gray-500);

    .mode-light & {
      color: var(--color-gray-400);
    }
  }

  &.tagline-brand {
    color: var(--color-brand-light-600);
  }

  &.tagline-accent {
    color: var(--color-accent-600);
  }

  &.tagline-highlight {
    color: var(--color-highlight-400);
  }
}

.title {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.25;
  margin: 0;

  &.title-default {
    color: var(--color-brand-dark-900);

    @include dark {
      color: var(--color-white);
    }

    .mode-light & {
      color: var(--color-white);
    }
  }

  /* Sizes */
  &.size-h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;

    @include up("sm") {
      font-size: 3rem;
      line-height: 1;
    }

    @include up("lg") {
      font-size: 3.75rem;
      line-height: 1;
    }
  }

  &.size-h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;

    @include up("md") {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  &.size-h3 {
    font-size: 1.5rem;
    line-height: 2rem;

    @include up("sm") {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }

  &.size-h4 {
    font-size: 1.25rem;
    line-height: 1.75rem;

    @include up("sm") {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  &.size-h5 {
    font-size: 1.125rem;
    line-height: 1.75rem;

    @include up("sm") {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }

  &.size-h6 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }
}

.description {
  font-size: 1.125rem;
  line-height: 1.625;
  margin: 0;

  &.desc-default {
    color: var(--color-gray-600);

    @include dark {
      color: var(--color-gray-400);
    }

    .mode-light & {
      color: var(--color-gray-200);
    }
  }

  &.desc-brand {
    color: var(--color-brand-dark-600);

    @include dark {
      color: var(--color-brand-dark-300);
    }
  }
}
</style>
