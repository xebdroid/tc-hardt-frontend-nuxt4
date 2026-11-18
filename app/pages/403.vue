<script setup lang="ts">
import ErrorScreen from '~/components/sections/ErrorScreen.vue';
</script>

<template>
  <ErrorScreen :status-code="403" />
</template>
