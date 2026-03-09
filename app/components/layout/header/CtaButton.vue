<script setup lang="ts">
const props = defineProps<{
  to: string
  label: string
  target?: string
  block?: boolean
}>()

function trackClick() {
  if (import.meta.client && (window as any)._paq) {
    (window as any)._paq.push(['trackEvent', 'Navigation', 'Klick CTA Header', props.label])
  }
}
</script>

<template>
  <UButton
    :to="to"
    :label="label"
    :target="target"
    :block="block"
    variant="solid"
    :size="block ? 'xl' : 'md'"
    class="transition-colors bg-brand-dark-800 hover:bg-brand-dark-700 dark:bg-highlight-500 dark:hover:bg-highlight-400 dark:hover:bg-highlight-400 dark:text-brand-dark-950"
    @click="trackClick"
  />
</template>
