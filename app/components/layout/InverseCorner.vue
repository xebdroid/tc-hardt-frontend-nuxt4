<script setup lang="ts">
withDefaults(defineProps<{
  angle?: number
  // Standardmäßig deine "Inhalt-Farbe". Kann aber überschrieben werden.
  colorClass?: string
}>(), {
  angle: 0,
  colorClass: 'text-white dark:text-gray-900'
})
</script>

<template>
  <svg
    class="absolute w-[26px] h-[26px] z-50 pointer-events-none block transition-colors duration-300"
    :class="colorClass"
    :style="{ transform: `rotate(${angle}deg)` }"
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <mask :id="`corner-mask-${angle}`">
      <rect
        width="26"
        height="26"
        fill="white"
      />
      <path d="M 0 0 C 0 14.359 11.641 26 26 26 L 26 0 Z" fill="black" />
    </mask>

    <rect
      width="26"
      height="26"
      fill="currentColor"
      :mask="`url(#corner-mask-${angle})`"
    />
  </svg>
</template>
