<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
}

defineProps<Props>()
</script>

<template>
  <Icon
    :name="name"
    :size="size"
    class="base-icon"
  />
</template>

<style lang="scss" scoped>
.base-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
