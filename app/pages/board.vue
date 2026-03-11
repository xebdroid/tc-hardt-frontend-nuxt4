<script setup lang="ts">
import db from '~/assets/data/db.json'
import Hero from '~/components/base/Hero.vue'
import Headline from '~/components/base/Headline.vue'
import Section from '~/components/base/Section.vue'
import Button from '~/components/base/Button.vue'
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
  <div>
    <Hero
      height="small"
      fallback-class="bg-brand-dark-900"
    >
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
        <div class="flex flex-col md:grid md:grid-cols-3 gap-12 items-center">
          <div
            v-if="index % 2 === 0"
            class="order-2 text-center md:text-right md:justify-self-end max-w-md md:order-0"
          >
            <h3 class="text-3xl font-bold text-gray-800">
              {{ member.name }}
            </h3>
            <UBadge
              variant="subtle"
              color="primary"
              size="lg"
              class="mt-2 mb-4"
            >
              {{ member.role }}
            </UBadge>
            <div
              v-if="member.area"
              class="text-gray-600 my-6"
            >
              <span class="font-semibold block text-gray-800 mb-1">Zuständig für:</span>
              {{ member.area }}
            </div>
            <div
              class="flex gap-4 justify-center md:justify-end"
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
          <div
            v-if="index % 2 !== 0"
            class="hidden md:block"
          />
          <div class="order-1 md:order-none mx-auto">
            <Image
              :src="member.image"
              :alt="member.name"
              variant="round"
              size="large"
            >
              <UIcon
                name="i-heroicons-user-circle"
                class="w-48 h-48 text-gray-300"
              />
            </Image>
          </div>
          <div
            v-if="index % 2 !== 0"
            class="order-2 text-center md:text-left md:justify-self-start max-w-md md:order-none"
          >
            <h3 class="text-3xl font-bold text-gray-800">
              {{ member.name }}
            </h3>
            <UBadge
              variant="subtle"
              color="primary"
              size="lg"
              class="mt-2 mb-4"
            >
              {{ member.role }}
            </UBadge>
            <div
              v-if="member.area"
              class="text-gray-600 my-6"
            >
              <span class="font-semibold block text-gray-800 mb-1">Zuständig für:</span>
              {{ member.area }}
            </div>
            <div
              class="flex gap-4 justify-center md:justify-start"
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
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 md:px-24">
        <div
          v-for="member in db.extendedBoard"
          :key="member.name"
          class="bg-white rounded-lg shadow-sm p-6 text-center flex flex-col"
        >
          <div class="mx-auto mb-4">
            <Image
              :src="member.image"
              :alt="member.name"
              variant="round"
              size="small"
            >
              <UIcon
                name="i-heroicons-user-circle"
                class="w-16 h-16 text-gray-300"
              />
            </Image>
          </div>
          <div class="flex-grow">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ member.name }}
            </h3>
            <p class="text-brand-light-700 font-medium">
              {{ member.role }}
            </p>
          </div>
          <div class="flex gap-2 mt-4">
            <Button
              v-if="member.email"
              :to="`mailto:${member.email}`"
              variant="outline"
              icon="i-heroicons-envelope"
              class="flex-1 justify-center"
            >
              E-Mail
            </Button>
            <Button
              v-if="member.phone"
              :to="`tel:${member.phone}`"
              variant="outline"
              icon="i-heroicons-phone"
              class="flex-1 justify-center"
            >
              Anrufen
            </Button>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
