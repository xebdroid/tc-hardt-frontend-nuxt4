<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath('/')"
    class="flex items-center gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-10"
    @click="$emit('click')"
  >
    <img
      src="/tc-hardt-logo-desktop.svg"
      alt="TC Hardt"
      class="hidden lg:block h-[110px] w-auto transition-all duration-300 -mt-4 relative z-10"
    >

    <div class="lg:hidden flex items-center gap-3">
      <img
        src="/tc-hardt-logo.svg"
        alt="TC Hardt"
        class="h-10 w-auto"
      >
      <div class="flex flex-col leading-tight">
        <span class="font-euro-extended font-bold text-xl text-slate-900 dark:text-white">
          TC Hardt
        </span>
        <span class="font-euro-bold text-xs text-slate-900 dark:text-white">
          1976 e.V.
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
