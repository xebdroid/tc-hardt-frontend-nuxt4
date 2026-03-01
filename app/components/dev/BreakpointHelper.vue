<template>
  <div
    v-if="isDev"
    class="fixed bottom-4 right-4 z-[9999] rounded-full bg-gray-800 px-3 py-1 text-xs font-bold text-white shadow-lg"
  >
    <span class="sm:hidden">base</span>
    <span class="hidden sm:inline md:hidden">sm</span>
    <span class="hidden md:inline lg:hidden">md</span>
    <span class="hidden lg:inline xl:hidden">lg</span>
    <span class="hidden xl:inline 2xl:hidden">xl</span>
    <span class="hidden 2xl:inline">2xl</span>
  </div>
</template>

<script setup lang="ts">
const isDev = import.meta.dev
</script>
