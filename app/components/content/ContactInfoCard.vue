<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

interface Props {
  icon: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="contact-info-card">
    <div class="icon-box">
      <BaseIcon :name="icon" class="icon" />
    </div>
    <h3 class="title">{{ title }}</h3>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-info-card {
  background-color: var(--color-pure-white);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: box-shadow var(--transition-fast);

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

.icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background-color: var(--color-brand-dark-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-dark-900);
  margin-bottom: var(--space-4);

  @include dark {
    background-color: var(--color-brand-dark-800);
    color: var(--color-white);
  }
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.title {
  margin: 0 0 var(--space-2);
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);

  @include dark {
    color: var(--color-white);
  }
}

.body {
  color: var(--color-gray-600);

  @include dark {
    color: var(--color-gray-300);
  }

  :deep(address) {
    font-style: normal;
  }

  :deep(p) {
    margin: 0 0 var(--space-4);
  }

  :deep(a) {
    color: var(--color-accent-600);
    font-weight: 700;
    text-decoration: none;

    @include dark {
      color: var(--color-accent-400);
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
