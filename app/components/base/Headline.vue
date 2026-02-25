<script setup lang="ts">
/**
 * TYPE DEFINITIONS
 */
type HeadlineSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type Align = 'left' | 'center' | 'right' | 'none'
type Mode = 'dark' | 'light'
type SpacingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

// Varianten für Tagline (Dachzeile)
type TaglineVariant = 'default' | 'brand' | 'accent' | 'highlight'

// Varianten für Description
type DescriptionVariant = 'default' | 'brand'

interface Props {
  // --- INHALT ---
  tagline?: string
  title?: string
  description?: string

  // --- SEMANTIK ---
  taglineTag?: string
  tag?: string
  descriptionTag?: string

  // --- OPTIK ---
  size?: HeadlineSize
  alignment?: Align // Umbenannt von align zu alignment
  mode?: Mode

  // --- VARIANTEN ---
  taglineVariant?: TaglineVariant
  descriptionVariant?: DescriptionVariant

  // --- SPACING ---
  marginTop?: SpacingSize
  marginBottom?: SpacingSize

  // --- OVERRIDES ---
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

  taglineVariant: 'default',
  descriptionVariant: 'default',

  marginTop: undefined,
  marginBottom: undefined,

  taglineClass: undefined,
  titleClass: undefined,
  descriptionClass: undefined,
  wrapperClass: undefined
})

// --- GRÖSSEN ---
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'h1': return 'text-4xl sm:text-5xl lg:text-6xl'
    case 'h2': return 'text-3xl md:text-4xl'
    case 'h3': return 'text-2xl sm:text-3xl'
    case 'h4': return 'text-xl sm:text-2xl'
    case 'h5': return 'text-lg sm:text-xl'
    case 'h6': return 'text-base font-bold uppercase tracking-wide'
    default: return 'text-3xl md:text-4xl'
  }
})

// --- ALIGNMENT ---
const alignClasses = computed(() => {
  switch (props.alignment) { // Umbenannt
    case 'center': return 'text-center items-center mx-auto'
    case 'right': return 'text-right items-end ml-auto'
    case 'none': return ''
    default: return 'text-left items-start'
  }
})

// --- SPACING ---
const mtMap: Record<SpacingSize, string> = {
  none: 'mt-0', sm: 'mt-6', md: 'mt-8', lg: 'mt-12', xl: 'mt-16'
}
const mbMap: Record<SpacingSize, string> = {
  none: 'mb-0', sm: 'mb-6', md: 'mb-8', lg: 'mb-12', xl: 'mb-16'
}

const spacingClasses = computed(() => {
  const classes = []
  if (props.marginTop) classes.push(mtMap[props.marginTop])
  if (props.marginBottom) {
    classes.push(mbMap[props.marginBottom])
  } else {
    classes.push('mb-8 md:mb-12')
  }
  return classes.join(' ')
})

// --- FARBEN / VARIANTEN ---
const colors = computed(() => {
  let taglineColor = ''
  const defaultTagline = props.mode === 'light' ? 'text-gray-400' : 'text-gray-500'

  switch (props.taglineVariant) {
    case 'brand': taglineColor = 'text-brand-light-600'; break;
    case 'accent': taglineColor = 'text-accent-600'; break;
    case 'highlight': taglineColor = 'text-highlight-400'; break;
    default: taglineColor = defaultTagline;
  }

  const titleColor = props.mode === 'light'
    ? 'text-white'
    : 'text-brand-dark-900 dark:text-white'

  let descColor = ''
  const defaultDesc = props.mode === 'light' ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'

  switch (props.descriptionVariant) {
    case 'brand': descColor = 'text-brand-dark-600 dark:text-brand-dark-300'; break;
    default: descColor = defaultDesc;
  }

  return {
    tagline: props.taglineClass || taglineColor,
    title: props.titleClass || titleColor,
    desc: props.descriptionClass || descColor
  }
})
</script>

<template>
  <div
    class="flex flex-col gap-4 max-w-3xl"
    :class="[alignClasses, spacingClasses, wrapperClass]"
  >
    <component
      :is="taglineTag"
      v-if="tagline || $slots.tagline"
      class="font-bold uppercase tracking-widest text-sm block"
      :class="colors.tagline"
    >
      <slot name="tagline">
        {{ tagline }}
      </slot>
    </component>

    <component
      :is="tag"
      v-if="title || $slots.title"
      class="font-heading font-bold leading-tight"
      :class="[sizeClasses, colors.title]"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <component
      :is="descriptionTag"
      v-if="description || $slots.description"
      class="text-lg leading-relaxed"
      :class="colors.desc"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </component>

    <slot />
  </div>
</template>
