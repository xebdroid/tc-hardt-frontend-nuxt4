<script setup lang="ts">
const props = withDefaults(defineProps<{
  angle?: number
  // Standardmäßig deine "Inhalt-Farbe". Kann aber überschrieben werden.
  colorClass?: string
  size?: number
}>(), {
  angle: 0,
  colorClass: 'text-white dark:text-gray-900',
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

// Quick and dirty way to convert text-color to bg-color
const bgColorClass = computed(() => {
  return props.colorClass.replace('text-', 'bg-')
})
</script>

<template>
  <div
    class="pointer-events-none"
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
