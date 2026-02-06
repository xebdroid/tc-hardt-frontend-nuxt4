<script setup lang="ts">
/**
 * FeatureCard - Eine vielseitige Karte für Features oder Benefits.
 * Kann als Link oder reine Infobox verwendet werden.
 */

interface Props {
  title: string
  description: string
  icon: string
  // Optionale Link-URL. Wenn gesetzt, wird die Karte ein NuxtLink.
  to?: string
  // Icon-Farben (Tailwind-Klassen)
  iconColor?: string
  iconBg?: string
  // Rahmenfarbe bei Hover/Aktiv (Tailwind-Klasse)
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  iconColor: 'text-brand-light-600',
  iconBg: 'bg-brand-light-50 dark:bg-brand-light-900/50',
  borderColor: 'border-highlight-400'
})

// Dynamische Bestimmung der Komponente (Link vs. Div)
const isLink = computed(() => !!props.to)
const componentType = computed(() => isLink.value ? defineNuxtLink({}) : 'div')

// Gemeinsame Klassen für beide Zustände
const baseClasses = `
  flex flex-col items-center text-center p-8 rounded-2xl
  bg-white dark:bg-gray-800 shadow-md border-t-4 transition-all duration-300 group
`

const interactionClasses = isLink.value
  ? `hover:shadow-xl hover:-translate-y-1 ${props.borderColor} cursor-pointer`
  : `border-transparent shadow-sm`
</script>

<template>
  <component
    :is="isLink ? 'NuxtLink' : 'div'"
    :to="to"
    :class="[baseClasses, interactionClasses]"
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
