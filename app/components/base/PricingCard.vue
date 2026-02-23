<script setup lang="ts">
import Button from '~/components/base/Button.vue'

// Define the type for the plan object passed as a prop.
// This structure is derived from the 'mapToPlan' function in the membership page.
interface Plan {
  title: string
  description: string
  price: string
  discount?: string
  billingCycle: string
  features: string[]
  badge?: {
    label: string
    variant: string
    color: string
  }
  class: string
  button: {
    label: string
    icon: string
    variant: string
    block: boolean
    size: 'md'
  }
}

defineProps<{
  plan: Plan
}>()

const emit = defineEmits(['button-click'])
</script>

<template>
  <div :class="plan.class">
    <div class="flex justify-between items-start mb-2">
      <h4 class="text-lg font-bold text-gray-900 dark:text-white">
        {{ plan.title }}
      </h4>
      <UBadge
        v-if="plan.badge"
        :color="plan.badge.color"
        :variant="plan.badge.variant"
        size="xs"
      >
        {{ plan.badge.label }}
      </UBadge>
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">
      {{ plan.description }}
    </p>

    <ul class="space-y-2 mb-8 flex-1">
      <li
        v-for="feature in plan.features"
        :key="feature"
        class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
      >
        <UIcon name="i-heroicons-check" class="w-5 h-5 text-green-500 shrink-0" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <div class="pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div class="flex items-baseline gap-1 mb-4">
        <div v-if="plan.discount" class="text-sm text-gray-400 line-through mr-2">
          {{ plan.price }}
        </div>
        <span class="text-2xl font-bold text-brand-dark-900 dark:text-white">{{ plan.discount || plan.price }}</span>
        <span class="text-xs text-gray-500">{{ plan.billingCycle }}</span>
      </div>
      <Button v-bind="plan.button" @click="emit('button-click')" />
    </div>
  </div>
</template>
