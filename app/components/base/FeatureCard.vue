<script setup lang="ts">
import { NuxtLink } from '#components'
import BaseIcon from '~/components/base/Icon.vue'

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
  iconColor: undefined,
  iconBg: undefined,
  showHighlightBorder: true,
  borderColorClass: undefined
})

const isLink = computed(() => Boolean(props.to))
</script>

<template>
  <component
    :is="isLink ? NuxtLink : 'div'"
    :to="to"
    class="feature-card"
    :class="[
      {
        'is-link': isLink,
        'has-highlight-border': showHighlightBorder,
        'default-border': showHighlightBorder && !borderColorClass
      },
      showHighlightBorder && borderColorClass ? borderColorClass : ''
    ]"
  >
    <div
      class="icon-badge"
      :class="iconBg || 'default-icon-bg'"
    >
      <BaseIcon
        :name="icon"
        class="icon"
        :class="iconColor || 'default-icon-color'"
      />
    </div>

    <h3 class="title">
      {{ title }}
    </h3>
    <p class="desc">
      {{ description }}
    </p>
  </component>
</template>

<style lang="scss" scoped>
.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  background-color: var(--color-pure-white);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-100);
  text-decoration: none;
  transition:
    box-shadow 300ms ease,
    transform 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &.has-highlight-border {
    border-top-width: 4px;
  }

  &.default-border {
    border-top-color: var(--color-highlight-500);
  }

  &.is-link {
    box-shadow: var(--shadow-md);
    cursor: pointer;

    &:hover {
      box-shadow: var(--shadow-xl);
      transform: translateY(-0.25rem);
    }
  }
}

.icon-badge {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  transition: transform 300ms ease;

  &.default-icon-bg {
    background-color: var(--color-brand-light-50);

    @include dark {
      background-color: rgb(9 44 60 / 0.5);
    }
  }

  &.bg-orange { background-color: #fff7ed; @include dark { background-color: rgb(124 45 18 / 0.1); } }
  &.bg-blue   { background-color: #eff6ff; @include dark { background-color: rgb(30 58 138 / 0.1); } }
  &.bg-green  { background-color: #f0fdf4; @include dark { background-color: rgb(20 83 45 / 0.1); } }
  &.bg-teal   { background-color: #f0fdfa; @include dark { background-color: rgb(19 78 74 / 0.1); } }

  .feature-card:hover & {
    transform: scale(1.1);
  }
}

.icon {
  width: 2rem;
  height: 2rem;

  &.default-icon-color {
    color: var(--color-brand-light-600);
  }

  &.color-orange { color: #f97316; }
  &.color-blue   { color: #3b82f6; }
  &.color-green  { color: #22c55e; }
  &.color-teal   { color: #14b8a6; }
}

.title {
  margin: 0 0 var(--space-3);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--color-brand-dark-900);
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }

  .feature-card:hover & {
    color: var(--color-highlight-600);
  }
}

.desc {
  margin: 0;
  color: var(--color-gray-600);
  line-height: 1.625;

  @include dark {
    color: var(--color-gray-400);
  }
}
</style>
