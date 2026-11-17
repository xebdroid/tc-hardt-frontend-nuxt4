<script setup lang="ts">
const isDev = import.meta.dev
</script>

<template>
  <div v-if="isDev" class="breakpoint-helper">
    <span class="bp is-base">base</span>
    <span class="bp is-sm">sm</span>
    <span class="bp is-md">md</span>
    <span class="bp is-lg">lg</span>
    <span class="bp is-xl">xl</span>
    <span class="bp is-2xl">2xl</span>
  </div>
</template>

<style lang="scss" scoped>
.breakpoint-helper {
  position: fixed;
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: 9999;
  border-radius: var(--radius-full);
  background-color: var(--color-gray-800);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-white);
  box-shadow: var(--shadow-lg);
}

.bp {
  display: none;
}

.is-base {
  display: inline;
  @include up("sm") { display: none; }
}

.is-sm {
  @include up("sm") { display: inline; }
  @include up("md") { display: none; }
}

.is-md {
  @include up("md") { display: inline; }
  @include up("lg") { display: none; }
}

.is-lg {
  @include up("lg") { display: inline; }
  @include up("xl") { display: none; }
}

.is-xl {
  @include up("xl") { display: inline; }
  @include up("2xl") { display: none; }
}

.is-2xl {
  @include up("2xl") { display: inline; }
}
</style>
