<script setup lang="ts">
import Button from '~/components/base/Button.vue'
import Badge from '~/components/base/Badge.vue'
import BaseIcon from '~/components/base/Icon.vue'
import Image from '~/components/base/Image.vue'

export interface BoardMember {
  name: string
  role: string
  area?: string
  email?: string
  phone?: string
  image?: string
}

interface Props {
  member: BoardMember
  reverse?: boolean
}

withDefaults(defineProps<Props>(), {
  reverse: false
})
</script>

<template>
  <div class="board-member-row">
    <div
      v-if="reverse"
      class="member-spacer"
    />

    <div
      class="member-info"
      :class="reverse ? 'is-right' : 'is-left'"
    >
      <h3 class="member-name">
        {{ member.name }}
      </h3>
      <Badge
        variant="subtle"
        color="primary"
        size="lg"
        class="member-badge"
      >
        {{ member.role }}
      </Badge>
      <div
        v-if="member.area"
        class="member-area"
      >
        <span class="area-label">Zuständig für:</span>
        {{ member.area }}
      </div>
      <div
        class="member-actions"
        :class="reverse ? 'is-left' : 'is-right'"
      >
        <Button
          v-if="member.email"
          :to="`mailto:${member.email}`"
          variant="outline"
          icon="i-heroicons-envelope"
          size="lg"
        >
          E-Mail
        </Button>
        <Button
          v-if="member.phone"
          :to="`tel:${member.phone}`"
          variant="outline"
          icon="i-heroicons-phone"
          size="lg"
        >
          Anrufen
        </Button>
      </div>
    </div>

    <div class="member-avatar">
      <Image
        :src="member.image"
        :alt="member.name"
        variant="round"
        size="large"
      >
        <BaseIcon
          name="i-heroicons-user-circle"
          class="avatar-placeholder"
        />
      </Image>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board-member-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  align-items: center;

  @include up('md') {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.member-spacer {
  display: none;

  @include up('md') {
    display: block;
    order: 1;
  }
}

.member-avatar {
  order: 1;
  margin-inline: auto;

  @include up('md') {
    order: 2;
  }
}

.member-info {
  order: 2;
  text-align: center;
  max-width: 28rem;

  &.is-left {
    @include up('md') {
      order: 1;
      text-align: right;
      justify-self: end;
    }
  }

  &.is-right {
    @include up('md') {
      order: 3;
      text-align: left;
      justify-self: start;
    }
  }
}

.avatar-placeholder {
  width: 12rem;
  height: 12rem;
  color: var(--color-gray-300);
}

.member-name {
  margin: 0;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--color-gray-800);
}

.member-badge {
  margin-top: var(--space-2);
  margin-bottom: var(--space-4);
}

.member-area {
  color: var(--color-gray-600);
  margin-block: var(--space-6);
}

.area-label {
  display: block;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: var(--space-1);
}

.member-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;

  &.is-right {
    @include up('md') {
      justify-content: flex-end;
    }
  }

  &.is-left {
    @include up('md') {
      justify-content: flex-start;
    }
  }
}
</style>
