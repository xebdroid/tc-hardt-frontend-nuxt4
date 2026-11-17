<script setup lang="ts">
import Button, { type ButtonSize, type ButtonVariant } from '~/components/base/Button.vue'

interface Props {
  size?: ButtonSize
  variant?: ButtonVariant
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'ghost'
})

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <Button
      :variant="variant"
      :size="size"
      :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
      :aria-label="isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'"
      @click="toggleColorMode"
    />
  </ClientOnly>
</template>
