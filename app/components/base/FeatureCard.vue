<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
  title: string
  description: string
  icon: string
  to?: string
  iconColor?: string
  iconBg?: string
  showHighlightBorder?: boolean
  borderColorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  iconColor: 'text-brand-light-600',
  iconBg: 'bg-brand-light-50 dark:bg-brand-light-900/50',
  showHighlightBorder: true,
  borderColorClass: 'border-t-highlight-500'
})

const isLink = computed(() => !!props.to)

const baseClasses = `
  flex flex-col items-center text-center p-8 rounded-2xl
  bg-white dark:bg-gray-800 shadow-md transition-all duration-300 group
  border border-gray-100 dark:border-gray-700
`

const dynamicClasses = computed(() => {
  let classes = ''

  if (props.showHighlightBorder) {
    classes += ` border-t-4 ${props.borderColorClass}`
  }

  if (isLink.value) {
    classes += ' hover:shadow-xl hover:-translate-y-1 cursor-pointer'
  } else {
    classes += ' shadow-sm'
  }

  return classes
})
</script>

<template>
  <component
    :is="isLink ? NuxtLink : 'div'"
    :to="to"
    :class="[baseClasses, dynamicClasses]"
  >
    <div
      class="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
      :class="iconBg"
    >
      <UIcon
        :name="icon"
        class="w-8 h-8"
        :class="iconColor"
      />
    </div>

    <h3 class="font-heading font-bold text-xl text-brand-dark-900 dark:text-white mb-3 group-hover:text-highlight-600 transition-colors">
      {{ title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
      {{ description }}
    </p>
  </component>
</template>
