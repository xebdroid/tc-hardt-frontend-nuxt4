<script setup lang="ts">
import Button from '~/components/base/Button.vue'

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
  <Button
    :to="to"
    :label="label"
    :target="target"
    :block="block"
    variant="primary"
    :size="block ? 'xl' : 'md'"
    @click="trackClick"
  />
</template>
