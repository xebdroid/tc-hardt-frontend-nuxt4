<script setup lang="ts">
interface Props {
  open?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
  disabled: false
})
</script>

<template>
  <div
    class="base-collapsible"
    :data-state="open && !disabled ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
  >
    <slot />

    <div
      v-if="!disabled"
      class="content-grid"
      :class="{ 'is-open': open }"
    >
      <div class="content-inner">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease-out;

  &.is-open {
    grid-template-rows: 1fr;
  }
}

.content-inner {
  overflow: hidden;
}
</style>
