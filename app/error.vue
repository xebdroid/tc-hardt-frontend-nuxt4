<script setup lang="ts">
import type { NuxtError } from '#app'
import Error from '~/components/base/BaseError.vue'

const props = defineProps({
  error: Object as () => NuxtError
})

// Fehler optional in der Konsole loggen
if (import.meta.client) {
  console.error('Ein Fehler ist aufgetreten:', props.error)
}
</script>

<template>
  <Error :status-code="error?.statusCode || 404" />
</template>
