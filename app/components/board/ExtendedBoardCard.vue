<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import BaseIcon from '~/components/base/Icon.vue'
import Image from '~/components/base/Image.vue'
import type { BoardMember } from '~/components/board/BoardMemberRow.vue'

interface Props {
  member: BoardMember
}

defineProps<Props>()
</script>

<template>
  <div class="extended-board-card">
    <div class="avatar-wrap">
      <Image
        :src="member.image"
        :alt="member.name"
        variant="round"
        size="small"
      >
        <BaseIcon
          name="i-heroicons-user-circle"
          class="avatar-placeholder"
        />
      </Image>
    </div>
    <div class="body">
      <h3 class="name">
        {{ member.name }}
      </h3>
      <p class="role">
        {{ member.role }}
      </p>
    </div>
    <div class="actions">
      <Button
        v-if="member.email"
        :to="`mailto:${member.email}`"
        variant="outline"
        icon="i-heroicons-envelope"
        class="action-btn"
      >
        E-Mail
      </Button>
      <Button
        v-if="member.phone"
        :to="`tel:${member.phone}`"
        variant="outline"
        icon="i-heroicons-phone"
        class="action-btn"
      >
        Anrufen
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.extended-board-card {
  background-color: var(--color-pure-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
  text-align: center;
  display: flex;
  flex-direction: column;
}

.avatar-wrap {
  margin-inline: auto;
  margin-bottom: var(--space-4);
}

.avatar-placeholder {
  width: 4rem;
  height: 4rem;
  color: var(--color-gray-300);
}

.body {
  flex-grow: 1;
}

.name {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: var(--color-gray-800);
}

.role {
  margin: 0;
  color: var(--color-brand-light-700);
  font-weight: 500;
}

.actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.action-btn {
  flex: 1 1 0%;
  justify-content: center;
}
</style>
