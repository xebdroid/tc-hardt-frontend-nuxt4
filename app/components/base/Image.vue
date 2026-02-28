<script setup lang="ts">
import { NuxtImg } from '#components'

interface Props {
  src?: string | null;
  alt?: string;
  variant?: 'feature' | 'portrait' | 'round' | 'event' | 'news';
  size?: 'small' | 'large';
  objectPosition?: string;
  sizes?: string;
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: '',
  variant: 'feature',
  size: 'large',
  objectPosition: 'object-top',
  sizes: 'sm:100vw md:50vw lg:800px',
});

// classes for the wrapper div
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'event':
      return 'w-16 h-16 rounded-lg overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-none';
    case 'round':
      switch (props.size) {
        case 'small':
          return 'w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 flex items-center justify-center';
        case 'large':
        default:
          return 'w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center';
      }
    case 'portrait':
      return 'w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden border-[12px] border-white shadow-sm shrink-0';
    case 'news':
      return 'relative w-full h-48 md:w-[150px] md:h-[150px] flex-none rounded-lg overflow-hidden';
    case 'feature':
    default:
      return 'relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 aspect-[4/3]';
  }
});

const imageClasses = computed(() => {
    const classes = ['w-full', 'h-full', 'object-cover', props.objectPosition];
    // hover effect only for feature variant
    if(props.variant === 'feature') {
        classes.push('transform hover:scale-105 transition-transform duration-700');
    }
    return classes;
})
</script>

<template>
  <div :class="variantClasses">
    <template v-if="src">
      <NuxtImg
        :src="src"
        :alt="alt"
        :class="imageClasses"
        :sizes="sizes"
        loading="lazy"
      />
      <slot name="overlay" />
    </template>
    <slot v-else />
  </div>
</template>
