<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <NuxtLink
    :to="$localePath('/')"
    class="header-logo"
    @click="$emit('click')"
  >
    <img
      src="/tc-hardt-logo-desktop.svg"
      alt="TC Hardt"
      class="desktop-img"
    >

    <div class="mobile-brand">
      <img
        src="/tc-hardt-logo.svg"
        alt="TC Hardt"
        class="mobile-img"
      >
      <div class="mobile-text">
        <span class="club-name">
          TC Hardt
        </span>
        <span class="club-suffix">
          1976 e.V.
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.header-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  z-index: 10;
  text-decoration: none;

  @include up("lg") {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.desktop-img {
  display: none;
  height: 110px;
  width: auto;
  margin-top: -1rem;
  position: relative;
  z-index: 10;
  transition: all 300ms ease;

  @include up("lg") {
    display: block;
  }
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  @include up("lg") {
    display: none;
  }
}

.mobile-img {
  height: 2.5rem;
  width: auto;
}

.mobile-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.club-name {
  font-family: var(--font-euro-extended);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}

.club-suffix {
  font-family: var(--font-euro-bold);
  font-size: 0.75rem;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}
</style>
