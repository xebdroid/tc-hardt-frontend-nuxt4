<script setup lang="ts">
defineProps<{
  date: string
  title?: string
}>()
</script>

<template>
  <div class="article-info-box">
    <h3 class="title">Artikel-Info</h3>
    <div class="info-list">
      <div class="info-row">
        <span class="label">Datum:</span>
        <span class="value">{{ date }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-info-box {
  background-color: var(--color-pure-white);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-100);

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.title {
  margin: 0 0 var(--space-4);
  padding-bottom: var(--space-2);
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  border-bottom: 1px solid var(--color-gray-200);

  @include dark {
    color: var(--color-white);
    border-bottom-color: var(--color-gray-700);
  }
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.label {
  color: var(--color-gray-500);

  @include dark {
    color: var(--color-gray-400);
  }
}

.value {
  font-weight: 500;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-white);
  }
}
</style>
