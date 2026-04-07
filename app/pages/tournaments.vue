<script setup lang="ts">
import Hero from '~/components/base/Hero.vue'
import Section from '~/components/base/Section.vue'
import Headline from '~/components/base/Headline.vue'
import Button from '~/components/base/Button.vue'
import FeatureCard from '~/components/base/FeatureCard.vue'

useSeoMeta({
  title: 'Kreismeisterschaften 2026',
  ogTitle: 'Kreismeisterschaften 2026',
  description: 'Alle Informationen zu den Kreismeisterschaften 2026 beim TC Hardt.',
  ogDescription: 'Alle Informationen zu den Kreismeisterschaften 2026 beim TC Hardt.',
})
</script>

<template>
  <div>
    <!-- Hero Sektion -->
    <Hero
      height="medium"
      fallback-class="bg-brand-dark-900"
    >
      <template #content>
        <Headline
          :title="$t('tournaments.hero.title')"
          :description="$t('tournaments.hero.description')"
          tag="h1"
          size="h1"
          mode="light"
          alignment="center"
          margin-bottom="sm"
        />
        <div class="mt-8 flex justify-center">
          <Button
            href="https://mybigpoint.tennis.de"
            target="_blank"
            rel="noopener noreferrer"
            :label="$t('tournaments.hero.cta')"
            variant="primary"
            size="lg"
            icon="i-heroicons-arrow-top-right-on-square"
          />
        </div>
      </template>
    </Hero>

    <!-- Quick Facts Sektion -->
    <Section variant="default" overlap-top rounded="top">
      <Headline
        title="Quick Facts"
        tagline="Die wichtigsten Infos"
        alignment="center"
      />
      <div class="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
        <FeatureCard
          :title="$t('tournaments.facts.date')"
          description="September 2026"
          icon="i-heroicons-calendar"
        />
        <FeatureCard
          :title="$t('tournaments.facts.deadline')"
          description="August 2026"
          icon="i-heroicons-clock"
        />
        <FeatureCard
          :title="$t('tournaments.facts.location')"
          :description="$t('tournaments.facts.location_address')"
          icon="i-heroicons-map-pin"
        />
      </div>
    </Section>

    <!-- Zeitplan & Auslosung (Platzhalter) -->
    <Section variant="secondary-light">
      <Headline
        :title="$t('tournaments.schedule.title')"
        alignment="center"
      />
      <div class="mt-12 max-w-4xl mx-auto text-center">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-brand-light-100 dark:border-gray-700">
          <UIcon
            name="i-heroicons-information-circle"
            class="text-5xl text-brand-light-500 mb-4"
          />
          <p class="text-xl text-gray-700 dark:text-gray-300">
            {{ $t('tournaments.schedule.info') }}
          </p>
        </div>
      </div>
    </Section>

    <!-- Gastronomie -->
    <Section variant="default">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row gap-12 items-center">
          <div class="flex-1">
            <Headline
              :title="$t('tournaments.catering.title')"
              :description="$t('tournaments.catering.description')"
              alignment="left"
              margin-bottom="sm"
            />
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border-l-4 border-brand-dark-500 mt-6">
              <p class="text-gray-700 dark:text-gray-300 italic">
                {{ $t('tournaments.catering.placeholder') }}
              </p>
            </div>
          </div>
          <div class="flex-1">
            <div class="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden">
               <!-- Platzhalter für ein Bild der Sonnenterrasse -->
               <UIcon name="i-heroicons-photo" class="text-6xl text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Kontakt -->
    <Section variant="primary" padding-bottom="xl">
      <Headline
        :title="$t('tournaments.contact.title')"
        alignment="center"
        mode="light"
      />
      <div class="mt-8 flex justify-center">
        <a
          :href="`mailto:${$t('tournaments.contact.email')}`"
          class="inline-flex items-center gap-3 bg-white text-brand-dark-900 px-6 py-4 rounded-xl font-medium hover:bg-brand-light-50 transition-colors shadow-lg"
        >
          <UIcon name="i-heroicons-envelope" class="text-2xl" />
          <span class="text-lg">{{ $t('tournaments.contact.email') }}</span>
        </a>
      </div>
    </Section>
  </div>
</template>
