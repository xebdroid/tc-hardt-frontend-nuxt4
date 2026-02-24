<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Define the type for the plan object passed as a prop.
interface Plan {
  title: string
  description: string
  price: string
  discountedPrice?: string
  discountText?: string
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
    <div class="p-4 md:p-6">
      <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {{ plan.title }}
      </h4>
      <p class="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
        {{ plan.description }}
      </p>
    </div>

    <!-- Price -->
    <div class="px-4 md:px-6 pb-4 md:pb-6 border-b border-gray-100 dark:border-gray-800">
      <!-- With discount -->
      <div v-if="plan.discountedPrice">
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-brand-dark-900 dark:text-white">{{ plan.discountedPrice }}</span>
          <span class="text-sm font-semibold text-green-600 dark:text-green-400">{{ plan.discountText }}</span>
        </div>
        <div class="flex items-baseline gap-2 mt-1">
            <span class="text-lg text-gray-500">{{ t('pricing.afterwards') }} {{ plan.price }} {{ plan.billingCycle }}</span>
        </div>
      </div>
      <!-- No discount / or price breakdown -->
      <div v-else>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold text-brand-dark-900 dark:text-white">{{ plan.price }}</span>
          <span class="text-sm text-gray-500">{{ plan.billingCycle }}</span>
        </div>
      </div>
    </div>


    <!-- Body -->
    <div class="p-4 md:p-6 flex-1 flex flex-col">
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
    <div class="p-4 md:p-6 mt-auto">
      <Button v-bind="plan.button" @click="emit('button-click')" />
    </div>
  </div>
</template>
