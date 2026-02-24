<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import type { ButtonVariant } from '~/components/base/Button.vue'

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
  class?: string
  button: {
    label: string
    icon?: string
    variant: ButtonVariant
    block?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

defineProps<{
  plan: Plan
}>()

const emit = defineEmits(['button-click'])
</script>

<template>
  <div :class="plan.class" class="group bg-white dark:bg-brand-dark-950/70 border border-gray-200 dark:border-brand-dark-800 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl flex flex-col h-full overflow-hidden">
    <div class="h-2 w-full bg-brand-light-400 group-hover:bg-highlight-500 transition-colors duration-300" />
    <div class="lg:min-h-[210px]">
      <!-- Header -->
      <div class="p-4 lg:p-8">
        <h4 class="text-xl text-center lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ plan.title }}
        </h4>
        <p class="text-sm lg:text-base text-center text-gray-500 dark:text-gray-400 min-h-[38px] lg:min-h-[40px]">
          {{ plan.description }}
        </p>
      </div>

      <!-- Price -->
      <div class="px-4 lg:px-8 pb-4 lg:pb-8">
        <!-- With discount -->
        <div v-if="plan.discountedPrice">
          <div class="flex items-baseline gap-2 justify-center flex-col items-center">
            <span class="text-4xl lg:text-5xl font-bold text-brand-dark-900 dark:text-white">{{ plan.discountedPrice }}</span>
            <span class="text-base lg:text-lg font-semibold text-green-600 dark:text-green-400">{{ plan.discountText }}</span>
          </div>
          <div class="flex items-baseline gap-2 mt-1 justify-center">
            <span class="text-base lg:text-lg text-gray-500">danach {{ plan.price }} {{ plan.billingCycle }}</span>
          </div>
        </div>
        <!-- No discount / or price breakdown -->
        <div v-else>
          <div class="flex items-baseline gap-2 justify-center">
            <span class="text-4xl lg:text-5xl font-bold text-brand-dark-900 dark:text-white">{{ plan.price }}</span>
            <span class="text-sm lg:text-base text-gray-500">{{ plan.billingCycle }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-4 lg:p-8 flex-1 flex flex-col bg-gray-50 dark:bg-brand-dark-950">
      <!-- Price Breakdown -->
      <div v-if="plan.priceBreakdown" class="mb-6">
        <h5 class="text-xs lg:text-base text-gray-500 dark:text-gray-400 mb-3">
          Beiträge im Detail
        </h5>
        <div class="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
          <div
            v-for="item in plan.priceBreakdown"
            :key="item.label"
            class="flex justify-between items-center py-2"
          >
            <span class="text-sm lg:text-base text-gray-600 dark:text-gray-300">{{ item.label }}</span>
            <span class="text-sm lg:text-base font-bold text-gray-900 dark:text-white">{{ item.price }}</span>
          </div>
        </div>
      </div>

      <!-- Features -->
      <ul class="space-y-3 flex-1">
        <li
          v-for="feature in plan.features"
          :key="feature"
          class="flex items-start gap-3 text-sm lg:text-base text-gray-600 dark:text-gray-300"
        >
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 lg:w-6 lg:h-6 text-highlight-500 shrink-0" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="feature" />
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="p-4 lg:p-6 mt-auto bg-gray-50 dark:bg-brand-dark-950">
      <Button
        v-bind="plan.button"
        variant="brand-dark"
        @click="emit('button-click')"
      />
    </div>
  </div>
</template>
