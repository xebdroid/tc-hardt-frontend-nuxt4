<script setup lang="ts">
import BaseIcon from '~/components/base/Icon.vue'

export interface SponsorPackageItem {
  name: string
  size: string
  icon: string
  description: string
}

interface Props {
  item: SponsorPackageItem
}

defineProps<Props>()
</script>

<template>
  <div class="sponsor-package-card">
    <div class="icon-box">
      <BaseIcon :name="item.icon" class="icon" />
    </div>
    <h3 class="title">{{ item.name }}</h3>
    <p class="desc">{{ item.description }}</p>
    <div class="footer">
      <div class="meta">
        <span class="meta-label">Format</span>
        <p class="meta-value">{{ item.size }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sponsor-package-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-8);
  background-color: var(--color-pure-white);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-gray-100);
  box-shadow: var(--shadow-sm);
  transition: all 300ms ease;

  @include dark {
    background-color: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-0.25rem);

    .icon-box {
      transform: scale(1.1);
    }

    .title {
      color: var(--color-brand-light-600);
    }
  }
}

.icon-box {
  width: 4rem;
  height: 4rem;
  margin-inline: auto;
  margin-bottom: var(--space-6);
  background-color: var(--color-brand-light-50);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-light-600);
  transition: transform 300ms ease;

  @include dark {
    background-color: rgb(9 44 60 / 0.3);
    color: var(--color-brand-light-400);
  }
}

.icon {
  width: 2rem;
  height: 2rem;
}

.title {
  margin: 0 0 var(--space-3);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--color-brand-dark-900);
  text-align: center;
  transition: color var(--transition-fast);

  @include dark {
    color: var(--color-white);
  }
}

.desc {
  margin: 0 0 var(--space-8);
  color: var(--color-gray-600);
  font-size: 1rem;
  flex-grow: 1;
  line-height: 1.625;
  text-align: center;

  @include dark {
    color: var(--color-gray-300);
  }
}

.footer {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-gray-100);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @include dark {
    border-top-color: var(--color-gray-700);
  }
}

.meta {
  width: 100%;
}

.meta-label {
  display: block;
  margin-bottom: var(--space-1);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: var(--color-brand-light-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);

  @include dark {
    color: var(--color-gray-100);
  }
}
</style>
