<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import type { ButtonVariant } from '~/components/base/Button.vue'

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
  <div :class="plan.class" class="pricing-card">
    <div class="top-bar" />
    <div class="top-section">
      <!-- Header -->
      <div class="header">
        <h4 class="title">
          {{ plan.title }}
        </h4>
        <p class="subtitle">
          {{ plan.description }}
        </p>
      </div>

      <!-- Price -->
      <div class="price-box">
        <div v-if="plan.discountedPrice">
          <div class="discount-main">
            <span class="price-val">{{ plan.discountedPrice }}</span>
            <span class="discount-badge">{{ plan.discountText }}</span>
          </div>
          <div class="discount-sub">
            <span class="cycle-after">danach {{ plan.price }} {{ plan.billingCycle }}</span>
          </div>
        </div>
        <div v-else>
          <div class="regular-main">
            <span class="price-val">{{ plan.price }}</span>
            <span class="cycle">{{ plan.billingCycle }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="body">
      <div v-if="plan.priceBreakdown" class="breakdown">
        <h5 class="breakdown-title">
          Beiträge im Detail
        </h5>
        <div class="breakdown-list">
          <div
            v-for="item in plan.priceBreakdown"
            :key="item.label"
            class="breakdown-row"
          >
            <span class="breakdown-label">{{ item.label }}</span>
            <span class="breakdown-price">{{ item.price }}</span>
          </div>
        </div>
      </div>

      <ul class="features">
        <li
          v-for="feature in plan.features"
          :key="feature"
          class="feature-item"
        >
          <BaseIcon name="i-heroicons-check-circle" class="feature-icon" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="feature" />
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="footer">
      <Button
        v-bind="plan.button"
        variant="brand-dark"
        @click="emit('button-click')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pricing-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-pure-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: box-shadow 300ms ease;

  @include dark {
    background-color: rgb(15 23 48 / 0.7);
    border-color: var(--color-brand-dark-800);
  }

  &:hover {
    box-shadow: var(--shadow-2xl);
  }
}

.top-bar {
  height: 0.5rem;
  width: 100%;
  background-color: var(--color-brand-light-400);
  transition: background-color 300ms ease;

  .pricing-card:hover & {
    background-color: var(--color-highlight-500);
  }
}

.top-section {
  @include up("lg") {
    min-height: 210px;
  }
}

.header {
  padding: var(--space-4);

  @include up("lg") {
    padding: var(--space-8);
  }
}

.title {
  margin: 0 0 var(--space-2);
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-gray-900);

  @include up("lg") {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  @include dark {
    color: var(--color-white);
  }
}

.subtitle {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
  color: var(--color-gray-500);
  min-height: 38px;

  @include up("lg") {
    font-size: 1rem;
    line-height: 1.5rem;
    min-height: 40px;
  }

  @include dark {
    color: var(--color-gray-400);
  }
}

.price-box {
  padding: 0 var(--space-4) var(--space-4);

  @include up("lg") {
    padding: 0 var(--space-8) var(--space-8);
  }
}

.discount-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.regular-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-2);
}

.price-val {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include up("lg") {
    font-size: 3rem;
    line-height: 1;
  }

  @include dark {
    color: var(--color-white);
  }
}

.discount-badge {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--color-success-600);

  @include up("lg") {
    font-size: 1.125rem;
  }
}

.discount-sub {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-2);
  margin-top: 0.25rem;
}

.cycle-after {
  font-size: 1rem;
  color: var(--color-gray-500);

  @include up("lg") {
    font-size: 1.125rem;
  }
}

.cycle {
  font-size: 0.875rem;
  color: var(--color-gray-500);

  @include up("lg") {
    font-size: 1rem;
  }
}

.body {
  padding: var(--space-4);
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-50);

  @include up("lg") {
    padding: var(--space-8);
  }

  @include dark {
    background-color: var(--color-brand-dark-950);
  }
}

.breakdown {
  margin-bottom: var(--space-6);
}

.breakdown-title {
  margin: 0 0 var(--space-3);
  font-size: 0.75rem;
  color: var(--color-gray-500);

  @include up("lg") {
    font-size: 1rem;
  }

  @include dark {
    color: var(--color-gray-400);
  }
}

.breakdown-list {
  border-top: 1px solid var(--color-gray-200);
  border-bottom: 1px solid var(--color-gray-200);

  @include dark {
    border-color: var(--color-gray-800);
  }
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: var(--space-2);

  & + & {
    border-top: 1px solid var(--color-gray-200);

    @include dark {
      border-top-color: var(--color-gray-800);
    }
  }
}

.breakdown-label {
  font-size: 0.875rem;
  color: var(--color-gray-600);

  @include up("lg") {
    font-size: 1rem;
  }

  @include dark {
    color: var(--color-gray-300);
  }
}

.breakdown-price {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-gray-900);

  @include up("lg") {
    font-size: 1rem;
  }

  @include dark {
    color: var(--color-white);
  }
}

.features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--color-gray-600);

  @include up("lg") {
    font-size: 1rem;
  }

  @include dark {
    color: var(--color-gray-300);
  }
}

.feature-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-highlight-500);
  flex-shrink: 0;

  @include up("lg") {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.footer {
  padding: var(--space-4);
  margin-top: auto;
  background-color: var(--color-gray-50);

  @include up("lg") {
    padding: var(--space-6);
  }

  @include dark {
    background-color: var(--color-brand-dark-950);
  }
}
</style>
