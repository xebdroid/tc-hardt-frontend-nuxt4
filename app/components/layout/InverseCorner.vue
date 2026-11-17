<script setup lang="ts">
const props = withDefaults(defineProps<{
  angle?: number
  colorClass?: string
  size?: number
}>(), {
  angle: 0,
  colorClass: undefined,
  size: 26
})

const positionMap: Record<number, string> = {
  0: 'bottom left',
  90: 'top left',
  180: 'top right',
  270: 'bottom right',
  '-90': 'bottom right'
}

const maskStyle = computed(() => {
  const position = positionMap[props.angle] || 'bottom left'
  const radius = props.size
  const style = `radial-gradient(circle ${radius}px at ${position}, transparent 98%, black 100%)`
  return {
    '-webkit-mask': style,
    'mask': style
  }
})

const bgColorClass = computed(() => {
  return props.colorClass ? props.colorClass.replace('text-', 'bg-') : 'default-bg'
})
</script>

<template>
  <div
    class="inverse-corner"
    :class="bgColorClass"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      ...maskStyle,
      '-webkit-mask-composite': 'destination-out',
      'mask-composite': 'exclude'
    }"
    aria-hidden="true"
  />
</template>

<style lang="scss" scoped>
.inverse-corner {
  pointer-events: none;

  &.default-bg {
    background-color: var(--color-white);

    @include dark {
      background-color: var(--color-gray-900);
    }
  }
}
</style>
