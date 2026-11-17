<script setup lang="ts">
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Section from '~/components/base/Section.vue'
import Button from '~/components/base/Button.vue'
import Badge from '~/components/base/Badge.vue'
import BaseIcon from '~/components/base/Icon.vue'
import Image from '~/components/base/Image.vue'

useSeoMeta({
  title: 'Vorstand',
  ogTitle: 'Vorstand',
  description: 'Lerne den Vorstand des TC Hardt kennen. Hier findest du deine Ansprechpartner für alle Belange rund um unseren Tennisverein.',
  ogDescription: 'Lerne den Vorstand des TC Hardt kennen. Hier findest du deine Ansprechpartner für alle Belange rund um unseren Tennisverein.',
  ogImage: '/img/logo.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="board-page">
    <Hero height="small">
      <template #content>
        <Headline
          title="Der Vorstand"
          description="Deine Ansprechpartner für alle Belange rund um den TC Hardt."
          :tag="'h1'"
          :size="'h1'"
          :mode="'light'"
          :alignment="'center'"
          :margin-bottom="'sm'"
        />
      </template>
    </Hero>

    <div>
      <Section
        v-for="(member, index) in db.board"
        :key="index"
        :variant="index % 2 === 0 ? 'default' : 'secondary-light'"
        :rounded="index !== 0 ? 'top' : false"
        :overlap-top="index !== 0"
        padding-bottom="xl"
        outer-container
      >
        <div class="member-row">
          <div
            v-if="index % 2 === 0"
            class="member-info is-left"
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
            <div class="member-actions is-right">
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

          <div
            v-if="index % 2 !== 0"
            class="member-spacer"
          />

          <div class="member-avatar">
            <Image
              :src="member.image"
              :alt="member.name"
              variant="round"
              size="large"
            >
              <BaseIcon
                name="i-heroicons-user-circle"
                class="avatar-placeholder-lg"
              />
            </Image>
          </div>

          <div
            v-if="index % 2 !== 0"
            class="member-info is-right"
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
            <div class="member-actions is-left">
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
        </div>
      </Section>
    </div>

    <Section
      variant="secondary-light"
      outer-container
      rounded
      overlap-top
      margin-bottom="xl"
    >
      <Headline
        title="Erweiterter Vorstand"
        alignment="center"
        tagline="Zusätzliche Unterstützung für den Verein"
      />
      <div class="extended-grid">
        <div
          v-for="member in db.extendedBoard"
          :key="member.name"
          class="extended-card"
        >
          <div class="extended-avatar">
            <Image
              :src="member.image"
              :alt="member.name"
              variant="round"
              size="small"
            >
              <BaseIcon
                name="i-heroicons-user-circle"
                class="avatar-placeholder-sm"
              />
            </Image>
          </div>
          <div class="extended-body">
            <h3 class="extended-name">
              {{ member.name }}
            </h3>
            <p class="extended-role">
              {{ member.role }}
            </p>
          </div>
          <div class="extended-actions">
            <Button
              v-if="member.email"
              :to="`mailto:${member.email}`"
              variant="outline"
              icon="i-heroicons-envelope"
              class="extended-btn"
            >
              E-Mail
            </Button>
            <Button
              v-if="member.phone"
              :to="`tel:${member.phone}`"
              variant="outline"
              icon="i-heroicons-phone"
              class="extended-btn"
            >
              Anrufen
            </Button>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.member-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  align-items: center;

  @include up('md') {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.member-info {
  order: 2;
  text-align: center;
  max-width: 28rem;

  &.is-left {
    @include up('md') {
      order: 0;
      text-align: right;
      justify-self: end;
    }
  }

  &.is-right {
    @include up('md') {
      order: 0;
      text-align: left;
      justify-self: start;
    }
  }
}

.member-spacer {
  display: none;

  @include up('md') {
    display: block;
  }
}

.member-avatar {
  order: 1;
  margin-inline: auto;

  @include up('md') {
    order: 0;
  }
}

.avatar-placeholder-lg {
  width: 12rem;
  height: 12rem;
  color: var(--color-gray-300);
}

.avatar-placeholder-sm {
  width: 4rem;
  height: 4rem;
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

.extended-grid {
  display: grid;
  gap: var(--space-8);
  margin-top: var(--space-12);

  @include up('md') {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-inline: var(--space-24);
  }

  @include up('lg') {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.extended-card {
  background-color: var(--color-pure-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
  text-align: center;
  display: flex;
  flex-direction: column;
}

.extended-avatar {
  margin-inline: auto;
  margin-bottom: var(--space-4);
}

.extended-body {
  flex-grow: 1;
}

.extended-name {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: var(--color-gray-800);
}

.extended-role {
  margin: 0;
  color: var(--color-brand-light-700);
  font-weight: 500;
}

.extended-actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.extended-btn {
  flex: 1 1 0%;
  justify-content: center;
}
</style>
