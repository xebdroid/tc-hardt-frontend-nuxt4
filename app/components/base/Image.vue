<script setup lang="ts">
interface Props {
  src: string;
  alt?: string;
  variant?: 'feature' | 'portrait';
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  variant: 'feature',
});

// classes for the wrapper div
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'portrait':
      return 'w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden border-[12px] border-white shadow-sm shrink-0';
    case 'feature':
    default:
      return 'relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 aspect-[4/3]';
  }
});

const imageClasses = computed(() => {
    const classes = ['w-full', 'h-full', 'object-cover'];
    // hover effect only for feature variant
    if(props.variant === 'feature') {
        classes.push('transform hover:scale-105 transition-transform duration-700');
    }
    return classes;
})
</script>

<template>
  <div :class="variantClasses">
    <img
      :src="src"
      :alt="alt"
      :class="imageClasses"
    >
  </div>
</template>
