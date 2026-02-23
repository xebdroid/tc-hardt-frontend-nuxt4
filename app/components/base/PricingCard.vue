<script setup lang="ts">
import Button from '~/components/base/Button.vue'

// Define the type for the plan object passed as a prop.
interface Plan {
  title: string
  description: string
  price: string
  discount?: string
  billingCycle: string
  features: string[]
  priceBreakdown?: {
    label: string
    price: string
  }[]
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
  <div :class="plan.class" class="relative">
    <!-- Header -->
    <div class="p-6">
      <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {{ plan.title }}
      </h4>
      <p class="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
        {{ plan.description }}
      </p>

      <UBadge
        v-if="plan.badge"
        :color="plan.badge.color"
        :variant="plan.badge.variant"
        size="md"
        class="absolute top-0 right-0 -mt-3 mr-3 font-bold"
      >
        {{ plan.badge.label }}
      </UBadge>
    </div>

    <!-- Price -->
    <div class="px-6 pb-6 border-b border-gray-100 dark:border-gray-800">
      <div v-if="!plan.priceBreakdown" class="flex items-baseline gap-1">
        <div v-if="plan.discount" class="text-lg text-gray-400 line-through mr-2">
          {{ plan.price }}
        </div>
        <span class="text-3xl font-bold text-brand-dark-900 dark:text-white">{{ plan.discount || plan.price }}</span>
        <span class="text-sm text-gray-500">{{ plan.billingCycle }}</span>
      </div>
       <div v-else class="flex items-baseline gap-1">
        <span class="text-3xl font-bold text-brand-dark-900 dark:text-white">{{ plan.price }}</span>
        <span class="text-sm text-gray-500">{{ plan.billingCycle }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Price Breakdown -->
      <div v-if="plan.priceBreakdown" class="space-y-3 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <div
          v-for="item in plan.priceBreakdown"
          :key="item.label"
          class="flex justify-between items-center"
        >
          <span class="text-sm text-gray-600 dark:text-gray-300">{{ item.label }}</span>
          <span class="text-sm font-bold text-gray-900 dark:text-white">{{ item.price }}</span>
        </div>
      </div>

      <!-- Features -->
      <ul class="space-y-3 flex-1">
        <li
          v-for="feature in plan.features"
          :key="feature"
          class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
        >
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="feature" />
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="p-6 mt-auto">
      <Button v-bind="plan.button" @click="emit('button-click')" />
    </div>
  </div>
</template>
