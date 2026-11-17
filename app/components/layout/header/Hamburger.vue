<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="header-hamburger"
    :class="{ 'is-open': isOpen }"
    aria-label="Menu öffnen"
    @click="$emit('toggle')"
  >
    <span class="bars" aria-hidden="true">
      <span class="bar is-top" />
      <span class="bar is-middle" />
      <span class="bar is-bottom" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.header-hamburger {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-gray-900);
  cursor: pointer;

  @include dark {
    color: var(--color-white);
  }

  &:focus {
    outline: none;
  }

  @include up("lg") {
    display: none;
  }
}

.bars {
  position: relative;
  width: 1.5rem;
  height: 1.25rem;
  display: block;
}

.bar {
  position: absolute;
  left: 0;
  display: block;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  border-radius: var(--radius-full);
  transition: all 300ms ease-in-out;

  &.is-top {
    top: 0;
  }

  &.is-middle {
    top: 0.5rem;
    opacity: 1;
  }

  &.is-bottom {
    top: 1rem;
  }

  .header-hamburger.is-open & {
    &.is-top {
      top: 0.5rem;
      transform: rotate(45deg);
    }

    &.is-middle {
      opacity: 0;
    }

    &.is-bottom {
      top: 0.5rem;
      transform: rotate(-45deg);
    }
  }
}
</style>
