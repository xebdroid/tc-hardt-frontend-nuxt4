<script setup lang="ts">
import type { NuxtError } from '#app'
import ErrorScreen from '~/components/base/ErrorScreen.vue'

const props = defineProps({
  error: Object as () => NuxtError
})

// Fehler optional in der Konsole loggen
if (import.meta.client) {
  console.error('Ein Fehler ist aufgetreten:', props.error)
}
</script>

<template>
  <ErrorScreen :status-code="error?.statusCode || 404" />
</template>
