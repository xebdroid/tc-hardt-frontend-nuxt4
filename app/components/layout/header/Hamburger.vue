<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <button
    class="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none text-gray-900 dark:text-white"
    aria-label="Menu öffnen"
    @click="$emit('toggle')"
  >
    <span class="relative w-6 h-5 block" aria-hidden="true">
      <span
        class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out"
        :class="isOpen ? 'top-2 rotate-45' : 'top-0'"
      />
      <span
        class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out top-2"
        :class="isOpen ? 'opacity-0' : 'opacity-100'"
      />
      <span
        class="absolute left-0 block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out"
        :class="isOpen ? 'top-2 -rotate-45' : 'top-4'"
      />
    </span>
  </button>
</template>
