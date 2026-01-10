<script setup lang="ts">
defineProps<{
  to: string
  label: string
  target?: string
  block?: boolean
}>()
</script>

<template>
  <UButton
    :to="to"
    :label="label"
    :target="target"
    :block="block"
    variant="solid"
    :size="block ? 'xl' : 'md'"
    class="font-bold transition-colors bg-primary-500 text-slate-900 dark:bg-highlight-500 dark:hover:bg-highlight-400 dark:hover:bg-highlight-400"
  />
</template>
