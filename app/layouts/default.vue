<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import InverseCorner from '~/components/layout/InverseCorner.vue'
</script>

<template>
  <div class="default-layout">
    <div class="frame-bar is-top">
      <div class="frame-strip" />
      <InverseCorner class="frame-corner is-top-left" :angle="-90" />
      <InverseCorner class="frame-corner is-top-right" :angle="0" />
    </div>

    <div class="frame-bar is-bottom">
      <div class="frame-strip" />
      <InverseCorner class="frame-corner is-bottom-left" :angle="180" />
      <InverseCorner class="frame-corner is-bottom-right" :angle="90" />
    </div>

    <div class="layout-body">
      <Header />

      <main class="u-main">
        <NuxtPage />
      </main>

      <Footer />
    </div>

    <DevBreakpointHelper />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-white);

  @include up("lg") {
    padding: var(--space-4);
  }

  @include dark {
    background-color: var(--color-gray-900);
  }
}

.frame-bar {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  pointer-events: none;

  @include up("lg") {
    display: block;
  }

  &.is-top {
    top: 0;
  }

  &.is-bottom {
    bottom: 0;
  }
}

.frame-strip {
  height: 1rem;
  width: 100%;
  background-color: var(--color-white);
  position: absolute;
  left: 0;

  .is-top & {
    top: 0;
  }

  .is-bottom & {
    bottom: 0;
  }

  @include dark {
    background-color: var(--color-gray-900);
  }
}

.frame-corner {
  position: fixed;
  pointer-events: auto;

  &.is-top-left {
    top: 1rem;
    left: 1rem;
  }

  &.is-top-right {
    top: 1rem;
    right: 1rem;
  }

  &.is-bottom-left {
    bottom: 1rem;
    left: 1rem;
  }

  &.is-bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
}

.layout-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);

  @include dark {
    background-color: var(--color-gray-900);
  }
}
</style>
